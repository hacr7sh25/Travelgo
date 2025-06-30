import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Star, 
  MapPin, 
  Phone, 
  ExternalLink,
  Lightbulb,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoriteRestaurant } from '@/hooks/useRestaurants';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  restaurant: {
    id: string;
    name: string;
    description: string | null;
    cuisine_type: string | null;
    address: string | null;
    phone: string | null;
    website: string | null;
    price_range: number;
    average_rating: number;
    total_reviews: number;
    image_urls: string[];
    features: string[];
    recommendationReason?: string;
  };
  isFavorite?: boolean;
  showDistance?: boolean;
  distance?: string;
}

const getPriceRangeSymbol = (range: number) => {
  return '$'.repeat(Math.max(1, Math.min(4, range)));
};

export function RecommendationCard({ 
  restaurant, 
  isFavorite = false, 
  showDistance = false, 
  distance 
}: RecommendationCardProps) {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const favoriteMutation = useFavoriteRestaurant();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    favoriteMutation.mutate({
      restaurantId: restaurant.id,
      isFavorite: !isFavorite
    });
  };

  const handleCardClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm">
      <div className="relative" onClick={handleCardClick}>
        {/* Recommendation Reason Badge */}
        {restaurant.recommendationReason && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              {restaurant.recommendationReason}
            </Badge>
          </div>
        )}

        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
          {restaurant.image_urls.length > 0 && (
            <img
              src={restaurant.image_urls[0]}
              alt={restaurant.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                "group-hover:scale-105",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Favorite Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 right-3 w-9 h-9 p-0 bg-white/90 hover:bg-white transition-colors"
            onClick={handleFavoriteToggle}
          >
            <Heart className={cn(
              "h-4 w-4 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            )} />
          </Button>

          {/* Distance Badge */}
          {showDistance && distance && (
            <Badge className="absolute bottom-3 left-3 bg-black/70 text-white border-0">
              <MapPin className="h-3 w-3 mr-1" />
              {distance}
            </Badge>
          )}

          {/* Cuisine Type */}
          {restaurant.cuisine_type && (
            <Badge 
              variant="secondary" 
              className="absolute bottom-3 right-3 bg-white/90 text-gray-900"
            >
              {restaurant.cuisine_type}
            </Badge>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-1 text-orange-500">
                  {[...Array(restaurant.price_range)].map((_, i) => (
                    <DollarSign key={i} className="h-4 w-4" />
                  ))}
                </div>
              </div>
              
              {restaurant.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {restaurant.description}
                </p>
              )}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {restaurant.average_rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({restaurant.total_reviews} reviews)
                </span>
              </div>
              
              {restaurant.features.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {restaurant.features[0]}
                </Badge>
              )}
            </div>

            {/* Address */}
            {restaurant.address && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{restaurant.address}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              {restaurant.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleExternalLink(e, `tel:${restaurant.phone}`)}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              )}
              
              {restaurant.website && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleExternalLink(e, restaurant.website!)}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}