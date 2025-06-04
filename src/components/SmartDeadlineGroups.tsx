
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Calendar, CheckCircle } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import DeadlineCard from './DeadlineCard';
import { cn } from '@/lib/utils';

interface SmartDeadlineGroupsProps {
  deadlines: TaxDeadline[];
}

interface DeadlineGroup {
  title: string;
  deadlines: TaxDeadline[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

const SmartDeadlineGroups: React.FC<SmartDeadlineGroupsProps> = ({ deadlines }) => {
  const today = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 7);
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const categorizeDeadlines = (): DeadlineGroup[] => {
    const overdue: TaxDeadline[] = [];
    const thisWeek: TaxDeadline[] = [];
    const thisMonth: TaxDeadline[] = [];
    const later: TaxDeadline[] = [];

    deadlines.forEach(deadline => {
      const deadlineDate = new Date(deadline.date);
      
      if (deadlineDate < today) {
        overdue.push(deadline);
      } else if (deadlineDate <= oneWeekFromNow) {
        thisWeek.push(deadline);
      } else if (deadlineDate <= oneMonthFromNow) {
        thisMonth.push(deadline);
      } else {
        later.push(deadline);
      }
    });

    // Sort each group by date
    const sortByDate = (a: TaxDeadline, b: TaxDeadline) => 
      new Date(a.date).getTime() - new Date(b.date).getTime();

    return [
      {
        title: 'Overdue',
        deadlines: overdue.sort(sortByDate),
        icon: AlertTriangle,
        color: 'border-red-500 bg-red-50 dark:bg-red-950/30',
        description: 'These deadlines have passed and need immediate attention'
      },
      {
        title: 'This Week',
        deadlines: thisWeek.sort(sortByDate),
        icon: Clock,
        color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/30',
        description: 'Urgent deadlines coming up in the next 7 days'
      },
      {
        title: 'This Month',
        deadlines: thisMonth.sort(sortByDate),
        icon: Calendar,
        color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30',
        description: 'Important deadlines to prepare for this month'
      },
      {
        title: 'Future',
        deadlines: later.sort(sortByDate),
        icon: CheckCircle,
        color: 'border-green-500 bg-green-50 dark:bg-green-950/30',
        description: 'Plan ahead for these upcoming deadlines'
      }
    ].filter(group => group.deadlines.length > 0);
  };

  const groups = categorizeDeadlines();

  if (groups.length === 0) {
    return (
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">All caught up!</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No deadlines found for your current profile and filters.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {groups.map((group, index) => {
        const Icon = group.icon;
        
        return (
          <Card 
            key={group.title} 
            className={cn(
              "border-l-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl",
              group.color
            )}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    group.title === 'Overdue' ? 'bg-red-100 dark:bg-red-900/30' :
                    group.title === 'This Week' ? 'bg-amber-100 dark:bg-amber-900/30' :
                    group.title === 'This Month' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-green-100 dark:bg-green-900/30'
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      group.title === 'Overdue' ? 'text-red-600 dark:text-red-400' :
                      group.title === 'This Week' ? 'text-amber-600 dark:text-amber-400' :
                      group.title === 'This Month' ? 'text-blue-600 dark:text-blue-400' :
                      'text-green-600 dark:text-green-400'
                    )} />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {group.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {group.description}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-sm font-semibold",
                    group.title === 'Overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                    group.title === 'This Week' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' :
                    group.title === 'This Month' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                  )}
                >
                  {group.deadlines.length} deadline{group.deadlines.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {group.deadlines.map((deadline) => (
                  <DeadlineCard key={deadline.id} deadline={deadline} />
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SmartDeadlineGroups;
