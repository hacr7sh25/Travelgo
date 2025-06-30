import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Mail, 
  MapPin, 
  Camera, 
  Save,
  Settings,
  Heart,
  DollarSign
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUserPreferences, useUpdateUserPreferences } from '@/hooks/useUserPreferences';
import { CUISINE_TYPES } from '@/data/mockData';
import { toast } from 'sonner';

export function ProfileForm() {
  const { user, profile, updateProfile } = useAuthStore();
  const { data: preferences } = useUserPreferences();
  const updatePreferences = useUpdateUserPreferences();

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
  });

  const [preferencesData, setPreferencesData] = useState({
    preferred_cuisines: preferences?.preferred_cuisines || [],
    dietary_restrictions: preferences?.dietary_restrictions || [],
    price_range_preference: preferences?.price_range_preference || [1, 2, 3, 4],
    max_distance: preferences?.max_distance || 25,
  });

  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    setLoading(true);

    try {
      await updatePreferences.mutateAsync(preferencesData);
      toast.success('Preferences updated successfully!');
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleCuisineToggle = (cuisine: string) => {
    const updated = preferencesData.preferred_cuisines.includes(cuisine)
      ? preferencesData.preferred_cuisines.filter(c => c !== cuisine)
      : [...preferencesData.preferred_cuisines, cuisine];
    
    setPreferencesData(prev => ({ ...prev, preferred_cuisines: updated }));
  };

  const handleDietaryToggle = (restriction: string) => {
    const updated = preferencesData.dietary_restrictions.includes(restriction)
      ? preferencesData.dietary_restrictions.filter(r => r !== restriction)
      : [...preferencesData.dietary_restrictions, restriction];
    
    setPreferencesData(prev => ({ ...prev, dietary_restrictions: updated }));
  };

  const handlePriceRangeToggle = (price: number) => {
    const updated = preferencesData.price_range_preference.includes(price)
      ? preferencesData.price_range_preference.filter(p => p !== price)
      : [...preferencesData.price_range_preference, price];
    
    setPreferencesData(prev => ({ ...prev, price_range_preference: updated }));
  };

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Halal',
    'Kosher'
  ];

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="text-lg">
                  {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-50 dark:bg-gray-800"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            <Button type="submit" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Travel Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preferred Cuisines */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Preferred Cuisines
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {CUISINE_TYPES.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine}`}
                    checked={preferencesData.preferred_cuisines.includes(cuisine)}
                    onCheckedChange={() => handleCuisineToggle(cuisine)}
                  />
                  <label htmlFor={`cuisine-${cuisine}`} className="text-sm">
                    {cuisine}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <Label>Dietary Restrictions</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dietaryOptions.map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dietary-${restriction}`}
                    checked={preferencesData.dietary_restrictions.includes(restriction)}
                    onCheckedChange={() => handleDietaryToggle(restriction)}
                  />
                  <label htmlFor={`dietary-${restriction}`} className="text-sm">
                    {restriction}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Preference */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range Preference
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((price) => (
                <Button
                  key={price}
                  variant={preferencesData.price_range_preference.includes(price) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePriceRangeToggle(price)}
                >
                  {'$'.repeat(price)}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Select the price ranges you're comfortable with
            </p>
          </div>

          {/* Max Distance */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Maximum Travel Distance
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={preferencesData.max_distance}
                onChange={(e) => setPreferencesData(prev => ({ 
                  ...prev, 
                  max_distance: parseInt(e.target.value) || 25 
                }))}
                className="w-24"
                min="1"
                max="100"
              />
              <span className="text-sm text-gray-600">kilometers</span>
            </div>
          </div>

          <Button onClick={handlePreferencesUpdate} disabled={loading || updatePreferences.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {loading || updatePreferences.isPending ? 'Saving...' : 'Save Preferences'}
          </Button>
        </CardContent>
      </Card>

      {/* Selected Preferences Summary */}
      {(preferencesData.preferred_cuisines.length > 0 || preferencesData.dietary_restrictions.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Preferences Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {preferencesData.preferred_cuisines.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Favorite Cuisines</h4>
                <div className="flex flex-wrap gap-2">
                  {preferencesData.preferred_cuisines.map((cuisine) => (
                    <Badge key={cuisine} variant="secondary">
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {preferencesData.dietary_restrictions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Dietary Restrictions</h4>
                <div className="flex flex-wrap gap-2">
                  {preferencesData.dietary_restrictions.map((restriction) => (
                    <Badge key={restriction} variant="outline">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Price Range:</span>
                <div className="flex gap-1 mt-1">
                  {preferencesData.price_range_preference.map((price) => (
                    <Badge key={price} variant="secondary" className="text-xs">
                      {'$'.repeat(price)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Max Distance:</span>
                <div className="mt-1">{preferencesData.max_distance} km</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}