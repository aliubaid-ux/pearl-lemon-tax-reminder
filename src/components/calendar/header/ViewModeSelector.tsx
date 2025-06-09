
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid, List, Calendar } from 'lucide-react';

interface ViewModeSelectorProps {
  viewMode: 'month' | 'week' | 'list';
  onViewModeChange: (mode: 'month' | 'week' | 'list') => void;
}

const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({
  viewMode,
  onViewModeChange
}) => {
  return (
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
  );
};

export default ViewModeSelector;
