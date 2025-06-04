
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
    <Card className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700 shadow-xl">
      <CardHeader className="pb-6 pt-8 px-8">
        <CardTitle className="flex items-center gap-4 text-blue-900 dark:text-blue-100 text-2xl">
          <Calendar className="h-7 w-7" />
          Your {userType.replace('-', ' ').toUpperCase()} Tax Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pb-8 px-8">
        {/* Upcoming Deadlines */}
        {upcomingDeadlines.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-200 mb-6 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              Next 30 Days - Act Now!
            </h3>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => {
                const daysUntil = getDaysUntil(deadline.date);
                const isUrgent = daysUntil <= 7;
                
                return (
                  <div 
                    key={deadline.id} 
                    className={`p-6 rounded-xl border-l-4 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-102 ${
                      isUrgent 
                        ? 'bg-red-50 dark:bg-red-900/20 border-l-red-500' 
                        : 'bg-amber-50 dark:bg-amber-900/20 border-l-amber-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-lg mb-2">{deadline.title}</h4>
                        <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
                          {formatDate(deadline.date)}
                        </p>
                        {deadline.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                            {deadline.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-col sm:flex-row">
                        <Badge 
                          variant={isUrgent ? "destructive" : "secondary"}
                          className="text-sm px-3 py-1"
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
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-6 flex items-center gap-3">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Future Deadlines ({futureDeadlines.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {futureDeadlines.slice(0, 6).map((deadline) => (
                <div 
                  key={deadline.id} 
                  className="p-5 bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-102"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-3">
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {deadline.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(deadline.date)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {deadline.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            {futureDeadlines.length > 6 && (
              <p className="text-base text-blue-700 dark:text-blue-300 mt-4 font-medium">
                +{futureDeadlines.length - 6} more deadlines...
              </p>
            )}
          </div>
        )}

        {/* No Deadlines */}
        {deadlines.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">No tax deadlines found for this profile type.</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-6 border-t border-blue-200 dark:border-blue-700">
          <div className="flex gap-4 flex-wrap">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-6 py-3 text-base font-medium hover:shadow-md transition-all duration-300"
              onClick={() => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank')}
            >
              <ExternalLink className="h-5 w-5 mr-3" />
              HMRC Portal
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-6 py-3 text-base font-medium hover:shadow-md transition-all duration-300"
              onClick={() => document.getElementById('calendar-integration')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Export to Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualDeadlineDisplay;
