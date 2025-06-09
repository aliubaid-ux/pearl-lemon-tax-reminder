
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import MainTabsList from './MainTabsList';
import DashboardControls from '@/components/dashboard/DashboardControls';
import MainDashboard from '@/components/dashboard/MainDashboard';
import MainTabs from '@/components/MainTabs';
import VisualDeadlineDisplay from '@/components/VisualDeadlineDisplay';
import { useDeadlineStats } from '@/hooks/useDeadlineStats';
import { useFeedbackToast } from '@/hooks/useFeedbackToast';
import { TaxDeadline } from '@/types/tax';

type UserType = 'self-employed' | 'company-director' | 'both';

interface ImprovedTabNavigationProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const ImprovedTabNavigation: React.FC<ImprovedTabNavigationProps> = ({
  deadlines,
  selectedMonth,
  onMonthChange,
  userType,
  onUserTypeChange
}) => {
  const { showFeedback } = useFeedbackToast();
  const { urgentDeadlines, upcomingDeadlines, urgentCount } = useDeadlineStats(deadlines);

  const handleUserTypeChangeWithFeedback = (type: UserType) => {
    onUserTypeChange(type);
    showFeedback({
      type: 'success',
      title: 'User type updated',
      description: `Now showing deadlines for: ${type.replace('-', ' ')}`
    });
  };

  return (
    <div className="space-y-8">
      <DashboardControls
        userType={userType}
        onUserTypeChange={handleUserTypeChangeWithFeedback}
        urgentCount={urgentCount}
      />

      <Tabs defaultValue="dashboard" className="space-y-8">
        <MainTabsList />

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
