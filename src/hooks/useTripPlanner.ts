import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface TripStop {
  id: string;
  name: string;
  type: 'restaurant' | 'petrol_station';
  address: string;
  latitude: number;
  longitude: number;
  estimatedTime?: number; // minutes
  notes?: string;
}

export interface Trip {
  id?: string;
  name: string;
  description?: string;
  stops: TripStop[];
  totalDistance?: number;
  estimatedDuration?: number;
  created_at?: string;
  updated_at?: string;
}

export const useTripPlanner = () => {
  const [currentTrip, setCurrentTrip] = useState<Trip>({
    name: '',
    description: '',
    stops: []
  });

  const addStop = useCallback((stop: TripStop) => {
    setCurrentTrip(prev => ({
      ...prev,
      stops: [...prev.stops, stop]
    }));
  }, []);

  const removeStop = useCallback((stopId: string) => {
    setCurrentTrip(prev => ({
      ...prev,
      stops: prev.stops.filter(stop => stop.id !== stopId)
    }));
  }, []);

  const reorderStops = useCallback((startIndex: number, endIndex: number) => {
    setCurrentTrip(prev => {
      const newStops = [...prev.stops];
      const [removed] = newStops.splice(startIndex, 1);
      newStops.splice(endIndex, 0, removed);
      return { ...prev, stops: newStops };
    });
  }, []);

  const updateTripDetails = useCallback((details: Partial<Trip>) => {
    setCurrentTrip(prev => ({ ...prev, ...details }));
  }, []);

  const calculateTripMetrics = useCallback(() => {
    if (currentTrip.stops.length < 2) return { distance: 0, duration: 0 };

    // Simple distance calculation (in real app, use Google Maps API)
    let totalDistance = 0;
    let totalDuration = 0;

    for (let i = 0; i < currentTrip.stops.length - 1; i++) {
      const stop1 = currentTrip.stops[i];
      const stop2 = currentTrip.stops[i + 1];
      
      // Haversine formula for distance calculation
      const distance = calculateDistance(
        stop1.latitude, stop1.longitude,
        stop2.latitude, stop2.longitude
      );
      
      totalDistance += distance;
      totalDuration += Math.round(distance * 1.5); // Rough estimate: 1.5 min per km
    }

    return { distance: totalDistance, duration: totalDuration };
  }, [currentTrip.stops]);

  const clearTrip = useCallback(() => {
    setCurrentTrip({
      name: '',
      description: '',
      stops: []
    });
  }, []);

  return {
    currentTrip,
    addStop,
    removeStop,
    reorderStops,
    updateTripDetails,
    calculateTripMetrics,
    clearTrip
  };
};

export const useSavedTrips = () => {
  return useQuery({
    queryKey: ['saved-trips'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // For now, use localStorage (in production, save to Supabase)
      const savedTrips = localStorage.getItem(`trips_${user.id}`);
      return savedTrips ? JSON.parse(savedTrips) : [];
    },
  });
};

export const useSaveTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trip: Trip) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Save to localStorage (in production, save to Supabase)
      const savedTrips = JSON.parse(localStorage.getItem(`trips_${user.id}`) || '[]');
      const newTrip = {
        ...trip,
        id: trip.id || Date.now().toString(),
        created_at: trip.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const updatedTrips = trip.id 
        ? savedTrips.map((t: Trip) => t.id === trip.id ? newTrip : t)
        : [...savedTrips, newTrip];

      localStorage.setItem(`trips_${user.id}`, JSON.stringify(updatedTrips));
      return newTrip;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-trips'] });
    },
  });
};

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}