import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Search, 
  Filter, 
  MapPin, 
  Star,
  Trash2,
  Share,
  Navigation
} from 'lucide-react';
import { useFavorites } from '@/hooks/useRestaurants';
import { RestaurantCard } from '@/components/home/RestaurantCard';

export function FavoritesPage() {
  const { data: favorites, isLoading } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'added'>('added');

  const filteredFavorites = favorites?.filter(favorite =>
    favorite.restaurants?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    favorite.restaurants?.cuisine_type?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.restaurants?.name || '').localeCompare(b.restaurants?.name || '');
      case 'rating':
        return (b.restaurants?.average_rating || 0) - (a.restaurants?.average_rating || 0);
      case 'added':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse card-shadow">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-heading flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-500" />
                My Favorites
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Your saved restaurants and places
              </p>
            </div>

            <div className="flex items-center gap-3 mobile-stack">
              <div className="relative mobile-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 mobile-full input-focus"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary input-focus"
              >
                <option value="added">Recently Added</option>
                <option value="name">Name A-Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="card-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-heading">
                {favorites?.length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Favorites
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-heading">
                {new Set(favorites?.map(f => f.restaurants?.cuisine_type).filter(Boolean)).size || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Cuisine Types
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-heading">
                {(favorites?.reduce((avg, f) => avg + (f.restaurants?.average_rating || 0), 0) / (favorites?.length || 1) || 0).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Rating
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-heading">
                {favorites?.filter(f => f.restaurants?.price_range && f.restaurants.price_range <= 2).length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Budget-Friendly
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Favorites Grid */}
        {sortedFavorites.length === 0 ? (
          <Card className="text-center py-16 card-shadow">
            <CardContent>
              <div className="flex flex-col items-center gap-6">
                <Heart className="h-16 w-16 text-gray-400" />
                <div>
                  <h3 className="text-xl font-semibold text-heading mb-3">
                    {searchQuery ? 'No favorites match your search' : 'No favorites yet'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    {searchQuery 
                      ? 'Try adjusting your search terms or browse all your favorites.'
                      : 'Start exploring restaurants and save your favorites by clicking the heart icon.'
                    }
                  </p>
                </div>
                {!searchQuery && (
                  <Button onClick={() => window.location.href = '/discover'} className="btn-hover">
                    <MapPin className="h-4 w-4 mr-2" />
                    Discover Restaurants
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-heading">
                  {searchQuery ? 'Search Results' : 'Your Favorites'}
                </h2>
                <Badge variant="outline">
                  {sortedFavorites.length} places
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="btn-hover">
                  <Share className="h-4 w-4 mr-2" />
                  Share List
                </Button>
                <Button variant="outline" size="sm" className="btn-hover">
                  <Navigation className="h-4 w-4 mr-2" />
                  Plan Route
                </Button>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedFavorites.map((favorite) => {
                if (!favorite.restaurants) return null;
                
                return (
                  <RestaurantCard
                    key={favorite.id}
                    restaurant={favorite.restaurants}
                    isFavorite={true}
                    showDistance={true}
                    distance={`${(Math.random() * 5 + 0.5).toFixed(1)} km`}
                  />
                );
              })}
            </div>

            {/* Cuisine Type Summary */}
            <Card className="mt-12 card-shadow">
              <CardHeader className="pb-4">
                <CardTitle>Your Favorite Cuisines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(favorites?.map(f => f.restaurants?.cuisine_type).filter(Boolean)))
                    .map((cuisine) => {
                      const count = favorites?.filter(f => f.restaurants?.cuisine_type === cuisine).length || 0;
                      return (
                        <Badge key={cuisine} variant="secondary" className="text-sm">
                          {cuisine} ({count})
                        </Badge>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}