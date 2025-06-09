
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ImprovedTabNavigation from '@/components/navigation/ImprovedTabNavigation';
import SimplifiedModalsContainer from '@/components/modals/SimplifiedModalsContainer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useUserTypeAndDeadlines } from '@/hooks/useUserTypeAndDeadlines';
import { useSimplifiedModals } from '@/hooks/useSimplifiedModals';
import { useFeedbackToast } from '@/hooks/useFeedbackToast';

const ImprovedIndex: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { showFeedback } = useFeedbackToast();
  
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
    onShowSearch: () => {
      openSearch();
      showFeedback({
        type: 'info',
        title: 'Search opened via keyboard',
        description: 'Press Escape to close'
      });
    },
    onShowFilters: () => {
      openFilters();
      showFeedback({
        type: 'info',
        title: 'Filters opened via keyboard',
        description: 'Press Escape to close'
      });
    },
    onShowShortcuts: () => {
      showFeedback({
        type: 'info',
        title: 'Keyboard shortcuts',
        description: 'Ctrl+K for search, Ctrl+F for filters'
      });
    },
  });

  const handleFilterChangeAndClose = (filtered: any) => {
    handleFilterChange(filtered);
    closeFilters();
    showFeedback({
      type: 'success',
      title: 'Filters applied',
      description: 'Your deadline view has been updated'
    });
  };

  const handleOnboardingCompleteWithFeedback = () => {
    handleOnboardingComplete();
    showFeedback({
      type: 'success',
      title: 'Welcome to UK Tax Doctor!',
      description: 'You are all set up and ready to manage your tax deadlines'
    });
  };

  return (
    <MainLayout>
      <ImprovedTabNavigation
        deadlines={filteredDeadlines}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        userType={userType}
        onUserTypeChange={handleUserTypeChange}
        onFilterToggle={openFilters}
        onSearchToggle={openSearch}
      />

      <SimplifiedModalsContainer
        showOnboarding={showOnboarding}
        onCloseOnboarding={closeOnboarding}
        onCompleteOnboarding={handleOnboardingCompleteWithFeedback}
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

export default ImprovedIndex;
