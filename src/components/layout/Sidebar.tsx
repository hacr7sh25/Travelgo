import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Home, Map, Compass, Heart, User, Settings, Moon, Sun, LogOut, Search, Navigation, GripIcon as Car, Coffee, MapPin, Users } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore Map', href: '/map', icon: Map },
  { name: 'Discover', href: '/discover', icon: Compass },
  { name: 'Recommendations', href: '/recommendations', icon: Coffee },
  { name: 'Community', href: '/community', icon: Users },
];

const account = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Favorites', href: '/favorites', icon: Heart },
  { name: 'Trip Planner', href: '/trip-planner', icon: Car },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className={cn(
      'flex h-full flex-col border-r bg-gray-50 dark:bg-gray-900 transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
      className
    )}>
      {/* Header */}
      <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-700 px-4 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <MapPin className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-heading">TravelGo</span>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {/* Search */}
          {!isCollapsed && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary input-focus"
              />
            </div>
          )}

          {/* Main Navigation */}
          <div className="space-y-1">
            {!isCollapsed && (
              <h4 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Main
              </h4>
            )}
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 btn-hover',
                    isCollapsed && 'justify-center px-2',
                    isActive && 'bg-primary/10 text-primary font-medium'
                  )}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Button>
              );
            })}
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Account Section */}
          <div className="space-y-1">
            {!isCollapsed && (
              <h4 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Account
              </h4>
            )}
            {account.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 btn-hover',
                    isCollapsed && 'justify-center px-2',
                    isActive && 'bg-primary/10 text-primary font-medium'
                  )}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                  {item.name === 'Favorites' && !isCollapsed && (
                    <Badge variant="secondary" className="ml-auto">
                      3
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="space-y-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'w-full justify-start gap-3 btn-hover',
              isCollapsed && 'justify-center px-2'
            )}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 shrink-0" />
            ) : (
              <Moon className="h-4 w-4 shrink-0" />
            )}
            {!isCollapsed && (
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            )}
          </Button>

          {/* User Info & Sign Out */}
          {user && (
            <>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div className={cn(
                'flex items-center gap-3 px-2 py-1',
                isCollapsed && 'justify-center'
              )}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {user.email?.[0]?.toUpperCase()}
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-heading">
                      {user.email}
                    </p>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 btn-hover',
                  isCollapsed && 'justify-center px-2'
                )}
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>Sign Out</span>}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}