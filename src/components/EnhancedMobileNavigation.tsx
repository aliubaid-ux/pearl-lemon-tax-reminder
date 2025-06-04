import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Menu, Calendar, Settings, FileText, Calculator, Users, Bell, Download, 
  Share, Search, Filter, Home, ChevronRight, Star, Smartphone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const quickActions = [
    { id: 'home', label: 'Dashboard', icon: Home, color: 'blue', path: '/' },
    { id: 'search', label: 'Search Everything', icon: Search, color: 'green', action: onOpenSearch },
    { id: 'filter', label: 'Filter Deadlines', icon: Filter, color: 'purple', action: onOpenFilters },
    { id: 'calendar', label: 'View Calendar', icon: Calendar, color: 'blue', path: '/' },
    { id: 'deadlines', label: 'Urgent Deadlines', icon: FileText, color: 'red', badge: urgentCount, path: '/' },
  ];

  const tools = [
    { id: 'penalty', label: 'Penalty Calculator', icon: Calculator, path: '/penalty-calculator' },
    { id: 'vat', label: 'VAT Calculator', icon: Calculator, path: '/vat-calculator' },
    { id: 'employment', label: 'Employment Status', icon: Users, path: '/employment-status' },
    { id: 'trading', label: 'Trading Allowance', icon: Calculator, path: '/trading-allowance' },
  ];

  const resources = [
    { id: 'issues', label: 'Common Issues', icon: FileText, path: '/common-tax-issues' },
    { id: 'hmrc', label: 'HMRC Guidance', icon: FileText, path: '/hmrc-guidance' },
    { id: 'docs', label: 'Documentation', icon: FileText, path: '/documentation-checklist' },
    { id: 'templates', label: 'Templates', icon: FileText, path: '/late-submission-templates' },
  ];

  const handleAction = (actionId: string, path?: string, action?: () => void) => {
    if (action) {
      action();
    } else if (path) {
      navigate(path);
    } else {
      onQuickAction(actionId);
    }
    setIsOpen(false);
  };

  // Show mobile navigation only on mobile devices
  if (!isMobile) return null;

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <Menu className="h-4 w-4" />
            {urgentCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {urgentCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Tax Calendar Pro
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Quick Actions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Quick Actions</h3>
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 hover:scale-105 transition-all"
                  onClick={() => handleAction(action.id, action.path, action.action)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                      <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{action.label}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {action.badge && action.badge > 0 && (
                        <Badge variant="destructive">
                          {action.badge}
                        </Badge>
                      )}
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Tools Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Calculators & Tools</h3>
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleAction(tool.id, tool.path)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <tool.icon className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{tool.label}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Button>
              ))}
            </div>

            {/* Resources Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Resources & Guides</h3>
              {resources.map((resource) => (
                <Button
                  key={resource.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleAction(resource.id, resource.path)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <resource.icon className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{resource.label}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Button>
              ))}
            </div>

            {/* Settings */}
            <div className="space-y-3 pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-3"
                onClick={() => handleAction('settings', '/settings')}
              >
                <div className="flex items-center gap-3 w-full">
                  <Settings className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Settings & Preferences</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                </div>
              </Button>
            </div>

            {/* Mobile Tips */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Pro Tips
              </h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-medium">•</span>
                  <span>Swipe left/right to navigate calendar months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">•</span>
                  <span>Long press deadline cards for quick actions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">•</span>
                  <span>Use landscape mode for better calendar viewing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">•</span>
                  <span>Enable notifications for deadline reminders</span>
                </li>
              </ul>
            </div>

            {/* App Info */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t">
              <p>UK Tax Calendar Professional</p>
              <p>© 2025 Pearl Lemon Accountants</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EnhancedMobileNavigation;
