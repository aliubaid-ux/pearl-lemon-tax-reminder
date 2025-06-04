
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentMonth, 
  onPreviousMonth, 
  onNextMonth 
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button variant="outline" size="sm" onClick={onPreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h2 className="text-lg font-semibold">
        {currentMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
      </h2>
      <Button variant="outline" size="sm" onClick={onNextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CalendarHeader;
