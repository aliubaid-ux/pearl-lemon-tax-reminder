
import { useState, useEffect } from 'react';

export const useSimplifiedModals = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
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

  const openSearch = () => setShowSearch(true);
  const closeSearch = () => setShowSearch(false);
  
  const openFilters = () => setShowFilters(true);
  const closeFilters = () => setShowFilters(false);

  return {
    // Onboarding
    showOnboarding,
    handleOnboardingComplete,
    closeOnboarding: () => setShowOnboarding(false),
    
    // Search
    showSearch,
    openSearch,
    closeSearch,
    
    // Filters
    showFilters,
    openFilters,
    closeFilters,
  };
};
