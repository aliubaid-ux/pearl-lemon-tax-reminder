
import { useState, useEffect } from 'react';

export const useModalState = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('uk-tax-doctor-onboarding-complete');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('uk-tax-doctor-onboarding-complete', 'true');
  };

  const closeFilters = () => setShowFilters(false);

  return {
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
  };
};
