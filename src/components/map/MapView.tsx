import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Star, Phone, ExternalLink, Fuel } from 'lucide-react';
import { MOCK_PETROL_STATIONS } from '@/data/mockData';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const restaurantIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f97316" width="24" height="24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const petrolIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" width="24" height="24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const userLocationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b82f6" width="24" height="24">
      <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="#ffffff"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface Restaurant {
  id: string;
  name: string;
  description?: string;
  cuisine_type?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  price_range?: number;
  average_rating?: number;
  total_reviews?: number;
  image_urls?: string[];
  features?: string[];
}

interface PetrolStation {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  brand?: string;
  fuel_types?: string[];
  amenities?: string[];
  pricing?: any;
}

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant?: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  userLocation?: { lat: number; lng: number } | null;
  onLocationRequest: () => void;
  showPetrolStations?: boolean;
  filters?: {
    selectedCuisines: string[];
    priceRange: number[];
    minRating: number;
    maxDistance: number;
  };
}

// Component to handle map events and user location
function MapController({ userLocation, onLocationRequest }: { 
  userLocation?: { lat: number; lng: number } | null;
  onLocationRequest: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation, map]);

  useMapEvents({
    locationfound: (e) => {
      map.setView(e.latlng, 13);
    },
  });

  return null;
}

export function MapView({
  restaurants,
  selectedRestaurant,
  onRestaurantSelect,
  userLocation,
  onLocationRequest,
  showPetrolStations = true,
  filters,
}: MapViewProps) {
  const [mapReady, setMapReady] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Restaurant | PetrolStation | null>(null);

  // Default center (New York City)
  const defaultCenter: [number, number] = [40.7589, -73.9851];
  const mapCenter: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : defaultCenter;

  // Filter restaurants based on criteria
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (!restaurant.latitude || !restaurant.longitude) return false;
    
    if (filters) {
      // Cuisine filter
      if (filters.selectedCuisines.length > 0 && 
          !filters.selectedCuisines.includes(restaurant.cuisine_type || '')) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange.length === 2 && restaurant.price_range) {
        if (restaurant.price_range < filters.priceRange[0] || 
            restaurant.price_range > filters.priceRange[1]) {
          return false;
        }
      }
      
      // Rating filter
      if (filters.minRating > 0 && 
          (restaurant.average_rating || 0) < filters.minRating) {
        return false;
      }
      
      // Distance filter (if user location is available)
      if (userLocation && filters.maxDistance > 0) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.latitude,
          restaurant.longitude
        );
        if (distance > filters.maxDistance) {
          return false;
        }
      }
    }
    
    return true;
  });

  // Filter petrol stations with coordinates
  const validPetrolStations = MOCK_PETROL_STATIONS.filter(
    station => station.latitude && station.longitude
  );

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return Math.round(d * 10) / 10;
  };

  const getPriceSymbols = (priceRange?: number) => {
    if (!priceRange) return '';
    return '$'.repeat(priceRange);
  };

  const handleMarkerClick = (item: Restaurant | PetrolStation) => {
    setSelectedMarker(item);
    if ('cuisine_type' in item) {
      onRestaurantSelect(item as Restaurant);
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController 
          userLocation={userLocation} 
          onLocationRequest={onLocationRequest} 
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userLocationIcon}
          >
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Restaurant Markers with Clustering */}
        <MarkerClusterGroup>
          {filteredRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.latitude!, restaurant.longitude!]}
              icon={restaurantIcon}
              eventHandlers={{
                click: () => handleMarkerClick(restaurant),
              }}
            >
              <Popup>
                <div className="w-64 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm">{restaurant.name}</h3>
                    {restaurant.price_range && (
                      <Badge variant="outline" className="text-xs">
                        {getPriceSymbols(restaurant.price_range)}
                      </Badge>
                    )}
                  </div>
                  
                  {restaurant.cuisine_type && (
                    <Badge variant="secondary" className="text-xs">
                      {restaurant.cuisine_type}
                    </Badge>
                  )}
                  
                  {restaurant.average_rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">
                        {restaurant.average_rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({restaurant.total_reviews} reviews)
                      </span>
                    </div>
                  )}
                  
                  {restaurant.address && (
                    <p className="text-xs text-muted-foreground">
                      {restaurant.address}
                    </p>
                  )}
                  
                  {userLocation && (
                    <p className="text-xs text-muted-foreground">
                      {calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        restaurant.latitude!,
                        restaurant.longitude!
                      )} km away
                    </p>
                  )}
                  
                  <div className="flex space-x-2 pt-2">
                    {restaurant.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-6"
                        onClick={() => window.open(`tel:${restaurant.phone}`)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    )}
                    {restaurant.website && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-6"
                        onClick={() => window.open(restaurant.website, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Website
                      </Button>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* Petrol Station Markers */}
        {showPetrolStations && (
          <MarkerClusterGroup>
            {validPetrolStations.map((station) => (
              <Marker
                key={station.id}
                position={[station.latitude!, station.longitude!]}
                icon={petrolIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(station),
                }}
              >
                <Popup>
                  <div className="w-64 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-sm">{station.name}</h3>
                      {station.brand && (
                        <Badge variant="outline" className="text-xs">
                          {station.brand}
                        </Badge>
                      )}
                    </div>
                    
                    {station.address && (
                      <p className="text-xs text-muted-foreground">
                        {station.address}
                      </p>
                    )}
                    
                    {station.fuel_types && station.fuel_types.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Fuel Types:</p>
                        <div className="flex flex-wrap gap-1">
                          {station.fuel_types.map((fuel) => (
                            <Badge key={fuel} variant="secondary" className="text-xs">
                              {fuel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {station.pricing && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Pricing:</p>
                        <div className="text-xs space-y-1">
                          {Object.entries(station.pricing).map(([fuel, price]) => (
                            <div key={fuel} className="flex justify-between">
                              <span className="capitalize">{fuel}:</span>
                              <span className="font-medium">${price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {userLocation && (
                      <p className="text-xs text-muted-foreground">
                        {calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          station.latitude!,
                          station.longitude!
                        )} km away
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>

      {/* Find My Location Button */}
      <Button
        onClick={onLocationRequest}
        size="sm"
        className="absolute top-4 right-4 z-[1000] shadow-lg"
        variant={userLocation ? "default" : "outline"}
      >
        <Navigation className="h-4 w-4 mr-2" />
        {userLocation ? "Location Found" : "Find My Location"}
      </Button>

      {/* Map Stats */}
      <Card className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>{filteredRestaurants.length} Restaurants</span>
            </div>
            {showPetrolStations && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span>{validPetrolStations.length} Petrol Stations</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Loading indicator */}
      {!mapReady && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-[1000]">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}