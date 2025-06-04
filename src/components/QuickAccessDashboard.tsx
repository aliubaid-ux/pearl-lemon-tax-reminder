
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, FileText, Calendar, AlertTriangle, 
  Download, ExternalLink, TrendingUp, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickAccessDashboard: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Penalty Calculator',
      description: 'Calculate late filing penalties',
      icon: Calculator,
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600',
      action: () => navigate('/penalty-calculator')
    },
    {
      title: 'VAT Calculator',
      description: 'Calculate VAT amounts & thresholds',
      icon: TrendingUp,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      action: () => navigate('/vat-calculator')
    },
    {
      title: 'Common Issues',
      description: 'Solutions to frequent problems',
      icon: FileText,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      action: () => navigate('/common-tax-issues')
    },
    {
      title: 'HMRC Support',
      description: 'Get help from HMRC directly',
      icon: ExternalLink,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      action: () => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs', '_blank')
    }
  ];

  const upcomingDeadlines = [
    { date: '31 Jan 2025', title: 'Self Assessment Final Deadline', urgent: true },
    { date: '28 Feb 2025', title: 'Corporation Tax Payment', urgent: false },
    { date: '07 Mar 2025', title: 'VAT Return Q4', urgent: false }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Quick Tools & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-6 ${action.color} border-2 transition-all duration-200`}
                onClick={action.action}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Next 3 Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {deadline.urgent ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Calendar className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{deadline.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{deadline.date}</p>
                  </div>
                </div>
                {deadline.urgent && (
                  <Badge variant="destructive">Urgent</Badge>
                )}
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/')}
          >
            View Full Calendar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickAccessDashboard;
