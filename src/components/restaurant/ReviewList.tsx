import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { MOCK_REVIEWS } from '@/data/mockData';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface ReviewListProps {
  restaurantId: string;
}

export function ReviewList({ restaurantId }: ReviewListProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and get reviews for this restaurant
    const timer = setTimeout(() => {
      const restaurantReviews = MOCK_REVIEWS
        .filter(review => review.restaurant_id === restaurantId)
        .map(review => ({
          ...review,
          profiles: {
            username: `user_${review.user_id?.slice(4, 8)}`,
            full_name: `User ${review.user_id?.slice(4, 8)}`,
            avatar_url: null
          }
        }));
      
      setReviews(restaurantReviews);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No reviews yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to share your experience at this restaurant!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={review.profiles?.avatar_url || ''} />
                <AvatarFallback>
                  {review.profiles?.full_name?.[0] || review.profiles?.username?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {review.profiles?.full_name || review.profiles?.username || 'Anonymous'}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {review.rating}/5
                  </Badge>
                </div>
                
                {review.title && (
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {review.title}
                  </h4>
                )}
                
                {review.content && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
                    {review.content}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>
                    {format(new Date(review.created_at), 'MMM d, yyyy')}
                  </span>
                  {review.created_at !== review.updated_at && (
                    <>
                      <span>•</span>
                      <span>Edited</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}