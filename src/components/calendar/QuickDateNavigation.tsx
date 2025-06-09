
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';

interface QuickDateNavigationProps {
  deadlines: TaxDeadline[];
  onDateJump: (date: Date) => void;
  currentDate: Date;
}

const QuickDateNavigation: React.FC<QuickDateNavigationProps> = ({
  deadlines,
  onDateJump,
  currentDate
}) => {
  const today = new Date();
  
  // Get next urgent deadline
  const urgentDeadlines = deadlines
    .filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 7;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get next month with deadlines
  const nextMonthWithDeadlines = deadlines
    .filter(deadline => new Date(deadline.date) > today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  // Get next quarter dates
  const getNextQuarter = () => {
    const now = new Date();
    const quarter = Math.floor(now.getMonth() / 3);
    const nextQuarter = (quarter + 1) % 4;
    const year = nextQuarter === 0 ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(year, nextQuarter * 3, 1);
  };

  const quickJumpOptions = [
    {
      label: 'Today',
      date: today,
      icon: Calendar,
      variant: 'default' as const,
      count: deadlines.filter(d => new Date(d.date).toDateString() === today.toDateString()).length
    },
    {
      label: 'Next Urgent',
      date: urgentDeadlines[0] ? new Date(urgentDeadlines[0].date) : null,
      icon: AlertTriangle,
      variant: 'destructive' as const,
      count: urgentDeadlines.length
    },
    {
      label: 'Next Deadline',
      date: nextMonthWithDeadlines ? new Date(nextMonthWithDeadlines.date) : null,
      icon: Clock,
      variant: 'secondary' as const,
      count: 1
    },
    {
      label: 'Next Quarter',
      date: getNextQuarter(),
      icon: TrendingUp,
      variant: 'outline' as const,
      count: deadlines.filter(d => {
        const date = new Date(d.date);
        const nextQ = getNextQuarter();
        return date.getMonth() >= nextQ.getMonth() && date.getMonth() < nextQ.getMonth() + 3;
      }).length
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Navigation</h3>
      <div className="grid grid-cols-2 gap-2">
        {quickJumpOptions.map((option) => {
          if (!option.date) return null;
          
          const Icon = option.icon;
          const isCurrentDate = option.date.toDateString() === currentDate.toDateString();
          
          return (
            <Button
              key={option.label}
              variant={isCurrentDate ? 'default' : option.variant}
              size="sm"
              onClick={() => onDateJump(option.date!)}
              className="h-auto p-3 flex flex-col items-center gap-1"
              disabled={isCurrentDate}
            >
              <div className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                <span className="text-xs font-medium">{option.label}</span>
              </div>
              {option.count > 0 && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {option.count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickDateNavigation;
