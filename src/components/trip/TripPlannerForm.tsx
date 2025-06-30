import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  MapPin, 
  Clock, 
  Route,
  Save,
  Coffee,
  Fuel
} from 'lucide-react';
import { useTripPlanner, useSaveTrip, type TripStop } from '@/hooks/useTripPlanner';
import { MOCK_RESTAURANTS } from '@/data/mockData';
import { MOCK_PETROL_STATIONS } from '@/data/mockData';
import { toast } from 'sonner';

export function TripPlannerForm() {
  const {
    currentTrip,
    addStop,
    removeStop,
    reorderStops,
    updateTripDetails,
    calculateTripMetrics,
    clearTrip
  } = useTripPlanner();

  const saveTrip = useSaveTrip();
  const [showAddStop, setShowAddStop] = useState(false);

  const handleSaveTrip = async () => {
    if (!currentTrip.name.trim()) {
      toast.error('Please enter a trip name');
      return;
    }

    if (currentTrip.stops.length === 0) {
      toast.error('Please add at least one stop');
      return;
    }

    try {
      const metrics = calculateTripMetrics();
      await saveTrip.mutateAsync({
        ...currentTrip,
        totalDistance: metrics.distance,
        estimatedDuration: metrics.duration
      });
      toast.success('Trip saved successfully!');
      clearTrip();
    } catch (error) {
      toast.error('Failed to save trip');
    }
  };

  const addRestaurantStop = (restaurant: any) => {
    const stop: TripStop = {
      id: `restaurant-${restaurant.id}`,
      name: restaurant.name,
      type: 'restaurant',
      address: restaurant.address || '',
      latitude: restaurant.latitude || 0,
      longitude: restaurant.longitude || 0,
      estimatedTime: 60 // 1 hour default
    };
    addStop(stop);
    setShowAddStop(false);
  };

  const addPetrolStop = (station: any) => {
    const stop: TripStop = {
      id: `petrol-${station.id}`,
      name: station.name,
      type: 'petrol_station',
      address: station.address || '',
      latitude: station.latitude || 0,
      longitude: station.longitude || 0,
      estimatedTime: 15 // 15 minutes default
    };
    addStop(stop);
    setShowAddStop(false);
  };

  const metrics = calculateTripMetrics();

  return (
    <div className="space-y-6">
      {/* Trip Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Trip Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tripName">Trip Name</Label>
              <Input
                id="tripName"
                placeholder="My Awesome Road Trip"
                value={currentTrip.name}
                onChange={(e) => updateTripDetails({ name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Trip Summary</Label>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentTrip.stops.length} stops
                </span>
                <span className="flex items-center gap-1">
                  <Route className="h-4 w-4" />
                  {metrics.distance.toFixed(1)} km
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {Math.round(metrics.duration)} min
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tripDescription">Description (Optional)</Label>
            <Textarea
              id="tripDescription"
              placeholder="Describe your trip..."
              value={currentTrip.description || ''}
              onChange={(e) => updateTripDetails({ description: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Trip Stops */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Trip Stops ({currentTrip.stops.length})
            </CardTitle>
            <Button
              onClick={() => setShowAddStop(!showAddStop)}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stop
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Stop Section */}
          {showAddStop && (
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Add a Stop</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Coffee className="h-4 w-4" />
                        Popular Restaurants
                      </h5>
                      <div className="grid gap-2 max-h-32 overflow-y-auto">
                        {MOCK_RESTAURANTS.slice(0, 3).map((restaurant) => (
                          <Button
                            key={restaurant.id}
                            variant="outline"
                            size="sm"
                            onClick={() => addRestaurantStop(restaurant)}
                            className="justify-start text-left h-auto p-2"
                          >
                            <div>
                              <div className="font-medium">{restaurant.name}</div>
                              <div className="text-xs text-gray-500">{restaurant.cuisine_type}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Fuel className="h-4 w-4" />
                        Petrol Stations
                      </h5>
                      <div className="grid gap-2 max-h-32 overflow-y-auto">
                        {MOCK_PETROL_STATIONS.slice(0, 3).map((station) => (
                          <Button
                            key={station.id}
                            variant="outline"
                            size="sm"
                            onClick={() => addPetrolStop(station)}
                            className="justify-start text-left h-auto p-2"
                          >
                            <div>
                              <div className="font-medium">{station.name}</div>
                              <div className="text-xs text-gray-500">{station.brand}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stops List */}
          {currentTrip.stops.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No stops added yet</p>
              <p className="text-sm">Click "Add Stop" to start planning your trip</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentTrip.stops.map((stop, index) => (
                <Card key={stop.id} className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{stop.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {stop.type === 'restaurant' ? (
                              <>
                                <Coffee className="h-3 w-3 mr-1" />
                                Restaurant
                              </>
                            ) : (
                              <>
                                <Fuel className="h-3 w-3 mr-1" />
                                Fuel
                              </>
                            )}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {stop.address}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {stop.estimatedTime} min
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStop(stop.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={handleSaveTrip}
          disabled={!currentTrip.name.trim() || currentTrip.stops.length === 0 || saveTrip.isPending}
          className="flex-1"
        >
          <Save className="h-4 w-4 mr-2" />
          {saveTrip.isPending ? 'Saving...' : 'Save Trip'}
        </Button>
        <Button
          variant="outline"
          onClick={clearTrip}
          disabled={currentTrip.stops.length === 0}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}