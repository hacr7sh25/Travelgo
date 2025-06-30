import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  Route,
  Users,
  MapPin,
  Star,
  Navigation,
  Coffee,
  Car
} from 'lucide-react';

const features = [
  {
    icon: Settings,
    title: 'Personalize',
    description: 'Customize your experience',
    details: 'Set your cuisine preferences, dietary restrictions, and budget to get recommendations tailored just for you.',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
  },
  {
    icon: Route,
    title: 'Journeys',
    description: 'Plan your travel routes',
    details: 'Create custom routes with stops at restaurants and attractions. Perfect for road trips and travel planning.',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with travelers',
    details: 'Share your experiences, read authentic reviews, and discover hidden gems recommended by fellow travelers.',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
  },
  {
    icon: MapPin,
    title: 'Explore Map',
    description: 'Find places nearby',
    details: 'Interactive map view showing restaurants, gas stations, and points of interest along your route.',
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
  }
];

const additionalFeatures = [
  {
    icon: Coffee,
    title: 'Great Restaurants',
    description: 'Discover handpicked dining options that match your taste preferences.',
  },
  {
    icon: Navigation,
    title: 'Route Planning',
    description: 'Plan your journey with convenient stops for fuel and food along your route.',
  },
  {
    icon: Star,
    title: 'Reviews & Ratings',
    description: 'Make informed choices with authentic reviews and ratings from other travelers.',
  },
  {
    icon: Car,
    title: 'Travel Essentials',
    description: 'Find petrol stations, rest areas, and other essential stops for your journey.',
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Discover More Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything You Need for Your Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From personalized recommendations to route planning, TravelGo provides all the tools you need for memorable travels.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              The TravelGo Experience
            </h3>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Discover, Dine, and Drive
            </h4>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform helps you find the perfect balance between amazing experiences and convenient travel stops.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}