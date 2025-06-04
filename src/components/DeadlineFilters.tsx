
import React, { useState } from 'react';
import { Filter, Calendar, Tag, AlertTriangle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { TaxDeadline } from '@/types/tax';

interface DeadlineFiltersProps {
  deadlines: TaxDeadline[];
  onFilterChange: (filteredDeadlines: TaxDeadline[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface FilterState {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  categories: string[];
  priorities: string[];
  completed: boolean | null;
  userTypes: string[];
}

const DeadlineFilters: React.FC<DeadlineFiltersProps> = ({ 
  deadlines, 
  onFilterChange, 
  isOpen, 
  onClose 
}) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: null, to: null },
    categories: [],
    priorities: [],
    completed: null,
    userTypes: []
  });

  const categories = [...new Set(deadlines.map(d => d.category))];
  const priorities = ['high', 'medium', 'low'];
  const userTypes = ['self-employed', 'company-director', 'both'];

  const applyFilters = () => {
    let filtered = [...deadlines];

    // Date range filter
    if (filters.dateRange.from) {
      filtered = filtered.filter(d => new Date(d.date) >= filters.dateRange.from!);
    }
    if (filters.dateRange.to) {
      filtered = filtered.filter(d => new Date(d.date) <= filters.dateRange.to!);
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(d => filters.categories.includes(d.category));
    }

    // Priority filter
    if (filters.priorities.length > 0) {
      filtered = filtered.filter(d => filters.priorities.includes(d.priority));
    }

    // User type filter
    if (filters.userTypes.length > 0) {
      filtered = filtered.filter(d => 
        filters.userTypes.some(type => d.applicableTo.includes(type as any))
      );
    }

    onFilterChange(filtered);
  };

  const clearFilters = () => {
    setFilters({
      dateRange: { from: null, to: null },
      categories: [],
      priorities: [],
      completed: null,
      userTypes: []
    });
    onFilterChange(deadlines);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'categories' | 'priorities' | 'userTypes', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const activeFiltersCount = 
    (filters.dateRange.from || filters.dateRange.to ? 1 : 0) +
    filters.categories.length +
    filters.priorities.length +
    filters.userTypes.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount} active
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Date Range Filter */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      {filters.dateRange.from 
                        ? filters.dateRange.from.toLocaleDateString()
                        : "Select start date"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={filters.dateRange.from || undefined}
                      onSelect={(date) => updateFilter('dateRange', {
                        ...filters.dateRange,
                        from: date || null
                      })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      {filters.dateRange.to 
                        ? filters.dateRange.to.toLocaleDateString()
                        : "Select end date"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={filters.dateRange.to || undefined}
                      onSelect={(date) => updateFilter('dateRange', {
                        ...filters.dateRange,
                        to: date || null
                      })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleArrayFilter('categories', category)}
                  />
                  <label htmlFor={`category-${category}`} className="text-sm capitalize">
                    {category.replace('-', ' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Priority Levels
            </h3>
            <div className="flex gap-3">
              {priorities.map(priority => (
                <div key={priority} className="flex items-center space-x-2">
                  <Checkbox
                    id={`priority-${priority}`}
                    checked={filters.priorities.includes(priority)}
                    onCheckedChange={() => toggleArrayFilter('priorities', priority)}
                  />
                  <label htmlFor={`priority-${priority}`} className="text-sm capitalize">
                    {priority}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* User Type Filter */}
          <div className="space-y-3">
            <h3 className="font-semibold">Applicable To</h3>
            <div className="flex gap-3">
              {userTypes.map(userType => (
                <div key={userType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`usertype-${userType}`}
                    checked={filters.userTypes.includes(userType)}
                    onCheckedChange={() => toggleArrayFilter('userTypes', userType)}
                  />
                  <label htmlFor={`usertype-${userType}`} className="text-sm capitalize">
                    {userType.replace('-', ' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={applyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeadlineFilters;
