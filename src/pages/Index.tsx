
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SimplifiedWelcome from '@/components/SimplifiedWelcome';
import FocusedDashboard from '@/components/dashboard/FocusedDashboard';
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
      <div className="space-y-8">
        <SimplifiedWelcome 
          onGetStarted={handleOnboardingComplete}
          userType={userType}
          onUserTypeChange={handleUserTypeChange}
        />
        
        <FocusedDashboard
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
