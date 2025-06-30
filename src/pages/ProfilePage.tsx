import { ProfileForm } from '@/components/profile/ProfileForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  Heart,
  MessageCircle,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useFavorites } from '@/hooks/useRestaurants';
import { format } from 'date-fns';

export function ProfilePage() {
  const { user, profile } = useAuthStore();
  const { data: favorites } = useFavorites();

  const stats = [
    {
      label: 'Favorites',
      value: favorites?.length || 0,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      label: 'Reviews',
      value: 12, // Mock data
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      label: 'Places Visited',
      value: 28, // Mock data
      icon: MapPin,
      color: 'text-emerald-500'
    },
    {
      label: 'Avg Rating Given',
      value: '4.2',
      icon: Star,
      color: 'text-yellow-500'
    }
  ];

  const achievements = [
    { name: 'Food Explorer', description: 'Tried 5 different cuisines', icon: '🌍' },
    { name: 'Review Master', description: 'Left 10 helpful reviews', icon: '⭐' },
    { name: 'Local Guide', description: 'Discovered 3 hidden gems', icon: '🗺️' },
  ];

  const recentActivity = [
    { action: 'Favorited', place: 'Sakura Garden', time: '2 hours ago' },
    { action: 'Reviewed', place: "Olivia's Bistro", time: '1 day ago' },
    { action: 'Visited', place: 'Urban Plate', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="text-2xl">
                    {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {profile?.full_name || 'User'}
                </h2>
                
                {profile?.username && (
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    @{profile.username}
                  </p>
                )}
                
                {profile?.location && (
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin className="h-4 w-4" />
                    {profile.location}
                  </div>
                )}
                
                {profile?.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {profile.bio}
                  </p>
                )}
                
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  Joined {format(new Date(user?.created_at || ''), 'MMMM yyyy')}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {achievement.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white ml-1">
                        {activity.place}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}