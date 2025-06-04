
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Calendar, CheckCircle, Sparkles } from 'lucide-react';
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
  gradient: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
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
        gradient: 'from-red-500 to-red-600',
        description: 'Critical deadlines that require immediate action',
        priority: 'critical' as const
      },
      {
        title: 'This Week',
        deadlines: thisWeek.sort(sortByDate),
        icon: Clock,
        gradient: 'from-amber-500 to-orange-500',
        description: 'Urgent deadlines approaching in the next 7 days',
        priority: 'high' as const
      },
      {
        title: 'This Month',
        deadlines: thisMonth.sort(sortByDate),
        icon: Calendar,
        gradient: 'from-blue-500 to-indigo-500',
        description: 'Important deadlines to prepare for this month',
        priority: 'medium' as const
      },
      {
        title: 'Future',
        deadlines: later.sort(sortByDate),
        icon: CheckCircle,
        gradient: 'from-green-500 to-emerald-500',
        description: 'Plan ahead for these upcoming deadlines',
        priority: 'low' as const
      }
    ].filter(group => group.deadlines.length > 0);
  };

  const groups = categorizeDeadlines();

  if (groups.length === 0) {
    return (
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-30"></div>
            <div className="relative p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full inline-block">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All caught up!</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
            No deadlines found for your current profile and filters. You're ahead of the game!
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-green-500" />
            <span className="text-green-600 dark:text-green-400 font-semibold">Great job staying organized</span>
            <Sparkles className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPriorityStyles = (priority: DeadlineGroup['priority']) => {
    switch (priority) {
      case 'critical':
        return {
          border: 'border-l-red-500',
          background: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
          badge: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
          icon: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        };
      case 'high':
        return {
          border: 'border-l-amber-500',
          background: 'bg-gradient-to-r from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20',
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
          icon: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
        };
      case 'medium':
        return {
          border: 'border-l-blue-500',
          background: 'bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20',
          badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
          icon: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        };
      case 'low':
        return {
          border: 'border-l-green-500',
          background: 'bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20',
          badge: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
          icon: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
        };
    }
  };

  return (
    <div className="space-y-10">
      {groups.map((group, index) => {
        const Icon = group.icon;
        const styles = getPriorityStyles(group.priority);
        
        return (
          <Card 
            key={group.title} 
            className={cn(
              "border-l-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-300",
              styles.border
            )}
          >
            <CardHeader className={cn("pb-6", styles.background)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("p-4 rounded-2xl shadow-lg", styles.icon)}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white font-bold">
                      {group.title}
                    </CardTitle>
                    <p className="text-gray-700 dark:text-gray-200 mt-2 font-medium">
                      {group.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {group.priority === 'critical' && (
                    <div className="animate-pulse">
                      <Badge variant="destructive" className="text-sm font-bold px-4 py-2">
                        URGENT
                      </Badge>
                    </div>
                  )}
                  <Badge 
                    variant="secondary" 
                    className={cn("text-base font-bold px-4 py-2", styles.badge)}
                  >
                    {group.deadlines.length} deadline{group.deadlines.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 p-8">
              <div className="space-y-6">
                {group.deadlines.map((deadline) => (
                  <DeadlineCard key={deadline.id} deadline={deadline} />
                ))}
              </div>
              {group.deadlines.length > 3 && (
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Showing all {group.deadlines.length} deadlines in this category
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SmartDeadlineGroups;
