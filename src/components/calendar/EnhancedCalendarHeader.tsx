
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Grid,
  List,
  Filter,
  Search,
  Download
} from 'lucide-react';

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
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(parseInt(monthIndex));
    onMonthSelect(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(parseInt(year));
    onYearSelect(parseInt(year));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 mb-6">
      {/* Top row - Month/Year navigation and view controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          {/* Month navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Select value={currentMonth.getMonth().toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={currentYear.toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onGoToToday}
            className="text-blue-600 dark:text-blue-400"
          >
            Today
          </Button>
        </div>

        {/* View mode controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md p-1">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('month')}
              className="h-7 px-3"
            >
              <Grid className="h-3 w-3 mr-1" />
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('week')}
              className="h-7 px-3"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Week
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="h-7 px-3"
            >
              <List className="h-3 w-3 mr-1" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom row - Stats and actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="flex items-center gap-1">
              {urgentCount} urgent
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              {totalCount} total
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSearchToggle}
            className="h-8"
          >
            <Search className="h-3 w-3 mr-1" />
            Search
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterToggle}
            className="h-8"
          >
            <Filter className="h-3 w-3 mr-1" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="h-8"
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCalendarHeader;
