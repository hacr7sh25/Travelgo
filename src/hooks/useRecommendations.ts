import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];

export const useRecommendations = () => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Get user preferences
      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id);

      const userPreferences = preferences && preferences.length > 0 ? preferences[0] : null;

      // Get user interactions for collaborative filtering
      const { data: interactions } = await supabase
        .from('user_interactions')
        .select('restaurant_id, interaction_type')
        .eq('user_id', user.id);

      // Get user's favorite cuisines
      const { data: favorites } = await supabase
        .from('favorites')
        .select('restaurant_id')
        .eq('user_id', user.id);

      const favoriteIds = favorites?.map(f => f.restaurant_id) || [];
      const interactedIds = interactions?.map(i => i.restaurant_id) || [];

      // Build recommendation query
      let query = supabase
        .from('restaurants')
        .select('*')
        .gte('average_rating', 4.0)
        .order('average_rating', { ascending: false });

      // Filter by preferred cuisines if available
      if (userPreferences?.preferred_cuisines?.length) {
        query = query.in('cuisine_type', userPreferences.preferred_cuisines);
      }

      // Filter by price range preference
      if (userPreferences?.price_range_preference?.length) {
        query = query.in('price_range', userPreferences.price_range_preference);
      }

      // Exclude already favorited restaurants
      if (favoriteIds.length > 0) {
        query = query.not('id', 'in', `(${favoriteIds.join(',')})`);
      }

      const { data: restaurants, error } = await query.limit(20);

      if (error) throw error;

      // Add recommendation reasons
      const recommendationsWithReasons = restaurants?.map(restaurant => ({
        ...restaurant,
        recommendationReason: getRecommendationReason(restaurant, userPreferences, interactions)
      })) || [];

      return recommendationsWithReasons;
    },
  });
};

function getRecommendationReason(
  restaurant: Restaurant, 
  preferences: any, 
  interactions: any[]
): string {
  const reasons = [];

  if (preferences?.preferred_cuisines?.includes(restaurant.cuisine_type)) {
    reasons.push(`You love ${restaurant.cuisine_type} cuisine`);
  }

  if (restaurant.average_rating >= 4.5) {
    reasons.push('Highly rated by travelers');
  }

  if (preferences?.price_range_preference?.includes(restaurant.price_range)) {
    reasons.push('Matches your budget preference');
  }

  if (restaurant.features?.includes('Vegetarian Options') && 
      preferences?.dietary_restrictions?.includes('Vegetarian')) {
    reasons.push('Has vegetarian options');
  }

  return reasons[0] || 'Popular in your area';
}

export const usePersonalizedRestaurants = (limit = 10) => {
  return useQuery({
    queryKey: ['personalized-restaurants', limit],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Return popular restaurants for non-authenticated users
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .order('average_rating', { ascending: false })
          .limit(limit);
        
        if (error) throw error;
        return data;
      }

      // Get user preferences and interactions for personalization
      const [preferencesResult, interactionsResult] = await Promise.all([
        supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id),
        supabase
          .from('user_interactions')
          .select('restaurant_id, interaction_type')
          .eq('user_id', user.id)
      ]);

      const preferences = preferencesResult.data && preferencesResult.data.length > 0 ? preferencesResult.data[0] : null;
      const interactions = interactionsResult.data || [];

      let query = supabase
        .from('restaurants')
        .select('*')
        .order('average_rating', { ascending: false });

      // Apply preference filters
      if (preferences?.preferred_cuisines?.length) {
        query = query.in('cuisine_type', preferences.preferred_cuisines);
      }

      if (preferences?.price_range_preference?.length) {
        query = query.in('price_range', preferences.price_range_preference);
      }

      const { data, error } = await query.limit(limit);
      if (error) throw error;

      return data;
    },
  });
};