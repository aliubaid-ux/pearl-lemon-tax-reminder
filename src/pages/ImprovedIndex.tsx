
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ImprovedTabNavigation from '@/components/navigation/ImprovedTabNavigation';
import SimplifiedModalsContainer from '@/components/modals/SimplifiedModalsContainer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useUserTypeAndDeadlines } from '@/hooks/useUserTypeAndDeadlines';
import { useSimplifiedModals } from '@/hooks/useSimplifiedModals';

const ImprovedIndex: React.FC = () => {
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
      // Show shortcuts info via console for now
      console.log('Keyboard shortcuts: Use arrow keys to navigate calendar');
    },
  });

  return (
    <MainLayout>
      <ImprovedTabNavigation
        deadlines={filteredDeadlines}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        userType={userType}
        onUserTypeChange={handleUserTypeChange}
      />

      <SimplifiedModalsContainer
        showOnboarding={showOnboarding}
        onCloseOnboarding={closeOnboarding}
        onCompleteOnboarding={handleOnboardingComplete}
        deadlines={deadlines}
      />
    </MainLayout>
  );
};

export default ImprovedIndex;
