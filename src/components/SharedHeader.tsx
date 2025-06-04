
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Home } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import NotificationCenter from '@/components/NotificationCenter';
import EnhancedMobileNavigation from '@/components/EnhancedMobileNavigation';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import AnimatedButton from './AnimatedButton';

interface SharedHeaderProps {
  title: string;
  subtitle: string;
  showSearch?: boolean;
  showFilters?: boolean;
  onOpenSearch?: () => void;
  onOpenFilters?: () => void;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  title,
  subtitle,
  showSearch = false,
  showFilters = false,
  onOpenSearch,
  onOpenFilters
}) => {
  const navigate = useNavigate();
  const deadlines = getTaxDeadlines('self-employed');

  const urgentCount = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    return deadlineDate >= today && deadlineDate <= oneWeekFromNow && deadline.priority === 'high';
  }).length;

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'search':
        onOpenSearch?.();
        break;
      case 'filter':
        onOpenFilters?.();
        break;
      default:
        console.log('Quick action:', action);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-7xl">
      {/* Top Row: Logo and Navigation */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo and Slogan */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            UK Tax Doctor
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Smart tax deadline management
          </p>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-2">
          {/* Simplified Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm bg-white/90 backdrop-blur-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800">
                    Calculators
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-3 w-[300px] bg-white dark:bg-gray-800 z-[9999] border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm">
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/penalty-calculator')}
                      >
                        <div className="text-sm font-medium">Penalty Calculator</div>
                        <p className="text-xs text-muted-foreground">Calculate penalties</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/vat-calculator')}
                      >
                        <div className="text-sm font-medium">VAT Calculator</div>
                        <p className="text-xs text-muted-foreground">Calculate VAT amounts</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/trading-allowance')}
                      >
                        <div className="text-sm font-medium">Trading Allowance</div>
                        <p className="text-xs text-muted-foreground">Check allowance eligibility</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm bg-white/90 backdrop-blur-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-3 w-[300px] bg-white dark:bg-gray-800 z-[9999] border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm">
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/common-tax-issues')}
                      >
                        <div className="text-sm font-medium">Common Issues</div>
                        <p className="text-xs text-muted-foreground">Tax problem solutions</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/hmrc-support-guide')}
                      >
                        <div className="text-sm font-medium">HMRC Support</div>
                        <p className="text-xs text-muted-foreground">Get help from HMRC</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/common-mistakes')}
                      >
                        <div className="text-sm font-medium">Common Mistakes</div>
                        <p className="text-xs text-muted-foreground">Avoid filing errors</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm bg-white/90 backdrop-blur-sm hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-2 p-3 w-[300px] bg-white dark:bg-gray-800 z-[9999] border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm">
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/employment-status')}
                      >
                        <div className="text-sm font-medium">Employment Status</div>
                        <p className="text-xs text-muted-foreground">Check your status</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/registration-tracker')}
                      >
                        <div className="text-sm font-medium">Registration Tracker</div>
                        <p className="text-xs text-muted-foreground">Track registrations</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/')}
                      >
                        <div className="text-sm font-medium">Calendar Dashboard</div>
                        <p className="text-xs text-muted-foreground">View deadlines</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="hidden md:flex items-center gap-2 text-sm"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Button>

          {showSearch && (
            <Button 
              variant="ghost"
              size="sm" 
              onClick={onOpenSearch}
              className="hidden md:flex items-center gap-2 text-sm"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          )}
          
          {showFilters && (
            <Button 
              variant="ghost"
              size="sm" 
              onClick={onOpenFilters}
              className="hidden md:flex items-center gap-2 text-sm"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          )}

          <NotificationCenter deadlines={deadlines} />
          <EnhancedMobileNavigation 
            urgentCount={urgentCount}
            onQuickAction={handleQuickAction}
            onOpenSearch={onOpenSearch || (() => {})}
            onOpenFilters={onOpenFilters || (() => {})}
          />
          <ThemeToggle />
        </div>
      </div>

      {/* Page Title Section - More Compact */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SharedHeader;
