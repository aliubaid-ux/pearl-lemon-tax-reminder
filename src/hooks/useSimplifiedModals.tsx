
import { useState, useEffect } from 'react';

export const useSimplifiedModals = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

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

  return {
    // Onboarding
    showOnboarding,
    handleOnboardingComplete,
    closeOnboarding: () => setShowOnboarding(false),
  };
};
