
import React, { useState } from 'react';
import { TaxDeadline } from '@/types/tax';
import EnhancedCalendarHeader from './calendar/EnhancedCalendarHeader';
import CalendarGrid from './calendar/CalendarGrid';
import QuickDateNavigation from './calendar/QuickDateNavigation';
import DeadlineDetailsModal from './DeadlineDetailsModal';
import { useCalendarHandlers } from './calendar/CalendarHandlers';
import { calculateDeadlineStats } from '@/utils/calendarUtils';

interface TaxCalendarProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  userType?: string;
  onExport?: () => void;
}

const TaxCalendar: React.FC<TaxCalendarProps> = ({ 
  deadlines, 
  selectedMonth, 
  onMonthChange,
  userType = 'self-employed',
  onExport
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  
  const {
    selectedDeadline,
    setSelectedDeadline,
    showDeadlineModal,
    setShowDeadlineModal,
    handleExport,
    handlePreviousMonth,
    handleNextMonth,
    handleGoToToday,
    handleDateJump,
    handleDeadlineClick,
    handleDateClick
  } = useCalendarHandlers({
    deadlines,
    userType,
    onMonthChange,
    selectedMonth,
    onExport
  });

  // Calculate stats for header
  const { monthDeadlines, urgentDeadlines } = calculateDeadlineStats(deadlines, selectedMonth);

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
            urgentCount={urgentDeadlines.length}
            totalCount={monthDeadlines.length}
          />
          
          <CalendarGrid
            selectedMonth={selectedMonth}
            deadlines={deadlines}
            onDeadlineClick={handleDeadlineClick}
            onDateClick={handleDateClick}
          />
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
