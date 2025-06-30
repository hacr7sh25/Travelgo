import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { MOCK_RESTAURANTS, MOCK_REVIEWS } from '@/data/mockData';
import type { Database } from '@/lib/supabase';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];
type RestaurantInsert = Database['public']['Tables']['restaurants']['Insert'];

export const useRestaurants = (filters?: {
  cuisine?: string;
  priceRange?: number[];
  rating?: number;
  location?: { lat: number; lng: number; radius: number };
}) => {
  return useQuery({
    queryKey: ['restaurants', filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('restaurants')
          .select('*')
          .order('average_rating', { ascending: false });

        if (filters?.cuisine) {
          query = query.eq('cuisine_type', filters.cuisine);
        }

        if (filters?.priceRange?.length) {
          query = query.in('price_range', filters.priceRange);
        }

        if (filters?.rating) {
          query = query.gte('average_rating', filters.rating);
        }

        const { data, error } = await query;

        if (error) {
          // If there's an error fetching from Supabase, return mock data with flag
          console.warn('Failed to fetch restaurants from Supabase, using mock data:', error);
          return {
            restaurants: MOCK_RESTAURANTS as Restaurant[],
            isUsingMockData: true
          };
        }
        
        // If no data from Supabase, return mock data with flag
        if (!data || data.length === 0) {
          return {
            restaurants: MOCK_RESTAURANTS as Restaurant[],
            isUsingMockData: true
          };
        }
        
        return {
          restaurants: data as Restaurant[],
          isUsingMockData: false
        };
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        // Always fallback to mock data on any error
        return {
          restaurants: MOCK_RESTAURANTS as Restaurant[],
          isUsingMockData: true
        };
      }
    },
  });
};

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select(`
            *,
            reviews (
              *,
              profiles (
                username,
                full_name,
                avatar_url
              )
            )
          `)
          .eq('id', id)
          .single();

        // If restaurant not found in Supabase (PGRST116 error), try mock data
        if (error && error.code === 'PGRST116') {
          const mockRestaurant = MOCK_RESTAURANTS.find(r => r.id === id);
          if (mockRestaurant) {
            // Get reviews for this restaurant from mock data
            const mockReviews = MOCK_REVIEWS
              .filter(review => review.restaurant_id === id)
              .map(review => ({
                ...review,
                profiles: {
                  username: `user_${review.user_id?.slice(4, 8)}`,
                  full_name: `User ${review.user_id?.slice(4, 8)}`,
                  avatar_url: null
                }
              }));

            return {
              ...mockRestaurant,
              reviews: mockReviews,
              isUsingMockData: true
            };
          }
        }

        if (error) {
          // For any other error, still try to find in mock data
          const mockRestaurant = MOCK_RESTAURANTS.find(r => r.id === id);
          if (mockRestaurant) {
            const mockReviews = MOCK_REVIEWS
              .filter(review => review.restaurant_id === id)
              .map(review => ({
                ...review,
                profiles: {
                  username: `user_${review.user_id?.slice(4, 8)}`,
                  full_name: `User ${review.user_id?.slice(4, 8)}`,
                  avatar_url: null
                }
              }));

            return {
              ...mockRestaurant,
              reviews: mockReviews,
              isUsingMockData: true
            };
          }
          throw error;
        }
        
        return {
          ...data,
          isUsingMockData: false
        };
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        // Final fallback to mock data
        const mockRestaurant = MOCK_RESTAURANTS.find(r => r.id === id);
        if (mockRestaurant) {
          const mockReviews = MOCK_REVIEWS
            .filter(review => review.restaurant_id === id)
            .map(review => ({
              ...review,
              profiles: {
                username: `user_${review.user_id?.slice(4, 8)}`,
                full_name: `User ${review.user_id?.slice(4, 8)}`,
                avatar_url: null
              }
            }));

          return {
            ...mockRestaurant,
            reviews: mockReviews,
            isUsingMockData: true
          };
        }
        throw new Error('Restaurant not found');
      }
    },
    enabled: !!id,
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurant: RestaurantInsert) => {
      const { data, error } = await supabase
        .from('restaurants')
        .insert(restaurant)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
};

export const useFavoriteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ restaurantId, isFavorite }: { restaurantId: string; isFavorite: boolean }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            restaurant_id: restaurantId,
          });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .match({
            user_id: user.id,
            restaurant_id: restaurantId,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
};

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          restaurants (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
  });
};