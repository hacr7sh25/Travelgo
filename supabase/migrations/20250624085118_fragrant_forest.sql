/*
  # TravelGo Database Schema

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `bio` (text)
      - `location` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `restaurants` - Restaurant/place information
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `cuisine_type` (text)
      - `address` (text)
      - `latitude` (decimal)
      - `longitude` (decimal)
      - `phone` (text)
      - `website` (text)
      - `price_range` (integer, 1-4)
      - `average_rating` (decimal)
      - `total_reviews` (integer)
      - `image_urls` (text array)
      - `opening_hours` (jsonb)
      - `features` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `reviews` - User reviews for restaurants
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `restaurant_id` (uuid, references restaurants)
      - `rating` (integer, 1-5)
      - `title` (text)
      - `content` (text)
      - `images` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `favorites` - User favorite restaurants
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `restaurant_id` (uuid, references restaurants)
      - `created_at` (timestamp)
    
    - `user_preferences` - User cuisine and location preferences
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `preferred_cuisines` (text array)
      - `dietary_restrictions` (text array)
      - `price_range_preference` (integer array)
      - `max_distance` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_interactions` - Track user behavior for recommendations
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `restaurant_id` (uuid, references restaurants)
      - `interaction_type` (text) -- 'view', 'favorite', 'review', 'share'
      - `created_at` (timestamp)
    
    - `petrol_stations` - Gas station information
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `latitude` (decimal)
      - `longitude` (decimal)
      - `brand` (text)
      - `fuel_types` (text array)
      - `amenities` (text array)
      - `pricing` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
    - Add policies for public read access to restaurants and petrol stations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  cuisine_type text,
  address text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  phone text,
  website text,
  price_range integer CHECK (price_range >= 1 AND price_range <= 4) DEFAULT 2,
  average_rating decimal(2, 1) DEFAULT 0.0,
  total_reviews integer DEFAULT 0,
  image_urls text[] DEFAULT '{}',
  opening_hours jsonb,
  features text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read restaurants"
  ON restaurants
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title text,
  content text,
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, restaurant_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own favorites"
  ON favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites"
  ON favorites
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  preferred_cuisines text[] DEFAULT '{}',
  dietary_restrictions text[] DEFAULT '{}',
  price_range_preference integer[] DEFAULT '{1,2,3,4}',
  max_distance integer DEFAULT 25,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- User interactions table
CREATE TABLE IF NOT EXISTS user_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  interaction_type text NOT NULL CHECK (interaction_type IN ('view', 'favorite', 'review', 'share')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create own interactions"
  ON user_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Petrol stations table
CREATE TABLE IF NOT EXISTS petrol_stations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  brand text,
  fuel_types text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  pricing jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE petrol_stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read petrol stations"
  ON petrol_stations
  FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurants_location ON restaurants USING GIST (point(longitude, latitude));
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON restaurants (cuisine_type);
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON restaurants (average_rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_restaurant ON reviews (restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews (user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites (user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_user ON user_interactions (user_id);
CREATE INDEX IF NOT EXISTS idx_petrol_stations_location ON petrol_stations USING GIST (point(longitude, latitude));

-- Function to update restaurant average rating
CREATE OR REPLACE FUNCTION update_restaurant_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE restaurants 
  SET 
    average_rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM reviews 
      WHERE restaurant_id = COALESCE(NEW.restaurant_id, OLD.restaurant_id)
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE restaurant_id = COALESCE(NEW.restaurant_id, OLD.restaurant_id)
    )
  WHERE id = COALESCE(NEW.restaurant_id, OLD.restaurant_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update restaurant rating when reviews change
CREATE TRIGGER update_restaurant_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_restaurant_rating();