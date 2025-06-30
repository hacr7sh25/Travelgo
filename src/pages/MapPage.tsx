import { useState } from 'react';
import { MapView } from '@/components/map/MapView';
import { MapFilters } from '@/components/map/MapFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRestaurants } from '@/hooks/useRestaurants';
import { CUISINE_TYPES } from '@/data/mockData';
import { 
  Filter, 
  X, 
  Navigation, 
  Layers,
  Search,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';

export function MapPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showPetrolStations, setShowPetrolStations] = useState(true);
  const [mapFilters, setMapFilters] = useState({
    selectedCuisines: [] as string[],
    minRating: 0,
    maxDistance: 25,
    priceRange: [1, 4] as number[]
  });

  const { data: restaurantsData, isLoading, error } = useRestaurants();

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          toast.success('Location found successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your location. Please check your browser settings.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  const handleCuisineChange = (cuisines: string[]) => {
    setMapFilters(prev => ({ ...prev, selectedCuisines: cuisines }));
  };

  const handlePriceRangeChange = (priceRange: number[]) => {
    setMapFilters(prev => ({ ...prev, priceRange }));
  };

  const handleRatingChange = (rating: number) => {
    setMapFilters(prev => ({ ...prev, minRating: rating }));
  };

  const handleDistanceChange = (distance: number) => {
    setMapFilters(prev => ({ ...prev, maxDistance: distance }));
  };

  const handlePetrolStationsToggle = (show: boolean) => {
    setShowPetrolStations(show);
  };

  const activeFiltersCount = mapFilters.selectedCuisines.length + 
    (mapFilters.minRating > 0 ? 1 : 0) + 
    (mapFilters.maxDistance < 25 ? 1 : 0) + 
    (mapFilters.priceRange[0] !== 1 || mapFilters.priceRange[1] !== 4 ? 1 : 0);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading map data</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Explore Map
          </h1>
          <p className="text-sm text-muted-foreground">
            Discover restaurants and petrol stations around you
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search locations..."
              className="w-64 pl-10 pr-4 py-2 border rounded-lg bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* Map Controls */}
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>

          <Button variant="outline" size="sm" onClick={handleLocationRequest}>
            <Navigation className="h-4 w-4 mr-2" />
            My Location
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="absolute left-4 top-4 z-10">
            <MapFilters
              cuisineTypes={CUISINE_TYPES}
              onCuisineChange={handleCuisineChange}
              onPriceRangeChange={handlePriceRangeChange}
              onRatingChange={handleRatingChange}
              onDistanceChange={handleDistanceChange}
              onPetrolStationsToggle={handlePetrolStationsToggle}
              showPetrolStations={showPetrolStations}
            />
          </div>
        )}

        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            restaurants={restaurantsData?.restaurants || []}
            selectedRestaurant={selectedRestaurant}
            onRestaurantSelect={setSelectedRestaurant}
            userLocation={userLocation}
            onLocationRequest={handleLocationRequest}
            showPetrolStations={showPetrolStations}
            filters={mapFilters}
          />

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && !showFilters && (
            <Card className="absolute top-4 right-4 max-w-sm">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Active Filters</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Filter className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {mapFilters.selectedCuisines.map((cuisine: string) => (
                    <Badge key={cuisine} variant="secondary" className="text-xs">
                      {cuisine}
                    </Badge>
                  ))}
                  {mapFilters.minRating > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {mapFilters.minRating}+ stars
                    </Badge>
                  )}
                  {(mapFilters.priceRange[0] !== 1 || mapFilters.priceRange[1] !== 4) && (
                    <Badge variant="secondary" className="text-xs">
                      {'$'.repeat(mapFilters.priceRange[0])}-{'$'.repeat(mapFilters.priceRange[1])}
                    </Badge>
                  )}
                  {mapFilters.maxDistance < 25 && (
                    <Badge variant="secondary" className="text-xs">
                      {mapFilters.maxDistance}km
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}