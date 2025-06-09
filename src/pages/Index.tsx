
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SimplifiedTabNavigation from '@/components/navigation/SimplifiedTabNavigation';
import SimplifiedModalsContainer from '@/components/modals/SimplifiedModalsContainer';
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
    onShowShortcuts: () => {}, // Removed shortcuts modal for simplicity
  });

  return (
    <MainLayout>
      <SimplifiedTabNavigation
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

export default Index;
