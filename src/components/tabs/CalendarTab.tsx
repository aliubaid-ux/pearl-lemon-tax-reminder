
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import TaxCalendar from '@/components/TaxCalendar';
import { exportToCSV, printCalendar } from '@/utils/exportUtils';
import { TaxDeadline } from '@/types/tax';

interface CalendarTabProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  userType: string;
  onFilterToggle?: () => void;
  onSearchToggle?: () => void;
}

const CalendarTab: React.FC<CalendarTabProps> = ({
  deadlines,
  selectedMonth,
  onMonthChange,
  userType,
  onFilterToggle,
  onSearchToggle
}) => {
  const handleExport = () => {
    exportToCSV(deadlines);
  };

  const handlePrint = () => {
    printCalendar(deadlines, userType);
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-4 text-2xl text-gray-900 dark:text-white">
          <Calendar className="h-7 w-7 text-green-600" />
          Interactive Tax Calendar
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
          Click on dates and deadlines to interact • Use quick navigation to jump to important dates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <TaxCalendar 
          deadlines={deadlines}
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
          onFilterToggle={onFilterToggle}
          onSearchToggle={onSearchToggle}
          onExport={handleExport}
        />
        
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            onClick={handlePrint}
          >
            Print Calendar
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const today = new Date();
              onMonthChange(today);
            }}
          >
            Go to Current Month
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarTab;
