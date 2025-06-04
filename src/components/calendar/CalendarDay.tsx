
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TaxDeadline } from '@/types/tax';

interface CalendarDayProps {
  date: Date;
  deadlines: TaxDeadline[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ date, deadlines, isToday, isCurrentMonth }) => {
  const dayDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate.toDateString() === date.toDateString();
  });

  return (
    <div className={`p-2 min-h-[80px] ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} ${isToday ? 'ring-2 ring-blue-500' : ''}`}>
      <div className={`text-sm ${isToday ? 'font-bold text-blue-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
        {date.getDate()}
      </div>
      <div className="space-y-1 mt-1">
        {dayDeadlines.map((deadline) => (
          <Badge
            key={deadline.id}
            variant={deadline.type === 'payment' ? 'destructive' : 'default'}
            className="text-xs block truncate"
          >
            {deadline.title}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
