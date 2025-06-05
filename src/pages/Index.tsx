
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabNavigation from '@/components/navigation/TabNavigation';
import ModalsContainer from '@/components/modals/ModalsContainer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useUserTypeAndDeadlines } from '@/hooks/useUserTypeAndDeadlines';
import { useModalState } from '@/hooks/useModalState';

const Index: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  const {
    deadlines,
    filteredDeadlines,
    userType,
    upcomingDeadlines,
    handleUserTypeChange,
    handleFilterChange,
  } = useUserTypeAndDeadlines();

  const {
    showOnboarding,
    setShowOnboarding,
    showShortcuts,
    setShowShortcuts,
    showSearch,
    setShowSearch,
    showFilters,
    setShowFilters,
    handleOnboardingComplete,
    closeFilters,
  } = useModalState();

  useKeyboardShortcuts({
    onShowSearch: () => setShowSearch(true),
    onShowFilters: () => setShowFilters(true),
    onShowShortcuts: () => setShowShortcuts(true),
  });

  const handleFilterChangeAndClose = (filtered: any) => {
    handleFilterChange(filtered);
    closeFilters();
  };

  return (
    <MainLayout>
      <TabNavigation
        filteredDeadlines={filteredDeadlines}
        upcomingDeadlines={upcomingDeadlines}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        userType={userType}
        onUserTypeChange={handleUserTypeChange}
      />

      <ModalsContainer
        showOnboarding={showOnboarding}
        onCloseOnboarding={() => setShowOnboarding(false)}
        onCompleteOnboarding={handleOnboardingComplete}
        showShortcuts={showShortcuts}
        onCloseShortcuts={() => setShowShortcuts(false)}
        showSearch={showSearch}
        onCloseSearch={() => setShowSearch(false)}
        showFilters={showFilters}
        onCloseFilters={() => setShowFilters(false)}
        deadlines={deadlines}
        onFilterChange={handleFilterChangeAndClose}
      />
    </MainLayout>
  );
};

export default Index;
