import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Camera, 
  TrendingUp,
  Star,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const communityStats = [
  { label: 'Active Travelers', value: '25,000+', icon: Users },
  { label: 'Reviews Posted', value: '150K+', icon: MessageCircle },
  { label: 'Photos Shared', value: '500K+', icon: Camera },
  { label: 'Places Discovered', value: '10K+', icon: MapPin }
];

const recentActivity = [
  {
    user: { name: 'Sarah Chen', avatar: '', initials: 'SC' },
    action: 'reviewed',
    place: 'Sakura Garden',
    rating: 5,
    timeAgo: '2 hours ago',
    location: 'Tokyo, Japan'
  },
  {
    user: { name: 'Mike Rodriguez', avatar: '', initials: 'MR' },
    action: 'discovered',
    place: 'Hidden Gem Cafe',
    rating: 4,
    timeAgo: '5 hours ago',
    location: 'Barcelona, Spain'
  },
  {
    user: { name: 'Emma Thompson', avatar: '', initials: 'ET' },
    action: 'shared photos from',
    place: 'Mountain View Restaurant',
    rating: 5,
    timeAgo: '1 day ago',
    location: 'Swiss Alps'
  }
];

export function CommunitySection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4">
                Join Our Community
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Share Your Travel Adventures
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Become part of our growing community of food and travel enthusiasts. 
                Leave reviews, share photos, and help others discover amazing places.
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-2 gap-4">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Create Your Profile
            </Button>
          </div>

          {/* Right Content - Activity Feed */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Recent Community Activity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                See what fellow travelers are discovering
              </p>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          {activity.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {activity.user.name}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {activity.action}
                          </span>
                          <span className="font-medium text-primary">
                            {activity.place}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span>•</span>
                          <span>{activity.location}</span>
                          <span>•</span>
                          <span>{activity.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" onClick={() => navigate('/community')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Activity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}