
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CollapsibleWelcome from '@/components/CollapsibleWelcome';
import CollapsibleDashboard from '@/components/dashboard/CollapsibleDashboard';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useUserTypeAndDeadlines } from '@/hooks/useUserTypeAndDeadlines';
import { useSimplifiedModals } from '@/hooks/useSimplifiedModals';

const Index: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const {
    deadlines,
    filteredDeadlines,
    userType,
    handleUserTypeChange,
  } = useUserTypeAndDeadlines();

  const {
    showOnboarding,
    handleOnboardingComplete,
    closeOnboarding,
  } = useSimplifiedModals();

  useKeyboardShortcuts({
    onShowShortcuts: () => {
      console.log('Keyboard shortcuts: Use arrow keys to navigate calendar');
    },
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <CollapsibleWelcome 
          onGetStarted={handleOnboardingComplete}
          userType={userType}
          onUserTypeChange={handleUserTypeChange}
        />
        
        <CollapsibleDashboard
          deadlines={filteredDeadlines}
          userType={userType}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
