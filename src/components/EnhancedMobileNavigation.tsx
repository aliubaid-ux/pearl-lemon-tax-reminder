
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Bell, Search, Filter, Home, Calculator, FileText, 
  AlertTriangle, Calendar, Download, Settings, HelpCircle,
  ChevronDown, ChevronRight, ExternalLink, Smartphone, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface EnhancedMobileNavigationProps {
  urgentCount: number;
  onQuickAction: (action: string) => void;
  onOpenSearch: () => void;
  onOpenFilters: () => void;
}

const EnhancedMobileNavigation: React.FC<EnhancedMobileNavigationProps> = ({
  urgentCount,
  onQuickAction,
  onOpenSearch,
  onOpenFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleQuickAction = (action: string) => {
    onQuickAction(action);
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.mobile-nav-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const quickActions = [
    {
      id: 'search',
      title: 'Search Deadlines',
      icon: Search,
      action: onOpenSearch,
      shortcut: '⌘K'
    },
    {
      id: 'filter',
      title: 'Filter Calendar',
      icon: Filter,
      action: onOpenFilters
    },
    {
      id: 'calendar-integration',
      title: 'Calendar Integration',
      icon: Calendar,
      action: () => handleQuickAction('calendar-integration'),
      highlight: true
    }
  ];

  const calendarIntegrationOptions = [
    {
      id: 'quick-export',
      title: 'Quick Export (.ics)',
      description: 'Download all deadlines for calendar import',
      icon: Download,
      action: () => {
        // Trigger quick export from parent
        const event = new CustomEvent('quickCalendarExport');
        document.dispatchEvent(event);
        setIsOpen(false);
      }
    },
    {
      id: 'google-calendar',
      title: 'Google Calendar',
      description: 'Open in Google Calendar',
      icon: ExternalLink,
      action: () => {
        window.open('https://calendar.google.com/', '_blank');
        setIsOpen(false);
      }
    },
    {
      id: 'apple-calendar',
      title: 'Apple Calendar',
      description: 'For iPhone, iPad & Mac',
      icon: Smartphone,
      action: () => handleQuickAction('calendar-integration')
    },
    {
      id: 'outlook',
      title: 'Microsoft Outlook',
      description: 'Sync with Office 365',
      icon: Mail,
      action: () => {
        window.open('https://outlook.live.com/calendar/', '_blank');
        setIsOpen(false);
      }
    }
  ];

  const navigationItems = [
    {
      id: 'calculators',
      title: 'Tax Calculators',
      icon: Calculator,
      hasSubmenu: true,
      items: [
        { title: 'Penalty Calculator', path: '/penalty-calculator', description: 'Calculate late filing penalties' },
        { title: 'VAT Calculator', path: '/vat-calculator', description: 'Monitor VAT thresholds' },
        { title: 'Trading Allowance', path: '/trading-allowance', description: 'Optimize tax allowances' },
      ]
    },
    {
      id: 'resources',
      title: 'Tax Resources',
      icon: FileText,
      hasSubmenu: true,
      items: [
        { title: 'Common Tax Issues', path: '/common-tax-issues', description: 'Resolve frequent problems' },
        { title: 'HMRC Support Guide', path: '/hmrc-support-guide', description: 'Official guidance' },
        { title: 'Common Mistakes', path: '/common-mistakes', description: 'Avoid costly errors' },
        { title: 'Late Submission Templates', path: '/late-submission-templates', description: 'Template letters' },
        { title: 'Documentation Checklist', path: '/documentation-checklist', description: 'Required documents' },
        { title: 'HMRC Guidance', path: '/hmrc-guidance', description: 'Official resources' },
      ]
    },
    {
      id: 'tools',
      title: 'Professional Tools',
      icon: Settings,
      hasSubmenu: true,
      items: [
        { title: 'Employment Status', path: '/employment-status', description: 'Check your classification' },
        { title: 'Registration Tracker', path: '/registration-tracker', description: 'Track registrations' },
        { title: 'Payments on Account', path: '/payments-on-account', description: 'Payment planning' },
        { title: 'Settings', path: '/settings', description: 'App preferences' },
      ]
    }
  ];

  return (
    <div className="mobile-nav-container relative lg:hidden">
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        {urgentCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {urgentCount}
          </Badge>
        )}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Content */}
      {isOpen && (
        <Card className="fixed inset-x-4 top-4 bottom-4 z-50 bg-white dark:bg-gray-800 overflow-y-auto">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">Tax Calendar</h2>
                  {urgentCount > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {urgentCount} urgent deadline{urgentCount > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Quick Actions
              </h3>
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.highlight ? "default" : "outline"}
                  className={`w-full justify-start h-auto p-3 ${
                    action.highlight 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                  }`}
                  onClick={action.action}
                >
                  <action.icon className="h-4 w-4 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{action.title}</div>
                    {action.shortcut && (
                      <div className="text-xs opacity-75">{action.shortcut}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            <Separator />

            {/* Calendar Integration Section */}
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
                📅 Calendar Integration
              </h3>
              {calendarIntegrationOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-3 border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                  onClick={option.action}
                >
                  <option.icon className="h-4 w-4 mr-3 text-green-600 dark:text-green-400" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-white">{option.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{option.description}</div>
                  </div>
                </Button>
              ))}
            </div>

            <Separator />

            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start p-3"
                onClick={() => handleNavigate('/')}
              >
                <Home className="h-4 w-4 mr-3" />
                Dashboard
              </Button>

              {navigationItems.map((item) => (
                <div key={item.id}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-3"
                    onClick={() => toggleSection(item.id)}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.title}
                    </div>
                    {item.hasSubmenu && (
                      expandedSections[item.id] ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  
                  {item.hasSubmenu && expandedSections[item.id] && (
                    <div className="ml-4 space-y-1">
                      {item.items?.map((subItem) => (
                        <Button
                          key={subItem.path}
                          variant="ghost"
                          className="w-full justify-start p-2 text-sm h-auto"
                          onClick={() => handleNavigate(subItem.path)}
                        >
                          <div className="text-left">
                            <div className="font-medium">{subItem.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {subItem.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Separator />

            {/* Help & Support */}
            <div className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start p-3"
                onClick={() => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs', '_blank')}
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                Help & Support
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedMobileNavigation;
