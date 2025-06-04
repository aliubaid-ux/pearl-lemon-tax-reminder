
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { TaxDeadline } from '@/types/tax';

interface SearchFilterBarProps {
  deadlines: TaxDeadline[];
  onFilteredDeadlines: (filtered: TaxDeadline[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  deadlines,
  onFilteredDeadlines,
  searchQuery,
  onSearchChange
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);

  const categories = Array.from(new Set(deadlines.map(d => d.category)));
  const priorities = ['high', 'medium', 'low'];

  const applyFilters = () => {
    let filtered = deadlines;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(deadline =>
        deadline.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deadline.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(deadline =>
        selectedCategories.includes(deadline.category)
      );
    }

    // Priority filter
    if (selectedPriorities.length > 0) {
      filtered = filtered.filter(deadline =>
        selectedPriorities.includes(deadline.priority)
      );
    }

    // Upcoming only filter
    if (showUpcomingOnly) {
      const today = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(today.getMonth() + 3);
      
      filtered = filtered.filter(deadline => {
        const deadlineDate = new Date(deadline.date);
        return deadlineDate >= today && deadlineDate <= threeMonthsFromNow;
      });
    }

    onFilteredDeadlines(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategories, selectedPriorities, showUpcomingOnly, deadlines]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const togglePriority = (priority: string) => {
    setSelectedPriorities(prev =>
      prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriorities([]);
    setShowUpcomingOnly(false);
    onSearchChange('');
  };

  const activeFiltersCount = selectedCategories.length + selectedPriorities.length + (showUpcomingOnly ? 1 : 0);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search deadlines..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Filter Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 px-1 py-0 text-xs min-w-[1.25rem] h-5">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Filters</h4>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Upcoming Only */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={showUpcomingOnly}
                      onCheckedChange={setShowUpcomingOnly}
                    />
                    <span className="text-sm">Show upcoming only (3 months)</span>
                  </label>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Categories</h5>
                  {categories.map(category => (
                    <label key={category} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span className="text-sm capitalize">
                        {category.replace('-', ' ')}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Priorities */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Priority</h5>
                  {priorities.map(priority => (
                    <label key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedPriorities.includes(priority)}
                        onCheckedChange={() => togglePriority(priority)}
                      />
                      <span className="text-sm capitalize flex items-center gap-1">
                        {priority === 'high' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                        {priority === 'medium' && <Clock className="h-3 w-3 text-amber-500" />}
                        {priority === 'low' && <Calendar className="h-3 w-3 text-green-500" />}
                        {priority}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Active Filters Display */}
        {(selectedCategories.length > 0 || selectedPriorities.length > 0 || showUpcomingOnly) && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {showUpcomingOnly && (
              <Badge variant="secondary" className="text-xs">
                Upcoming Only
                <button
                  onClick={() => setShowUpcomingOnly(false)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            )}
            {selectedCategories.map(category => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category.replace('-', ' ')}
                <button
                  onClick={() => toggleCategory(category)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
            {selectedPriorities.map(priority => (
              <Badge key={priority} variant="secondary" className="text-xs">
                {priority} priority
                <button
                  onClick={() => togglePriority(priority)}
                  className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilterBar;
