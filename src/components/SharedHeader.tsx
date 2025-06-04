
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
    <div className="container mx-auto px-6 py-6 max-w-7xl">
      {/* Top Row: Logo/Branding on left, Navigation on right */}
      <div className="flex items-start justify-between mb-8">
        {/* Logo and Slogan - Top Left */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            UK Tax Doctor
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Smart tax deadline management
          </p>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-3">
          {/* Simplified Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-sm"
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/penalty-calculator')}
              className="text-sm"
            >
              Calculators
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/common-tax-issues')}
              className="text-sm"
            >
              Resources
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings')}
              className="text-sm"
            >
              Settings
            </Button>
          </div>

          {/* Action Buttons */}
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

      {/* Page Title Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
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
