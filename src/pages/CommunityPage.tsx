import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Search, 
  Filter, 
  Star,
  MapPin,
  MessageCircle,
  Heart,
  Camera,
  TrendingUp,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

// Mock community activity data
const communityActivity = [
  {
    id: '1',
    type: 'review',
    user: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
    action: 'reviewed',
    target: 'Sakura Garden',
    rating: 5,
    content: 'Amazing sushi and great atmosphere! The chef was incredibly skilled.',
    location: 'Tokyo, Japan',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    type: 'discovery',
    user: { name: 'Mike Rodriguez', avatar: '', initials: 'MR' },
    action: 'discovered',
    target: 'Hidden Gem Cafe',
    rating: 4,
    content: 'Found this amazing little cafe tucked away in the old town. Best coffee I\'ve had in months!',
    location: 'Barcelona, Spain',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 8,
    comments: 2
  },
  {
    id: '3',
    type: 'photo',
    user: { name: 'Emma Thompson', avatar: '', initials: 'ET' },
    action: 'shared photos from',
    target: 'Mountain View Restaurant',
    rating: 5,
    content: 'The view from this restaurant is absolutely breathtaking! Perfect for a romantic dinner.',
    location: 'Swiss Alps',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    likes: 24,
    comments: 7,
    images: ['https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '4',
    type: 'favorite',
    user: { name: 'David Kim', avatar: '', initials: 'DK' },
    action: 'added to favorites',
    target: 'Pasta Paradise',
    location: 'Rome, Italy',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 5,
    comments: 1
  },
  {
    id: '5',
    type: 'trip',
    user: { name: 'Lisa Wang', avatar: '', initials: 'LW' },
    action: 'planned a trip to',
    target: 'Food Tour: Paris',
    content: '5-day culinary adventure through the best bistros and patisseries in Paris!',
    location: 'Paris, France',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    likes: 18,
    comments: 9
  }
];

const trendingTopics = [
  { name: 'Japanese Cuisine', count: 156 },
  { name: 'Hidden Gems', count: 89 },
  { name: 'Romantic Dining', count: 67 },
  { name: 'Street Food', count: 45 },
  { name: 'Vegetarian', count: 34 }
];

export function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'reviews' | 'photos' | 'discoveries'>('all');

  const filteredActivity = communityActivity.filter(activity => {
    const matchesSearch = activity.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.content?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'reviews' && activity.type === 'review') ||
                         (selectedFilter === 'photos' && activity.type === 'photo') ||
                         (selectedFilter === 'discoveries' && activity.type === 'discovery');
    
    return matchesSearch && matchesFilter;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review': return MessageCircle;
      case 'photo': return Camera;
      case 'discovery': return MapPin;
      case 'favorite': return Heart;
      case 'trip': return TrendingUp;
      default: return MessageCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'review': return 'text-blue-500';
      case 'photo': return 'text-purple-500';
      case 'discovery': return 'text-emerald-500';
      case 'favorite': return 'text-red-500';
      case 'trip': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-heading flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Community
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover what fellow travelers are experiencing
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search activity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 input-focus"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="xl:col-span-3 space-y-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Activity', icon: Users },
                { id: 'reviews', label: 'Reviews', icon: MessageCircle },
                { id: 'photos', label: 'Photos', icon: Camera },
                { id: 'discoveries', label: 'Discoveries', icon: MapPin }
              ].map((filter) => {
                const Icon = filter.icon;
                const isActive = selectedFilter === filter.id;
                
                return (
                  <Button
                    key={filter.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id as any)}
                    className="flex items-center gap-2 btn-hover"
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              {filteredActivity.length === 0 ? (
                <Card className="text-center py-12 card-shadow">
                  <CardContent>
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-heading mb-2">
                      No activity found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search or filter to see more activity.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  const iconColor = getActivityColor(activity.type);
                  
                  return (
                    <Card key={activity.id} className="hover:shadow-md transition-shadow card-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {activity.user.initials}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-heading">
                                {activity.user.name}
                              </span>
                              <Icon className={`h-4 w-4 ${iconColor}`} />
                              <span className="text-gray-600 dark:text-gray-400">
                                {activity.action}
                              </span>
                              <span className="font-medium text-primary">
                                {activity.target}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {activity.rating && (
                                <div className="flex items-center gap-1">
                                  {[...Array(activity.rating)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              )}
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(activity.timestamp, 'MMM d, h:mm a')}
                              </span>
                            </div>
                            
                            {activity.content && (
                              <p className="text-body mb-3 leading-relaxed">
                                {activity.content}
                              </p>
                            )}
                            
                            {activity.images && activity.images.length > 0 && (
                              <div className="mb-3">
                                <img
                                  src={activity.images[0]}
                                  alt="Shared photo"
                                  className="rounded-lg max-w-sm h-48 object-cover"
                                />
                              </div>
                            )}
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <button className="flex items-center gap-1 hover:text-red-500 transition-colors btn-hover">
                                <Heart className="h-4 w-4" />
                                {activity.likes}
                              </button>
                              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors btn-hover">
                                <MessageCircle className="h-4 w-4" />
                                {activity.comments}
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Community Stats */}
            <Card className="card-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-heading">25,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Travelers</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-heading">150K+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Reviews</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-heading">500K+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Photos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="card-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-heading">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-body">
                        {topic.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {topic.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Join Community CTA */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 card-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold text-heading mb-2">
                  Join the Conversation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Share your travel experiences and discover amazing places through our community.
                </p>
                <Button className="w-full btn-hover">
                  Create Your Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}