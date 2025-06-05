
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BarChart3, Settings } from 'lucide-react';
import MainTabs from '@/components/MainTabs';
import QuickAccessDashboard from '@/components/QuickAccessDashboard';
import UserTypeSelector from '@/components/UserTypeSelector';
import VisualDeadlineDisplay from '@/components/VisualDeadlineDisplay';
import { TaxDeadline } from '@/types/tax';

type UserType = 'self-employed' | 'company-director' | 'both';

interface TabNavigationProps {
  filteredDeadlines: TaxDeadline[];
  upcomingDeadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  filteredDeadlines,
  upcomingDeadlines,
  selectedMonth,
  onMonthChange,
  userType,
  onUserTypeChange,
}) => {
  return (
    <Tabs defaultValue="deadlines" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
        <TabsTrigger value="deadlines" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Tax Deadlines
        </TabsTrigger>
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Quick Access
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Profile
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="deadlines" className="space-y-6">
        <VisualDeadlineDisplay 
          deadlines={filteredDeadlines}
          userType={userType}
        />
        <MainTabs
          filteredDeadlines={filteredDeadlines}
          upcomingDeadlines={upcomingDeadlines}
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
          userType={userType}
        />
      </TabsContent>
      
      <TabsContent value="dashboard" className="space-y-6">
        <QuickAccessDashboard />
      </TabsContent>
      
      <TabsContent value="profile" className="space-y-6">
        <UserTypeSelector 
          userType={userType}
          onUserTypeChange={onUserTypeChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabNavigation;
