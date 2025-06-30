import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          location: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      restaurants: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          cuisine_type: string | null;
          address: string | null;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          website: string | null;
          price_range: number;
          average_rating: number;
          total_reviews: number;
          image_urls: string[];
          opening_hours: any | null;
          features: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          cuisine_type?: string | null;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          website?: string | null;
          price_range?: number;
          average_rating?: number;
          total_reviews?: number;
          image_urls?: string[];
          opening_hours?: any | null;
          features?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          cuisine_type?: string | null;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          phone?: string | null;
          website?: string | null;
          price_range?: number;
          average_rating?: number;
          total_reviews?: number;
          image_urls?: string[];
          opening_hours?: any | null;
          features?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          restaurant_id: string;
          rating: number;
          title: string | null;
          content: string | null;
          images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          restaurant_id: string;
          rating: number;
          title?: string | null;
          content?: string | null;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          restaurant_id?: string;
          rating?: number;
          title?: string | null;
          content?: string | null;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          restaurant_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          restaurant_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          restaurant_id?: string;
          created_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          preferred_cuisines: string[];
          dietary_restrictions: string[];
          price_range_preference: number[];
          max_distance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          preferred_cuisines?: string[];
          dietary_restrictions?: string[];
          price_range_preference?: number[];
          max_distance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          preferred_cuisines?: string[];
          dietary_restrictions?: string[];
          price_range_preference?: number[];
          max_distance?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_interactions: {
        Row: {
          id: string;
          user_id: string;
          restaurant_id: string;
          interaction_type: 'view' | 'favorite' | 'review' | 'share';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          restaurant_id: string;
          interaction_type: 'view' | 'favorite' | 'review' | 'share';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          restaurant_id?: string;
          interaction_type?: 'view' | 'favorite' | 'review' | 'share';
          created_at?: string;
        };
      };
      petrol_stations: {
        Row: {
          id: string;
          name: string;
          address: string | null;
          latitude: number | null;
          longitude: number | null;
          brand: string | null;
          fuel_types: string[];
          amenities: string[];
          pricing: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          brand?: string | null;
          fuel_types?: string[];
          amenities?: string[];
          pricing?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          brand?: string | null;
          fuel_types?: string[];
          amenities?: string[];
          pricing?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};