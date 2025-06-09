
import React from 'react';
import CalendarDay from './CalendarDay';
import { TaxDeadline } from '@/types/tax';
import { getDaysInMonth } from '@/utils/calendarUtils';

interface CalendarGridProps {
  selectedMonth: Date;
  deadlines: TaxDeadline[];
  onDeadlineClick: (deadline: TaxDeadline) => void;
  onDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  selectedMonth,
  deadlines,
  onDeadlineClick,
  onDateClick
}) => {
  const today = new Date();
  const days = getDaysInMonth(selectedMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
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
            onDeadlineClick={onDeadlineClick}
            onDateClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
