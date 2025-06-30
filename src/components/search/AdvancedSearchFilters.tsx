import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Star, 
  DollarSign,
  Clock,
  Utensils,
  Wifi,
  Car,
  Users,
  Heart,
  Zap
} from 'lucide-react';
import { CUISINE_TYPES } from '@/data/mockData';

export interface SearchFilters {
  query: string;
  cuisines: string[];
  priceRange: number[];
  minRating: number;
  maxDistance: number;
  openNow: boolean;
  features: string[];
  dietaryRestrictions: string[];
  sortBy: string;
}

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  resultCount?: number;
}

const RESTAURANT_FEATURES = [
  'Outdoor Seating',
  'Takeout Available',
  'Delivery Available',
  'Reservations Required',
  'Walk-ins Welcome',
  'Live Music',
  'Happy Hour',
  'Brunch',
  'Late Night',
  'Private Events',
  'Wine Bar',
  'Craft Cocktails',
  'Free WiFi',
  'Parking Available',
  'Wheelchair Accessible',
  'Pet Friendly',
  'Family Friendly',
  'Date Night',
  'Business Dining',
  'Group Dining'
];

const DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Halal',
  'Kosher',
  'Keto-Friendly',
  'Low-Carb',
  'Organic Options'
];

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'distance', label: 'Nearest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' }
];

export function AdvancedSearchFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  resultCount
}: AdvancedSearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter(c => c !== cuisine)
      : [...filters.cuisines, cuisine];
    updateFilters({ cuisines: newCuisines });
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    updateFilters({ features: newFeatures });
  };

  const toggleDietaryRestriction = (restriction: string) => {
    const newRestrictions = filters.dietaryRestrictions.includes(restriction)
      ? filters.dietaryRestrictions.filter(r => r !== restriction)
      : [...filters.dietaryRestrictions, restriction];
    updateFilters({ dietaryRestrictions: newRestrictions });
  };

  const getPriceRangeText = (range: number[]) => {
    const symbols = ['$', '$$', '$$$', '$$$$'];
    if (range[0] === range[1]) {
      return symbols[range[0] - 1];
    }
    return `${symbols[range[0] - 1]} - ${symbols[range[1] - 1]}`;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.query) count++;
    if (filters.cuisines.length > 0) count++;
    if (filters.priceRange[0] !== 1 || filters.priceRange[1] !== 4) count++;
    if (filters.minRating > 0) count++;
    if (filters.maxDistance < 50) count++;
    if (filters.openNow) count++;
    if (filters.features.length > 0) count++;
    if (filters.dietaryRestrictions.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search restaurants, cuisines, dishes..."
                value={filters.query}
                onChange={(e) => updateFilters({ query: e.target.value })}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={filters.openNow ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ openNow: !filters.openNow })}
            >
              <Clock className="h-3 w-3 mr-1" />
              Open Now
            </Button>
            
            {['Italian', 'Japanese', 'Mexican', 'American'].map((cuisine) => (
              <Button
                key={cuisine}
                variant={filters.cuisines.includes(cuisine) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCuisine(cuisine)}
              >
                {cuisine}
              </Button>
            ))}

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Results Count */}
          {resultCount !== undefined && (
            <div className="mt-3 pt-3 border-t text-sm text-gray-600 dark:text-gray-400">
              Found {resultCount} restaurants
              {filters.query && ` for "${filters.query}"`}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Advanced Filters</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Cuisine Types */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Cuisine Types
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {CUISINE_TYPES.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cuisine-${cuisine}`}
                      checked={filters.cuisines.includes(cuisine)}
                      onCheckedChange={() => toggleCuisine(cuisine)}
                    />
                    <label htmlFor={`cuisine-${cuisine}`} className="text-sm cursor-pointer">
                      {cuisine}
                    </label>
                  </div>
                ))}
              </div>
              {filters.cuisines.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {filters.cuisines.map((cuisine) => (
                    <Badge key={cuisine} variant="secondary" className="text-xs">
                      {cuisine}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive"
                        onClick={() => toggleCuisine(cuisine)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price Range
                </Label>
                <span className="text-sm text-muted-foreground">
                  {getPriceRangeText(filters.priceRange)}
                </span>
              </div>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value })}
                min={1}
                max={4}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$ Budget</span>
                <span>$$ Moderate</span>
                <span>$$$ Upscale</span>
                <span>$$$$ Fine Dining</span>
              </div>
            </div>

            <Separator />

            {/* Rating and Distance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Minimum Rating
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {filters.minRating > 0 ? `${filters.minRating}+ stars` : 'Any rating'}
                  </span>
                </div>
                <Slider
                  value={[filters.minRating]}
                  onValueChange={(value) => updateFilters({ minRating: value[0] })}
                  min={0}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Maximum Distance
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {filters.maxDistance} km
                  </span>
                </div>
                <Slider
                  value={[filters.maxDistance]}
                  onValueChange={(value) => updateFilters({ maxDistance: value[0] })}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <Separator />

            {/* Restaurant Features */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Restaurant Features
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {RESTAURANT_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
              {filters.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {filters.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive"
                        onClick={() => toggleFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Dietary Restrictions */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Dietary Restrictions
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {DIETARY_RESTRICTIONS.map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dietary-${restriction}`}
                      checked={filters.dietaryRestrictions.includes(restriction)}
                      onCheckedChange={() => toggleDietaryRestriction(restriction)}
                    />
                    <label htmlFor={`dietary-${restriction}`} className="text-sm cursor-pointer">
                      {restriction}
                    </label>
                  </div>
                ))}
              </div>
              {filters.dietaryRestrictions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {filters.dietaryRestrictions.map((restriction) => (
                    <Badge key={restriction} variant="secondary" className="text-xs">
                      {restriction}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive"
                        onClick={() => toggleDietaryRestriction(restriction)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Filters Button */}
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={() => setIsExpanded(false)} className="flex-1">
                Apply Filters ({activeFiltersCount})
              </Button>
              <Button variant="outline" onClick={onClearFilters}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}