
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Calendar, Settings, FileText, Calculator, Users, Bell, Download, Share } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MobileNavigationProps {
  urgentCount: number;
  onQuickAction: (action: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ urgentCount, onQuickAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    { id: 'calendar', label: 'View Calendar', icon: Calendar, color: 'blue' },
    { id: 'deadlines', label: 'Deadlines', icon: FileText, color: 'green', badge: urgentCount },
    { id: 'calculator', label: 'Penalty Calculator', icon: Calculator, color: 'purple' },
    { id: 'tools', label: 'Tax Tools', icon: Settings, color: 'orange' },
    { id: 'reminders', label: 'Email Alerts', icon: Bell, color: 'red' },
    { id: 'export', label: 'Export Data', icon: Download, color: 'gray' },
    { id: 'share', label: 'Share Calendar', icon: Share, color: 'pink' }
  ];

  const handleAction = (actionId: string) => {
    onQuickAction(actionId);
    setIsOpen(false);
  };

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
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Quick Actions
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all"
                onClick={() => handleAction(action.id)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                    <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{action.label}</div>
                  </div>
                  {action.badge && action.badge > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {action.badge}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Mobile Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Swipe left/right to navigate months</li>
              <li>• Long press for deadline details</li>
              <li>• Use landscape mode for better calendar view</li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
