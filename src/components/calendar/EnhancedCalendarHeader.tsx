
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
      {/* Top row - All controls grouped together on the left */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
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

          <CalendarActions
            onSearchToggle={onSearchToggle}
            onFilterToggle={onFilterToggle}
            onExport={onExport}
            compact={true}
          />
        </div>
      </div>

      {/* Bottom row - Stats only */}
      <div className="flex items-center">
        <DeadlineStats
          urgentCount={urgentCount}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default EnhancedCalendarHeader;
