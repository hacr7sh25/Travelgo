import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RestaurantCard } from './RestaurantCard';
import { View as ViewAll, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_RESTAURANTS } from '@/data/mockData';

export function TopPlacesSection() {
  const navigate = useNavigate();
  
  // Get top 3 restaurants for display
  const topRestaurants = MOCK_RESTAURANTS.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top Places Nearby
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Discover the best-rated restaurants in your area
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/discover')}
            >
              <ViewAll className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              showDistance={true}
              distance={`${(1.2 + index * 0.5).toFixed(1)} km`}
              isFavorite={index === 1} // Mock favorite state
              disableFavorite={true} // Always disable for home page since it uses mock data
            />
          ))}
        </div>

        {/* View More Section */}
        <div className="text-center mt-12">
          <Badge variant="outline" className="mb-4">
            Showing 3 of 1000+ restaurants
          </Badge>
          <div>
            <Button
              size="lg"
              onClick={() => navigate('/discover')}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
            >
              Explore All Restaurants
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}