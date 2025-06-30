import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChefHat, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Award,
  Flame,
  DollarSign
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  popular?: boolean;
  image?: string;
}

interface MenuSectionProps {
  menu: {
    featured: MenuItem[];
    full: MenuItem[];
  };
  restaurantName: string;
}

export function MenuSection({ menu, restaurantName }: MenuSectionProps) {
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group full menu items by category
  const menuByCategory = menu.full.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categories = ['all', ...Object.keys(menuByCategory)];

  const filteredMenuItems = selectedCategory === 'all' 
    ? menu.full 
    : menuByCategory[selectedCategory] || [];

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ChefHat className="h-6 w-6 text-primary" />
            Verified Menu
            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
              <Award className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </CardTitle>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Updated daily by {restaurantName}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Featured Items */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Featured Items
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {menu.featured.map((item) => (
              <Card key={item.id} className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {item.image && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          {item.popular && (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <span className="font-bold text-primary text-lg">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Full Menu Toggle */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowFullMenu(!showFullMenu)}
            className="flex items-center gap-2"
          >
            {showFullMenu ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Full Menu
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                View Full Menu ({menu.full.length} items)
              </>
            )}
          </Button>
        </div>

        {/* Full Menu */}
        {showFullMenu && (
          <div className="space-y-6">
            <Separator />
            
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Complete Menu</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category === 'all' ? 'All Items' : category}
                    {category !== 'all' && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {menuByCategory[category]?.length || 0}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            {selectedCategory === 'all' ? (
              // Show all items grouped by category
              <div className="space-y-8">
                {Object.entries(menuByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 capitalize">
                      {category}
                    </h4>
                    <div className="grid gap-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </h5>
                              {item.popular && (
                                <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                          <div className="ml-4 text-right">
                            <span className="font-semibold text-primary">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Show filtered items
              <div className="grid gap-3">
                {filteredMenuItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h5>
                        {item.popular && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <span className="font-semibold text-primary">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Menu Footer */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Prices are subject to change. Please confirm with restaurant for the most current pricing.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Menu verified by restaurant
                </span>
                <span>•</span>
                <span>Last updated: Today</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}