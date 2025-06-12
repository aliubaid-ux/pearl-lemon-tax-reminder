
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CalendarActionsProps {
  onSearchToggle: () => void;
  onFilterToggle: () => void;
  onExport: () => void;
  compact?: boolean;
}

const CalendarActions: React.FC<CalendarActionsProps> = ({
  onSearchToggle,
  onFilterToggle,
  onExport,
  compact = false
}) => {
  const { toast } = useToast();

  const handleSearchClick = () => {
    onSearchToggle();
    toast({
      title: "Search opened",
      description: "You can now search through your deadlines",
    });
  };

  const handleFilterClick = () => {
    onFilterToggle();
    toast({
      title: "Filters opened",
      description: "Customize which deadlines you want to see",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleSearchClick}
        className="h-8"
      >
        <Search className="h-3 w-3 mr-1" />
        {!compact && "Search"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleFilterClick}
        className="h-8"
      >
        <Filter className="h-3 w-3 mr-1" />
        {!compact && "Filter"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        className="h-8"
      >
        <Download className="h-3 w-3 mr-1" />
        {!compact && "Export"}
      </Button>
    </div>
  );
};

export default CalendarActions;
