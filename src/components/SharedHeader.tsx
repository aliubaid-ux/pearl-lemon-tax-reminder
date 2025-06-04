
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
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
  const deadlines = getTaxDeadlines('self-employed'); // Default for notification count

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
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tax Calculators</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/penalty-calculator')}
                      >
                        <div className="text-sm font-medium leading-none">Penalty Calculator</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Calculate late filing and payment penalties
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/vat-calculator')}
                      >
                        <div className="text-sm font-medium leading-none">VAT Calculator</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Calculate VAT amounts and check thresholds
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/trading-allowance')}
                      >
                        <div className="text-sm font-medium leading-none">Trading Allowance</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Check if you qualify for trading allowance
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tax Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/common-tax-issues')}
                      >
                        <div className="text-sm font-medium leading-none">Common Tax Issues</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Solutions for frequent tax problems
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/hmrc-support-guide')}
                      >
                        <div className="text-sm font-medium leading-none">HMRC Support Guide</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          How to get help from HMRC
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/common-mistakes')}
                      >
                        <div className="text-sm font-medium leading-none">Common Mistakes</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Avoid these common tax filing errors
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/employment-status')}
                      >
                        <div className="text-sm font-medium leading-none">Employment Status</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Check your employment status
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/registration-tracker')}
                      >
                        <div className="text-sm font-medium leading-none">Registration Tracker</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Track your tax registrations
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/payments-on-account')}
                      >
                        <div className="text-sm font-medium leading-none">Payments on Account</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Understand advance tax payments
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => navigate('/')}
                      >
                        <div className="text-sm font-medium leading-none">Calendar Dashboard</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          View all tax deadlines
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {showSearch && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onOpenSearch}
              className="hidden md:flex"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
              <Badge variant="secondary" className="ml-2 text-xs">⌘K</Badge>
            </Button>
          )}
          
          {showFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onOpenFilters}
              className="hidden md:flex"
            >
              <Filter className="h-4 w-4 mr-2" />
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
    </div>
  );
};

export default SharedHeader;
