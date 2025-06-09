
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Calendar,
  LayoutDashboard,
  FileText,
  Filter
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import MainDashboard from '@/components/dashboard/MainDashboard';
import MainTabs from '@/components/MainTabs';
import VisualDeadlineDisplay from '@/components/VisualDeadlineDisplay';
import EnhancedUserTypeSelector from '@/components/EnhancedUserTypeSelector';
import InteractiveCard from '@/components/InteractiveCard';
import { useFeedbackToast } from '@/components/FeedbackToast';
import { TaxDeadline } from '@/types/tax';

type UserType = 'self-employed' | 'company-director' | 'both';

interface ImprovedTabNavigationProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
  onFilterToggle?: () => void;
  onSearchToggle?: () => void;
}

const ImprovedTabNavigation: React.FC<ImprovedTabNavigationProps> = ({
  deadlines,
  selectedMonth,
  onMonthChange,
  userType,
  onUserTypeChange,
  onFilterToggle,
  onSearchToggle
}) => {
  const { showFeedback } = useFeedbackToast();
  const today = new Date();
  
  const urgentDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil >= 0;
  });

  const upcomingDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil > 7;
  });

  const handleSearchClick = () => {
    if (onSearchToggle) {
      onSearchToggle();
      showFeedback({
        type: 'info',
        title: 'Search opened',
        description: 'You can now search through your tax deadlines'
      });
    } else {
      showFeedback({
        type: 'warning',
        title: 'Search not available',
        description: 'Search functionality is being prepared'
      });
    }
  };

  const handleFilterClick = () => {
    if (onFilterToggle) {
      onFilterToggle();
      showFeedback({
        type: 'info',
        title: 'Filters opened',
        description: 'Customize which deadlines you want to see'
      });
    } else {
      showFeedback({
        type: 'warning',
        title: 'Filters not available',
        description: 'Filter functionality is being prepared'
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with user type selector and quick actions */}
      <InteractiveCard
        title="Dashboard Controls"
        description="Manage your tax deadline preferences and quick actions"
        hoverable={false}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <EnhancedUserTypeSelector
              userType={userType}
              onUserTypeChange={onUserTypeChange}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <EnhancedButton
              variant="outline"
              size="sm"
              icon={Search}
              onClick={handleSearchClick}
              tooltip="Search through your tax deadlines"
            >
              Search
            </EnhancedButton>
            <EnhancedButton
              variant="outline"
              size="sm"
              icon={Filter}
              onClick={handleFilterClick}
              tooltip={`Filter deadlines${urgentDeadlines.length > 0 ? ` (${urgentDeadlines.length} urgent)` : ''}`}
            >
              Filter
              {urgentDeadlines.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {urgentDeadlines.length}
                </Badge>
              )}
            </EnhancedButton>
          </div>
        </div>
      </InteractiveCard>

      {/* Main navigation tabs */}
      <Tabs defaultValue="dashboard" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg">
            <TabsTrigger 
              value="dashboard" 
              className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 transition-all duration-200"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 transition-all duration-200"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="deadlines" 
              className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 transition-all duration-200"
            >
              <FileText className="h-4 w-4 mr-2" />
              All Deadlines
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          <MainDashboard 
            deadlines={deadlines} 
            userType={userType} 
          />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <MainTabs
            filteredDeadlines={deadlines}
            upcomingDeadlines={upcomingDeadlines}
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
            userType={userType}
            onFilterToggle={onFilterToggle}
            onSearchToggle={onSearchToggle}
          />
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-6">
          <VisualDeadlineDisplay 
            deadlines={deadlines} 
            userType={userType} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImprovedTabNavigation;
