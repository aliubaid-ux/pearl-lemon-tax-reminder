
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
    handleFilterChange,
  } = useUserTypeAndDeadlines();

  const {
    showOnboarding,
    handleOnboardingComplete,
    closeOnboarding,
    showSearch,
    openSearch,
    closeSearch,
    showFilters,
    openFilters,
    closeFilters,
  } = useSimplifiedModals();

  useKeyboardShortcuts({
    onShowSearch: openSearch,
    onShowFilters: openFilters,
    onShowShortcuts: () => {}, // Removed shortcuts modal for simplicity
  });

  const handleFilterChangeAndClose = (filtered: any) => {
    handleFilterChange(filtered);
    closeFilters();
  };

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
        showSearch={showSearch}
        onCloseSearch={closeSearch}
        showFilters={showFilters}
        onCloseFilters={closeFilters}
        deadlines={deadlines}
        onFilterChange={handleFilterChangeAndClose}
      />
    </MainLayout>
  );
};

export default Index;
