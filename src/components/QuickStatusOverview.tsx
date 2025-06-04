
import React from 'react';
import { AlertTriangle, Calendar, CheckCircle, Calculator, Mail, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleViewAllDeadlines = () => {
    // Scroll to the deadlines tab and activate it
    setTimeout(() => {
      const deadlinesTab = document.querySelector('[value="deadlines"]') as HTMLElement;
      if (deadlinesTab) {
        deadlinesTab.click();
        deadlinesTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toast({
          title: "Showing All Deadlines",
          description: "Navigated to the complete deadlines view.",
        });
      }
    }, 100);
  };

  const handleQuickActionClick = (action: string) => {
    setTimeout(() => {
      onQuickAction(action);
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up">
      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Your Priority Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 2).map((deadline) => (
                <div 
                  key={deadline.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                  onClick={() => onDeadlineClick(deadline)}
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{deadline.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(deadline.date).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge className={deadline.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}>
                    {deadline.priority}
                  </Badge>
                </div>
              ))}
              <div className="flex gap-2 mt-3">
                <Button variant="outline" className="flex-1" onClick={handleViewAllDeadlines}>
                  <FileText className="h-4 w-4 mr-2" />
                  View All Deadlines
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-300 font-medium">All caught up!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No urgent deadlines in the next 3 months</p>
              <Button variant="outline" size="sm" onClick={() => handleQuickActionClick('deadlines')}>
                View All Deadlines
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <ArrowRight className="h-6 w-6 text-blue-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-green-50 border-green-200 dark:border-green-700 dark:hover:bg-green-900/20" 
              onClick={() => handleQuickActionClick('deadlines')}
            >
              <Calendar className="h-4 w-4 mr-2 text-green-600" />
              View All Tax Deadlines
              <span className="ml-auto text-xs text-gray-500">Complete annual view</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-purple-50 border-purple-200 dark:border-purple-700 dark:hover:bg-purple-900/20" 
              onClick={() => handleQuickActionClick('tools')}
            >
              <Calculator className="h-4 w-4 mr-2 text-purple-600" />
              Use Tax Calculators
              <span className="ml-auto text-xs text-gray-500">Calculate penalties & VAT</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-orange-50 border-orange-200 dark:border-orange-700 dark:hover:bg-orange-900/20" 
              onClick={() => handleQuickActionClick('reminders')}
            >
              <Mail className="h-4 w-4 mr-2 text-orange-600" />
              Set Up Email Alerts
              <span className="ml-auto text-xs text-gray-500">Never miss a deadline</span>
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-xs text-blue-800 dark:text-blue-200 font-medium mb-1">💡 Quick Navigation</p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              These buttons will take you directly to the tools and information you need.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStatusOverview;
