
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, Calendar, Bell, Calculator, FileText, 
  ExternalLink, Search, Filter, Settings, HelpCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedQuickActionsProps {
  onSearch: () => void;
  onFilter: () => void;
  onExportCalendar: () => void;
  onShowShortcuts: () => void;
}

const EnhancedQuickActions: React.FC<EnhancedQuickActionsProps> = ({
  onSearch,
  onFilter,
  onExportCalendar,
  onShowShortcuts
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickActions = [
    {
      id: 'search',
      title: 'Search Deadlines',
      description: 'Find specific tax deadlines',
      icon: Search,
      action: onSearch,
      shortcut: '⌘K',
      color: 'blue'
    },
    {
      id: 'filter',
      title: 'Filter Calendar',
      description: 'Customize your view',
      icon: Filter,
      action: onFilter,
      shortcut: '⌘F',
      color: 'purple'
    },
    {
      id: 'export',
      title: 'Export Calendar',
      description: 'Download .ics file',
      icon: Download,
      action: onExportCalendar,
      shortcut: '⌘E',
      color: 'green'
    },
    {
      id: 'penalty-calc',
      title: 'Penalty Calculator',
      description: 'Calculate late penalties',
      icon: Calculator,
      action: () => navigate('/penalty-calculator'),
      color: 'red'
    },
    {
      id: 'vat-calc',
      title: 'VAT Calculator',
      description: 'Calculate VAT amounts',
      icon: Calculator,
      action: () => navigate('/vat-calculator'),
      color: 'amber'
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts',
      description: 'View all shortcuts',
      icon: HelpCircle,
      action: onShowShortcuts,
      shortcut: '?',
      color: 'gray'
    }
  ];

  const externalActions = [
    {
      title: 'HMRC Portal',
      description: 'Official government portal',
      icon: ExternalLink,
      url: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
      color: 'green'
    },
    {
      title: 'HMRC Services',
      description: 'Online tax services',
      icon: ExternalLink,
      url: 'https://www.gov.uk/government/organisations/hm-revenue-customs/services-information',
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'hover:bg-blue-50 border-blue-200',
      purple: 'hover:bg-purple-50 border-purple-200',
      green: 'hover:bg-green-50 border-green-200',
      red: 'hover:bg-red-50 border-red-200',
      amber: 'hover:bg-amber-50 border-amber-200',
      gray: 'hover:bg-gray-50 border-gray-200'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className={`h-auto p-4 justify-start text-left ${getColorClasses(action.color)}`}
              onClick={action.action}
            >
              <div className="flex items-start gap-3 w-full">
                <action.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{action.title}</p>
                    {action.shortcut && (
                      <Badge variant="secondary" className="text-xs ml-2">
                        {action.shortcut}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">External Resources</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {externalActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-3 justify-start text-left ${getColorClasses(action.color)}`}
                onClick={() => window.open(action.url, '_blank')}
              >
                <div className="flex items-center gap-2 w-full">
                  <action.icon className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 Pro tip: Use keyboard shortcuts to access these actions quickly!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedQuickActions;
