
import React from 'react';
import CalendarNavigation from './header/CalendarNavigation';
import ViewModeSelector from './header/ViewModeSelector';
import DeadlineStats from './header/DeadlineStats';
import CalendarActions from './header/CalendarActions';

interface EnhancedCalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onGoToToday: () => void;
  onMonthSelect: (date: Date) => void;
  onYearSelect: (year: number) => void;
  viewMode: 'month' | 'week' | 'list';
  onViewModeChange: (mode: 'month' | 'week' | 'list') => void;
  onFilterToggle: () => void;
  onSearchToggle: () => void;
  onExport: () => void;
  urgentCount: number;
  totalCount: number;
}

const EnhancedCalendarHeader: React.FC<EnhancedCalendarHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  onGoToToday,
  onMonthSelect,
  onYearSelect,
  viewMode,
  onViewModeChange,
  onFilterToggle,
  onSearchToggle,
  onExport,
  urgentCount,
  totalCount
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 mb-6">
      {/* Top row - Month/Year navigation and view controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <CalendarNavigation
          currentMonth={currentMonth}
          onPreviousMonth={onPreviousMonth}
          onNextMonth={onNextMonth}
          onGoToToday={onGoToToday}
          onMonthSelect={onMonthSelect}
          onYearSelect={onYearSelect}
        />

        <ViewModeSelector
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />
      </div>

      {/* Bottom row - Stats and actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <DeadlineStats
          urgentCount={urgentCount}
          totalCount={totalCount}
        />

        <CalendarActions
          onSearchToggle={onSearchToggle}
          onFilterToggle={onFilterToggle}
          onExport={onExport}
        />
      </div>
    </div>
  );
};

export default EnhancedCalendarHeader;
