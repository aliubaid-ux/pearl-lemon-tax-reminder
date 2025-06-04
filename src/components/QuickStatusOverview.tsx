
import React from 'react';
import { AlertTriangle, Calendar, CheckCircle, Calculator, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuickStatusOverviewProps {
  upcomingDeadlines: any[];
  onDeadlineClick: (deadline: any) => void;
  onShowAdvanced: () => void;
  onQuickAction: (action: string) => void;
}

const QuickStatusOverview: React.FC<QuickStatusOverviewProps> = ({
  upcomingDeadlines,
  onDeadlineClick,
  onShowAdvanced,
  onQuickAction
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Your Next Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 2).map((deadline) => (
                <div 
                  key={deadline.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" 
                  onClick={() => onDeadlineClick(deadline)}
                >
                  <div>
                    <p className="font-medium text-gray-900">{deadline.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(deadline.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                  </div>
                  <Badge className={deadline.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}>
                    {deadline.priority}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-3" onClick={() => onShowAdvanced()}>
                View All Deadlines
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">You're all caught up!</p>
              <p className="text-sm text-gray-500">No urgent deadlines in the next 3 months</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <Calendar className="h-6 w-6 text-blue-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => onQuickAction('calendar')}>
              <Calendar className="h-4 w-4 mr-2" />
              View Tax Calendar
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => onQuickAction('calculator')}>
              <Calculator className="h-4 w-4 mr-2" />
              Penalty Calculator
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => onShowAdvanced()}>
              <Mail className="h-4 w-4 mr-2" />
              Email Reminders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStatusOverview;
