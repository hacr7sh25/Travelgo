import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, 
  MapPin, 
  Star,
  TrendingUp,
  Clock,
  Users,
  Utensils,
  Coffee,
  Pizza,
  Soup
} from 'lucide-react';
import { useRestaurants } from '@/hooks/useRestaurants';
import { RestaurantCard } from '@/components/home/RestaurantCard';
import { AdvancedSearchFilters, type SearchFilters } from '@/components/search/AdvancedSearchFilters';
import { CUISINE_TYPES } from '@/data/mockData';

const categories = [
  { id: 'trending', label: 'Trending Now', icon: TrendingUp, color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' },
  { id: 'nearby', label: 'Near You', icon: MapPin, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' },
  { id: 'top-rated', label: 'Top Rated', icon: Star, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' },
  { id: 'new', label: 'New Places', icon: Clock, color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' },
  { id: 'popular', label: 'Most Popular', icon: Users, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' },
];

export function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    cuisines: [],
    priceRange: [1, 4],
    minRating: 0,
    maxDistance: 50,
    openNow: false,
    features: [],
    dietaryRestrictions: [],
    sortBy: 'relevance'
  });
  
  const { data: restaurantsData, isLoading } = useRestaurants({
    cuisine: filters.cuisines.length > 0 ? filters.cuisines[0] : undefined,
    priceRange: filters.priceRange[0] !== 1 || filters.priceRange[1] !== 4 ? filters.priceRange : undefined,
    rating: filters.minRating > 0 ? filters.minRating : undefined,
  });

  const restaurants = restaurantsData?.restaurants || [];
  const isUsingMockData = restaurantsData?.isUsingMockData || false;

  // Apply all filters to restaurants
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Text search
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      const matchesName = restaurant.name.toLowerCase().includes(searchTerm);
      const matchesCuisine = restaurant.cuisine_type?.toLowerCase().includes(searchTerm);
      const matchesDescription = restaurant.description?.toLowerCase().includes(searchTerm);
      
      if (!matchesName && !matchesCuisine && !matchesDescription) {
        return false;
      }
    }

    // Cuisine filter
    if (filters.cuisines.length > 0 && !filters.cuisines.includes(restaurant.cuisine_type || '')) {
      return false;
    }

    // Price range filter
    if (restaurant.price_range < filters.priceRange[0] || restaurant.price_range > filters.priceRange[1]) {
      return false;
    }

    // Rating filter
    if (restaurant.average_rating < filters.minRating) {
      return false;
    }

    // Features filter (mock implementation)
    if (filters.features.length > 0) {
      const hasFeature = filters.features.some(feature => 
        restaurant.features?.includes(feature)
      );
      if (!hasFeature) {
        return false;
      }
    }

    // Dietary restrictions filter (mock implementation)
    if (filters.dietaryRestrictions.length > 0) {
      const hasDietaryOption = filters.dietaryRestrictions.some(restriction => {
        if (restriction === 'Vegetarian' && restaurant.features?.includes('Vegetarian Options')) return true;
        if (restriction === 'Vegan' && restaurant.features?.includes('Vegan Options')) return true;
        if (restriction === 'Gluten-Free' && restaurant.features?.includes('Gluten-Free Options')) return true;
        return false;
      });
      if (!hasDietaryOption) {
        return false;
      }
    }

    return true;
  });

  // Sort restaurants based on selected sort option
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return b.average_rating - a.average_rating;
      case 'reviews':
        return b.total_reviews - a.total_reviews;
      case 'price-low':
        return a.price_range - b.price_range;
      case 'price-high':
        return b.price_range - a.price_range;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'distance':
        // Mock distance sorting
        return Math.random() - 0.5;
      default: // relevance
        return b.average_rating * b.total_reviews - a.average_rating * a.total_reviews;
    }
  });

  const getCategoryRestaurants = () => {
    if (!sortedRestaurants) return [];
    
    switch (selectedCategory) {
      case 'trending':
        return [...sortedRestaurants].sort((a, b) => b.total_reviews - a.total_reviews).slice(0, 12);
      case 'nearby':
        return sortedRestaurants.slice(0, 12); // In real app, sort by distance
      case 'top-rated':
        return [...sortedRestaurants].sort((a, b) => b.average_rating - a.average_rating).slice(0, 12);
      case 'new':
        return [...sortedRestaurants].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 12);
      case 'popular':
        return [...sortedRestaurants].sort((a, b) => b.total_reviews - a.total_reviews).slice(0, 12);
      default:
        return sortedRestaurants.slice(0, 12);
    }
  };

  const displayRestaurants = getCategoryRestaurants();

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      cuisines: [],
      priceRange: [1, 4],
      minRating: 0,
      maxDistance: 50,
      openNow: false,
      features: [],
      dietaryRestrictions: [],
      sortBy: 'relevance'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-heading flex items-center gap-3">
                <Compass className="h-8 w-8 text-primary" />
                Discover
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Find amazing restaurants and hidden gems
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card className="card-shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = selectedCategory === category.id;
                    
                    return (
                      <Button
                        key={category.id}
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full justify-start gap-3 btn-hover ${
                          isActive ? 'bg-primary/10 text-primary font-medium' : ''
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className={`p-1 rounded ${category.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {category.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="card-shadow">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Discovery Stats</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-heading">{restaurants.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Restaurants</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-lg font-semibold text-heading">{displayRestaurants.length}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Filtered Results</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-heading">4.2</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Advanced Search Filters */}
            <AdvancedSearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              resultCount={displayRestaurants.length}
            />

            {/* Loading State */}
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse card-shadow">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : displayRestaurants.length === 0 ? (
              <Card className="text-center py-12 card-shadow">
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <Compass className="h-12 w-12 text-gray-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-heading mb-2">
                        No restaurants found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md">
                        Try adjusting your search terms or filters to discover more places.
                      </p>
                    </div>
                    <Button onClick={handleClearFilters} className="btn-hover">
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold text-heading">
                      {categories.find(c => c.id === selectedCategory)?.label}
                    </h2>
                    <Badge variant="outline">
                      {displayRestaurants.length} places
                    </Badge>
                  </div>
                </div>

                {/* Restaurant Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {displayRestaurants.map((restaurant, index) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      showDistance={true}
                      distance={`${(1.2 + index * 0.3).toFixed(1)} km`}
                      isFavorite={index % 4 === 0} // Mock favorite state
                      disableFavorite={isUsingMockData}
                    />
                  ))}
                </div>

                {/* Load More */}
                {displayRestaurants.length >= 12 && (
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="btn-hover">
                      Load More Restaurants
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}