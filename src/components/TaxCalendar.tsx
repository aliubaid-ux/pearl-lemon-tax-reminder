
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TaxDeadline } from '@/types/tax';
import { AlertTriangle, Clock } from 'lucide-react';

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

  const getPreparationForDate = (date: Date) => {
    return deadlines.find(deadline => {
      if (!deadline.preparationStart) return false;
      const prepDate = new Date(deadline.preparationStart);
      return prepDate.toDateString() === date.toDateString();
    });
  };

  const modifiers = {
    deadline: deadlines.map(d => new Date(d.date)),
    preparation: deadlines
      .filter(d => d.preparationStart)
      .map(d => new Date(d.preparationStart!)),
    urgent: deadlines
      .filter(d => {
        const deadlineDate = new Date(d.date);
        const today = new Date();
        const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 30 && daysUntil >= 0;
      })
      .map(d => new Date(d.date)),
  };

  const modifiersStyles = {
    deadline: {
      backgroundColor: 'rgb(239 68 68)',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '6px'
    },
    preparation: {
      backgroundColor: 'rgb(59 130 246)',
      color: 'white',
      borderRadius: '6px'
    },
    urgent: {
      backgroundColor: 'rgb(245 158 11)',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '6px',
      animation: 'pulse 2s infinite'
    }
  };

  const customDayContent = (day: Date) => {
    const deadline = getDeadlineForDate(day);
    const preparation = getPreparationForDate(day);
    
    if (deadline || preparation) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative w-full h-full flex items-center justify-center">
                <span>{day.getDate()}</span>
                {deadline && (
                  <div className="absolute -top-1 -right-1">
                    {deadline.priority === 'high' ? (
                      <AlertTriangle className="h-3 w-3 text-white" />
                    ) : (
                      <Clock className="h-3 w-3 text-white" />
                    )}
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              {deadline && (
                <div className="space-y-1">
                  <p className="font-semibold">{deadline.title}</p>
                  <p className="text-xs">{deadline.description}</p>
                  {deadline.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">High Priority</Badge>
                  )}
                </div>
              )}
              {preparation && (
                <div className="space-y-1">
                  <p className="font-semibold">Preparation Start</p>
                  <p className="text-xs">Begin preparing for upcoming deadline</p>
                </div>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return day.getDate();
  };

  return (
    <div className="space-y-6">
      <Calendar
        mode="single"
        selected={selectedMonth}
        onSelect={(date) => date && onMonthChange(date)}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        className={cn("p-3 pointer-events-auto w-full")}
        showOutsideDays={true}
        components={{
          Day: ({ date, ...props }) => {
            return (
              <div {...props} className={cn("hover:scale-110 transition-transform duration-200")}>
                {customDayContent(date)}
              </div>
            );
          }
        }}
      />
      
      {/* Enhanced Legend with better styling */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">Calendar Legend</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded shadow-sm"></div>
            <div>
              <span className="text-sm font-medium text-gray-700">Tax Deadline</span>
              <p className="text-xs text-gray-500">Final submission date</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded shadow-sm"></div>
            <div>
              <span className="text-sm font-medium text-gray-700">Preparation Start</span>
              <p className="text-xs text-gray-500">Begin gathering documents</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-amber-500 rounded shadow-sm animate-pulse"></div>
            <div>
              <span className="text-sm font-medium text-gray-700">Urgent (30 days)</span>
              <p className="text-xs text-gray-500">Requires immediate attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalendar;
