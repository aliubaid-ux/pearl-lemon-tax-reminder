
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { TaxDeadline } from '@/types/tax';
import { AlertTriangle, Clock, Info, Eye, EyeOff } from 'lucide-react';
import CalendarSidebar from './CalendarSidebar';

interface TaxCalendarProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const TaxCalendar: React.FC<TaxCalendarProps> = ({ deadlines, selectedMonth, onMonthChange }) => {
  const [showPreparationDates, setShowPreparationDates] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const getDeadlineForDate = (date: Date) => {
    return deadlines.find(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate.toDateString() === date.toDateString();
    });
  };

  const getPreparationForDate = (date: Date) => {
    if (!showPreparationDates) return null;
    return deadlines.find(deadline => {
      if (!deadline.preparationStart) return false;
      const prepDate = new Date(deadline.preparationStart);
      return prepDate.toDateString() === date.toDateString();
    });
  };

  const getDeadlinesForDate = (date: Date) => {
    return deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate.toDateString() === date.toDateString();
    });
  };

  const modifiers = {
    deadline: deadlines
      .filter(d => selectedCategories.length === 0 || selectedCategories.includes(d.category))
      .map(d => new Date(d.date)),
    preparation: showPreparationDates ? deadlines
      .filter(d => d.preparationStart && (selectedCategories.length === 0 || selectedCategories.includes(d.category)))
      .map(d => new Date(d.preparationStart!)) : [],
    urgent: deadlines
      .filter(d => {
        const deadlineDate = new Date(d.date);
        const today = new Date();
        const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntil <= 30 && daysUntil >= 0 && (selectedCategories.length === 0 || selectedCategories.includes(d.category));
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
    const allDeadlines = getDeadlinesForDate(day);
    
    if ((deadline || preparation) && (selectedCategories.length === 0 || 
        (deadline && selectedCategories.includes(deadline.category)) ||
        (preparation && selectedCategories.includes(preparation.category)))) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative w-full h-full flex items-center justify-center">
                <span>{day.getDate()}</span>
                {allDeadlines.length > 1 && (
                  <div className="absolute -top-1 -left-1">
                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-800">{allDeadlines.length}</span>
                    </div>
                  </div>
                )}
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
              {allDeadlines.map((deadline, index) => (
                <div key={deadline.id} className={`space-y-1 ${index > 0 ? 'pt-2 border-t border-gray-200' : ''}`}>
                  <p className="font-semibold">{deadline.title}</p>
                  <p className="text-xs">{deadline.description}</p>
                  {deadline.priority === 'high' && (
                    <Badge variant="destructive" className="text-xs">High Priority</Badge>
                  )}
                </div>
              ))}
              {preparation && (
                <div className="space-y-1 pt-2 border-t border-gray-200">
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

  const categories = Array.from(new Set(deadlines.map(d => d.category)));

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Main Calendar - now takes 3 columns instead of full width */}
      <div className="xl:col-span-3 space-y-6">
        {/* Calendar Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showPreparationDates ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPreparationDates(!showPreparationDates)}
            >
              {showPreparationDates ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
              Preparation Dates
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Filter by Category</h4>
                  {categories.map(category => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm capitalize">
                        {category.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                  {selectedCategories.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategories([])}
                      className="w-full mt-2"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

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
        
        {/* Enhanced Legend with category filtering */}
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
          
          {selectedCategories.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Filtered by:</p>
              <div className="flex flex-wrap gap-1">
                {selectedCategories.map(category => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - new addition */}
      <div className="xl:col-span-1">
        <CalendarSidebar deadlines={deadlines} selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default TaxCalendar;
