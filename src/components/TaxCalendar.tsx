
import React, { useState } from 'react';
import { TaxDeadline } from '@/types/tax';
import EnhancedCalendarHeader from './calendar/EnhancedCalendarHeader';
import CalendarDay from './calendar/CalendarDay';
import QuickDateNavigation from './calendar/QuickDateNavigation';
import DeadlineDetailsModal from './DeadlineDetailsModal';
import { useToast } from '@/hooks/use-toast';

interface TaxCalendarProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  onFilterToggle?: () => void;
  onSearchToggle?: () => void;
  onExport?: () => void;
}

const TaxCalendar: React.FC<TaxCalendarProps> = ({ 
  deadlines, 
  selectedMonth, 
  onMonthChange,
  onFilterToggle,
  onSearchToggle,
  onExport
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [selectedDeadline, setSelectedDeadline] = useState<TaxDeadline | null>(null);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const { toast } = useToast();
  
  const today = new Date();
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days: Date[] = [];
    
    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    // Add next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }
    
    return days;
  };

  const handlePreviousMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    onMonthChange(newMonth);
  };

  const handleGoToToday = () => {
    onMonthChange(new Date());
  };

  const handleDateJump = (date: Date) => {
    onMonthChange(date);
  };

  const handleDeadlineClick = (deadline: TaxDeadline) => {
    setSelectedDeadline(deadline);
    setShowDeadlineModal(true);
  };

  const handleDateClick = (date: Date) => {
    const dayDeadlines = deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate.toDateString() === date.toDateString();
    });

    if (dayDeadlines.length === 0) {
      toast({
        title: "No deadlines",
        description: `No tax deadlines on ${date.toLocaleDateString('en-GB')}`,
      });
    } else if (dayDeadlines.length === 1) {
      handleDeadlineClick(dayDeadlines[0]);
    } else {
      toast({
        title: `${dayDeadlines.length} deadlines`,
        description: `Click on a specific deadline to view details`,
      });
    }
  };

  // Calculate stats for header
  const monthDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate.getMonth() === selectedMonth.getMonth() && 
           deadlineDate.getFullYear() === selectedMonth.getFullYear();
  });

  const urgentDeadlines = monthDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil >= 0;
  });

  const days = getDaysInMonth(selectedMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main calendar area */}
        <div className="lg:col-span-3">
          <EnhancedCalendarHeader
            currentMonth={selectedMonth}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onGoToToday={handleGoToToday}
            onMonthSelect={onMonthChange}
            onYearSelect={(year) => {
              const newDate = new Date(selectedMonth);
              newDate.setFullYear(year);
              onMonthChange(newDate);
            }}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onFilterToggle={onFilterToggle || (() => {})}
            onSearchToggle={onSearchToggle || (() => {})}
            onExport={onExport || (() => {})}
            urgentCount={urgentDeadlines.length}
            totalCount={monthDeadlines.length}
          />
          
          {/* Calendar grid */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden">
            {/* Week days header */}
            <div className="grid grid-cols-7 border-b dark:border-gray-700">
              {weekDays.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {days.map((date, index) => (
                <CalendarDay
                  key={index}
                  date={date}
                  deadlines={deadlines}
                  isToday={date.toDateString() === today.toDateString()}
                  isCurrentMonth={date.getMonth() === selectedMonth.getMonth()}
                  onDeadlineClick={handleDeadlineClick}
                  onDateClick={handleDateClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <QuickDateNavigation
            deadlines={deadlines}
            onDateJump={handleDateJump}
            currentDate={selectedMonth}
          />
        </div>
      </div>

      {/* Deadline details modal */}
      <DeadlineDetailsModal
        deadline={selectedDeadline}
        isOpen={showDeadlineModal}
        onClose={() => {
          setShowDeadlineModal(false);
          setSelectedDeadline(null);
        }}
      />
    </div>
  );
};

export default TaxCalendar;
