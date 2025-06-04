
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Clock, ExternalLink } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';

interface VisualDeadlineDisplayProps {
  deadlines: TaxDeadline[];
  userType: string;
}

const VisualDeadlineDisplay: React.FC<VisualDeadlineDisplayProps> = ({
  deadlines,
  userType
}) => {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);
  
  // Sort deadlines by date and categorize
  const sortedDeadlines = deadlines
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const upcomingDeadlines = sortedDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= nextMonth;
  });

  const futureDeadlines = sortedDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate > nextMonth;
  });

  const getDaysUntil = (date: string) => {
    const deadlineDate = new Date(date);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-blue-900 dark:text-blue-100">
          <Calendar className="h-5 w-5" />
          Your {userType.replace('-', ' ').toUpperCase()} Tax Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        {/* Upcoming Deadlines */}
        {upcomingDeadlines.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              Next 30 Days - Act Now!
            </h3>
            <div className="space-y-2">
              {upcomingDeadlines.map((deadline) => {
                const daysUntil = getDaysUntil(deadline.date);
                const isUrgent = daysUntil <= 7;
                
                return (
                  <div 
                    key={deadline.id} 
                    className={`p-3 rounded-lg border-l-4 ${
                      isUrgent 
                        ? 'bg-red-50 dark:bg-red-900/20 border-l-red-500' 
                        : 'bg-amber-50 dark:bg-amber-900/20 border-l-amber-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{deadline.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {formatDate(deadline.date)}
                        </p>
                        {deadline.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {deadline.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={isUrgent ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {daysUntil === 0 ? 'Today!' : 
                           daysUntil === 1 ? 'Tomorrow' : 
                           `${daysUntil} days`}
                        </Badge>
                        <Badge 
                          className={deadline.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'}
                        >
                          {deadline.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Future Deadlines Preview */}
        {futureDeadlines.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Future Deadlines ({futureDeadlines.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {futureDeadlines.slice(0, 6).map((deadline) => (
                <div 
                  key={deadline.id} 
                  className="p-2 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {deadline.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatDate(deadline.date)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {deadline.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            {futureDeadlines.length > 6 && (
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                +{futureDeadlines.length - 6} more deadlines...
              </p>
            )}
          </div>
        )}

        {/* No Deadlines */}
        {deadlines.length === 0 && (
          <div className="text-center py-6">
            <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No tax deadlines found for this profile type.</p>
          </div>
        )}

        {/* Quick Actions - Fixed positioning and visibility */}
        <div className="pt-4 border-t border-blue-200 dark:border-blue-700">
          <div className="flex gap-3 flex-wrap">
            <Button 
              size="sm" 
              variant="outline"
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              onClick={() => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              HMRC Portal
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              onClick={() => document.getElementById('calendar-integration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Export to Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualDeadlineDisplay;
