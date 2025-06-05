
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Calculator, FileText, Settings, Bell } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import NotificationCenter from '@/components/NotificationCenter';
import NavigationDropdown from '@/components/navigation/NavigationDropdown';
import { getTaxDeadlines } from '@/utils/taxDeadlines';

const StreamlinedNavigation: React.FC = () => {
  const navigate = useNavigate();
  const deadlines = getTaxDeadlines('self-employed');

  const urgentCount = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    return deadlineDate >= today && deadlineDate <= oneWeekFromNow && deadline.priority === 'high';
  }).length;

  const toolsItems = [
    { title: 'Penalty Calculator', path: '/penalty-calculator' },
    { title: 'VAT Calculator', path: '/vat-calculator' },
    { title: 'Trading Allowance', path: '/trading-allowance' },
    { title: 'Employment Status', path: '/employment-status' }
  ];

  const helpItems = [
    { title: 'Common Issues', path: '/common-tax-issues' },
    { title: 'HMRC Support', path: '/hmrc-support-guide' },
    { title: 'Common Mistakes', path: '/common-mistakes' },
    { title: 'Registration Tracker', path: '/registration-tracker' },
    { title: 'Payments on Account', path: '/payments-on-account' }
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">UK Tax Doctor</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Smart deadline management</p>
            </div>
          </button>
        </div>

        {/* Main Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <NavigationDropdown 
              title="Tools" 
              icon={Calculator} 
              items={toolsItems} 
            />
            
            <NavigationDropdown 
              title="Help" 
              icon={FileText} 
              items={helpItems} 
            />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <NotificationCenter deadlines={deadlines} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/settings')}
            className="hidden md:flex"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4" />
              {urgentCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {urgentCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StreamlinedNavigation;
