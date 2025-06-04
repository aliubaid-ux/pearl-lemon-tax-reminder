
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TaxDeadline } from '@/types/tax';

interface TaxCalendarProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const TaxCalendar: React.FC<TaxCalendarProps> = ({ deadlines, selectedMonth, onMonthChange }) => {
  const getDeadlineForDate = (date: Date) => {
    return deadlines.find(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate.toDateString() === date.toDateString();
    });
  };

  const modifiers = {
    deadline: deadlines.map(d => new Date(d.date)),
    preparation: deadlines
      .filter(d => d.preparationStart)
      .map(d => new Date(d.preparationStart!)),
  };

  const modifiersStyles = {
    deadline: {
      backgroundColor: 'rgb(239 68 68)',
      color: 'white',
      fontWeight: 'bold'
    },
    preparation: {
      backgroundColor: 'rgb(59 130 246)',
      color: 'white'
    }
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedMonth}
        onSelect={(date) => date && onMonthChange(date)}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className={cn("p-3 pointer-events-auto")}
      />
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Tax Deadline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Preparation Start</span>
        </div>
      </div>
    </div>
  );
};

export default TaxCalendar;
