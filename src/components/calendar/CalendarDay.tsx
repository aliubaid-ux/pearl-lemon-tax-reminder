
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaxDeadline } from '@/types/tax';
import { AlertTriangle, Clock, Calendar } from 'lucide-react';

interface CalendarDayProps {
  date: Date;
  deadlines: TaxDeadline[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onDeadlineClick?: (deadline: TaxDeadline) => void;
  onDateClick?: (date: Date) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ 
  date, 
  deadlines, 
  isToday, 
  isCurrentMonth,
  onDeadlineClick,
  onDateClick
}) => {
  const dayDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate.toDateString() === date.toDateString();
  });

  const today = new Date();
  const getDaysUntil = (deadlineDate: string) => {
    const deadline = new Date(deadlineDate);
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUrgencyColor = (deadline: TaxDeadline) => {
    const daysUntil = getDaysUntil(deadline.date);
    if (daysUntil <= 0) return 'bg-red-600 text-white hover:bg-red-700';
    if (daysUntil <= 7) return 'bg-red-500 text-white hover:bg-red-600';
    if (daysUntil <= 30) return 'bg-amber-500 text-white hover:bg-amber-600';
    return 'bg-blue-500 text-white hover:bg-blue-600';
  };

  const hasUrgentDeadlines = dayDeadlines.some(d => getDaysUntil(d.date) <= 7);
  const hasDeadlines = dayDeadlines.length > 0;

  return (
    <div 
      className={`
        relative min-h-[100px] p-2 border transition-all duration-200 cursor-pointer group
        ${isCurrentMonth 
          ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750' 
          : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-850'
        }
        ${isToday ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
        ${hasUrgentDeadlines ? 'border-l-4 border-l-red-500' : ''}
        ${hasDeadlines && !hasUrgentDeadlines ? 'border-l-4 border-l-amber-500' : ''}
        hover:shadow-md hover:scale-105
      `}
      onClick={() => onDateClick?.(date)}
    >
      {/* Date number */}
      <div className={`
        text-sm font-medium mb-2 flex items-center justify-between
        ${isToday 
          ? 'text-blue-600 dark:text-blue-400 font-bold' 
          : isCurrentMonth 
            ? 'text-gray-900 dark:text-gray-100' 
            : 'text-gray-400 dark:text-gray-600'
        }
      `}>
        <span>{date.getDate()}</span>
        {isToday && <Calendar className="h-3 w-3" />}
        {hasUrgentDeadlines && <AlertTriangle className="h-3 w-3 text-red-500" />}
      </div>

      {/* Deadlines */}
      <div className="space-y-1">
        {dayDeadlines.slice(0, 3).map((deadline) => {
          const daysUntil = getDaysUntil(deadline.date);
          return (
            <Button
              key={deadline.id}
              variant="ghost"
              size="sm"
              className={`
                w-full p-1 h-auto text-xs text-left justify-start
                ${getUrgencyColor(deadline)}
                transform transition-all duration-200 hover:scale-105
              `}
              onClick={(e) => {
                e.stopPropagation();
                onDeadlineClick?.(deadline);
              }}
            >
              <div className="flex items-center gap-1 w-full">
                {daysUntil <= 7 && <Clock className="h-2 w-2 flex-shrink-0" />}
                <span className="truncate flex-1">{deadline.title}</span>
                {daysUntil === 0 && <span className="text-xs font-bold">TODAY</span>}
                {daysUntil === 1 && <span className="text-xs">1d</span>}
                {daysUntil > 1 && daysUntil <= 7 && <span className="text-xs">{daysUntil}d</span>}
              </div>
            </Button>
          );
        })}
        
        {/* Show overflow indicator */}
        {dayDeadlines.length > 3 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
            +{dayDeadlines.length - 3} more
          </div>
        )}
      </div>

      {/* Hover overlay for empty days */}
      {dayDeadlines.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-gray-400 dark:text-gray-600">Click to add reminder</span>
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
