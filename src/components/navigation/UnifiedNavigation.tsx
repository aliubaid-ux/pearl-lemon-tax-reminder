
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Calculator, FileText, Settings, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import NotificationCenter from '@/components/NotificationCenter';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const UnifiedNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const resourcesItems = [
    { title: 'Common Issues', path: '/common-tax-issues' },
    { title: 'HMRC Support', path: '/hmrc-support-guide' },
    { title: 'Common Mistakes', path: '/common-mistakes' },
    { title: 'Registration Tracker', path: '/registration-tracker' },
    { title: 'Payments on Account', path: '/payments-on-account' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavigation('/')}
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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => handleNavigation('/')}>
            <Home className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Calculator className="h-4 w-4 mr-2" />
                Tools
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tax Tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {toolsItems.map((item) => (
                <DropdownMenuItem key={item.path} onClick={() => handleNavigation(item.path)}>
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Resources
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tax Resources</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {resourcesItems.map((item) => (
                <DropdownMenuItem key={item.path} onClick={() => handleNavigation(item.path)}>
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="sm" onClick={() => handleNavigation('/settings')}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <NotificationCenter deadlines={deadlines} />
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  {urgentCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {urgentCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/')}>
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                
                <DropdownMenuLabel className="mt-4">Tax Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {toolsItems.map((item) => (
                  <DropdownMenuItem key={item.path} onClick={() => handleNavigation(item.path)}>
                    <Calculator className="h-4 w-4 mr-2" />
                    {item.title}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuLabel className="mt-4">Resources</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {resourcesItems.map((item) => (
                  <DropdownMenuItem key={item.path} onClick={() => handleNavigation(item.path)}>
                    <FileText className="h-4 w-4 mr-2" />
                    {item.title}
                  </DropdownMenuItem>
                ))}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UnifiedNavigation;
