import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { MOCK_REVIEWS } from '@/data/mockData';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface Review {
  id: string;
  user_id: string;
  restaurant_id: string;
  rating: number;
  title?: string;
  content?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
  profiles?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export interface CreateReviewData {
  restaurant_id: string;
  rating: number;
  title?: string;
  content?: string;
  images?: string[];
}

export interface UpdateReviewData {
  rating?: number;
  title?: string;
  content?: string;
  images?: string[];
}

export function useReviews(restaurantId?: string) {
  return useQuery({
    queryKey: ['reviews', restaurantId],
    queryFn: async () => {
      if (!restaurantId) return [];

      try {
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            *,
            profiles (
              username,
              full_name,
              avatar_url
            )
          `)
          .eq('restaurant_id', restaurantId)
          .order('created_at', { ascending: false });

        if (error) {
          // If there's an error or no data from Supabase, use mock data
          console.warn('Failed to fetch reviews from Supabase, using mock data:', error);
          const mockReviews = MOCK_REVIEWS
            .filter(review => review.restaurant_id === restaurantId)
            .map(review => ({
              ...review,
              profiles: {
                username: `user_${review.user_id?.slice(4, 8)}`,
                full_name: `User ${review.user_id?.slice(4, 8)}`,
                avatar_url: null
              }
            }));
          return mockReviews;
        }

        return data || [];
      } catch (err) {
        console.error('Error fetching reviews:', err);
        // Fallback to mock data on error
        const mockReviews = MOCK_REVIEWS
          .filter(review => review.restaurant_id === restaurantId)
          .map(review => ({
            ...review,
            profiles: {
              username: `user_${review.user_id?.slice(4, 8)}`,
              full_name: `User ${review.user_id?.slice(4, 8)}`,
              avatar_url: null
            }
          }));
        return mockReviews;
      }
    },
    enabled: !!restaurantId,
  });
}

export function useCreateReview() {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (reviewData: CreateReviewData): Promise<Review | null> => {
      if (!user) {
        throw new Error('You must be logged in to create a review');
      }

      try {
        const { data, error } = await supabase
          .from('reviews')
          .insert({
            ...reviewData,
            user_id: user.id,
          })
          .select(`
            *,
            profiles (
              username,
              full_name,
              avatar_url
            )
          `)
          .single();

        if (error) {
          throw error;
        }

        return data;
      } catch (err) {
        console.error('Error creating review:', err);
        throw err;
      }
    },
  });
}

export function useUpdateReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const updateReview = async (reviewId: string, reviewData: UpdateReviewData): Promise<Review | null> => {
    if (!user) {
      setError('You must be logged in to update a review');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: updateError } = await supabase
        .from('reviews')
        .update({
          ...reviewData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId)
        .eq('user_id', user.id) // Ensure user can only update their own reviews
        .select(`
          *,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (updateError) {
        throw updateError;
      }

      return data;
    } catch (err) {
      console.error('Error updating review:', err);
      setError(err instanceof Error ? err.message : 'Failed to update review');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateReview,
    loading,
    error,
  };
}

export function useDeleteReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const deleteReview = async (reviewId: string): Promise<boolean> => {
    if (!user) {
      setError('You must be logged in to delete a review');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', user.id); // Ensure user can only delete their own reviews

      if (deleteError) {
        throw deleteError;
      }

      return true;
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete review');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteReview,
    loading,
    error,
  };
}

export function useUserReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchUserReviews();
    } else {
      setReviews([]);
      setLoading(false);
    }
  }, [user]);

  const fetchUserReviews = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('reviews')
        .select(`
          *,
          restaurants (
            name,
            image_urls
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setReviews(data || []);
    } catch (err) {
      console.error('Error fetching user reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch your reviews');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (user) {
      fetchUserReviews();
    }
  };

  return {
    reviews,
    loading,
    error,
    refetch,
  };
}