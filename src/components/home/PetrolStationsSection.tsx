import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Fuel, 
  Star, 
  MapPin, 
  Navigation,
  DollarSign,
  Coffee,
  Car,
  Wifi
} from 'lucide-react';
import { MOCK_PETROL_STATIONS } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const getAmenityIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case 'convenience store':
    case 'quick mart': 
      return Coffee;
    case 'car wash':
      return Car;
    case 'wifi':
      return Wifi;
    default:
      return Fuel;
  }
};

export function PetrolStationsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top Rated Petrol Stations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Find the best fuel stops with great amenities
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => navigate('/map')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>

        {/* Petrol Stations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_PETROL_STATIONS.map((station) => (
            <Card key={station.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{station.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {station.brand}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.2</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">
                        {station.pricing.regular}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">Regular</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{station.address}</span>
                </div>

                {/* Fuel Types */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Fuel Types
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {station.fuel_types.map((fuel) => (
                      <Badge key={fuel} variant="secondary" className="text-xs">
                        {fuel}: ${station.pricing[fuel.toLowerCase()] || 'N/A'}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {station.amenities.slice(0, 3).map((amenity) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <div key={amenity} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <Icon className="h-3 w-3" />
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                    {station.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{station.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/map')}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}