import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { X, Filter } from 'lucide-react';

interface MapFiltersProps {
  cuisineTypes: string[];
  onCuisineChange: (cuisines: string[]) => void;
  onPriceRangeChange: (range: number[]) => void;
  onRatingChange: (rating: number) => void;
  onDistanceChange: (distance: number) => void;
  onPetrolStationsToggle?: (show: boolean) => void;
  showPetrolStations?: boolean;
}

export function MapFilters({
  cuisineTypes,
  onCuisineChange,
  onPriceRangeChange,
  onRatingChange,
  onDistanceChange,
  onPetrolStationsToggle,
  showPetrolStations = true,
}: MapFiltersProps) {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([1, 4]);
  const [rating, setRating] = useState<number>(0);
  const [distance, setDistance] = useState<number>(25);

  const handleCuisineSelect = (cuisine: string) => {
    const newCuisines = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter(c => c !== cuisine)
      : [...selectedCuisines, cuisine];
    
    setSelectedCuisines(newCuisines);
    onCuisineChange(newCuisines);
  };

  const removeCuisine = (cuisine: string) => {
    const newCuisines = selectedCuisines.filter(c => c !== cuisine);
    setSelectedCuisines(newCuisines);
    onCuisineChange(newCuisines);
  };

  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  const handleDistanceChange = (newDistance: number) => {
    setDistance(newDistance);
    onDistanceChange(newDistance);
  };

  const clearAllFilters = () => {
    setSelectedCuisines([]);
    setPriceRange([1, 4]);
    setRating(0);
    setDistance(25);
    onCuisineChange([]);
    onPriceRangeChange([1, 4]);
    onRatingChange(0);
    onDistanceChange(25);
  };

  const getPriceRangeText = (range: number[]) => {
    const symbols = ['$', '$$', '$$$', '$$$$'];
    if (range[0] === range[1]) {
      return symbols[range[0] - 1];
    }
    return `${symbols[range[0] - 1]} - ${symbols[range[1] - 1]}`;
  };

  const hasActiveFilters = selectedCuisines.length > 0 || 
                          priceRange[0] !== 1 || priceRange[1] !== 4 || 
                          rating > 0 || 
                          distance < 25;

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Show/Hide Petrol Stations */}
        {onPetrolStationsToggle && (
          <div className="flex items-center justify-between">
            <Label htmlFor="petrol-stations" className="text-sm font-medium">
              Show Petrol Stations
            </Label>
            <Switch
              id="petrol-stations"
              checked={showPetrolStations}
              onCheckedChange={onPetrolStationsToggle}
            />
          </div>
        )}

        {/* Cuisine Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Cuisine Type</label>
          <Select onValueChange={handleCuisineSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine types" />
            </SelectTrigger>
            <SelectContent>
              {cuisineTypes.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedCuisines.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCuisines.map((cuisine) => (
                <Badge key={cuisine} variant="secondary" className="flex items-center gap-1">
                  {cuisine}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => removeCuisine(cuisine)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Price Range</label>
            <span className="text-sm text-muted-foreground">
              {getPriceRangeText(priceRange)}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            min={1}
            max={4}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$</span>
            <span>$$</span>
            <span>$$$</span>
            <span>$$$$</span>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Minimum Rating</label>
            <span className="text-sm text-muted-foreground">
              {rating > 0 ? `${rating}+ stars` : 'Any rating'}
            </span>
          </div>
          <Slider
            value={[rating]}
            onValueChange={(value) => handleRatingChange(value[0])}
            min={0}
            max={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Any</span>
            <span>2+</span>
            <span>3+</span>
            <span>4+</span>
            <span>5</span>
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Maximum Distance</label>
            <span className="text-sm text-muted-foreground">
              {distance} km
            </span>
          </div>
          <Slider
            value={[distance]}
            onValueChange={(value) => handleDistanceChange(value[0])}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 km</span>
            <span>25 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-2">Active filters:</p>
            <div className="space-y-1 text-xs">
              {selectedCuisines.length > 0 && (
                <p>• {selectedCuisines.length} cuisine type(s)</p>
              )}
              {(priceRange[0] !== 1 || priceRange[1] !== 4) && (
                <p>• Price: {getPriceRangeText(priceRange)}</p>
              )}
              {rating > 0 && (
                <p>• Rating: {rating}+ stars</p>
              )}
              {distance < 25 && (
                <p>• Distance: within {distance} km</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}