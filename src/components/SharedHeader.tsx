
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Calculator, FileText, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import NotificationCenter from '@/components/NotificationCenter';
import EnhancedMobileNavigation from '@/components/EnhancedMobileNavigation';
import { getTaxDeadlines } from '@/utils/taxDeadlines';

interface SharedHeaderProps {
  title: string;
  subtitle: string;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  title,
  subtitle
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
      case 'calendar-integration':
        navigate('/settings');
        break;
      default:
        console.log('Quick action:', action);
    }
  };

  return (
    <div className="container mx-auto px-6 py-4 max-w-7xl">
      {/* Header Row: Logo/Branding on left, Navigation on right */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo and Slogan - Left Side */}
        <div className="flex flex-col cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            UK Tax Doctor
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Smart tax deadline management
          </p>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  <Calculator className="h-4 w-4 mr-2" />
                  Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Tax Tools</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/penalty-calculator')}>
                  Penalty Calculator
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vat-calculator')}>
                  VAT Calculator
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/trading-allowance')}>
                  Trading Allowance
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/employment-status')}>
                  Employment Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Resources
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 z-50">
                <DropdownMenuLabel>Tax Resources</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/common-tax-issues')}>
                  Common Tax Issues
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/hmrc-support-guide')}>
                  HMRC Support Guide
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/common-mistakes')}>
                  Common Mistakes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/registration-tracker')}>
                  Registration Tracker
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/payments-on-account')}>
                  Payments on Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/settings')}
              className="text-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>

          <NotificationCenter deadlines={deadlines} />
          <EnhancedMobileNavigation 
            urgentCount={urgentCount}
            onQuickAction={handleQuickAction}
            onOpenSearch={() => {}}
            onOpenFilters={() => {}}
          />
          <ThemeToggle />
        </div>
      </div>

      {/* Page Title Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
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
