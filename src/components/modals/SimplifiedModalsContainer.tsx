
import React from 'react';
import UserOnboarding from '@/components/UserOnboarding';
import { TaxDeadline } from '@/types/tax';

interface SimplifiedModalsContainerProps {
  showOnboarding: boolean;
  onCloseOnboarding: () => void;
  onCompleteOnboarding: () => void;
  deadlines: TaxDeadline[];
}

const SimplifiedModalsContainer: React.FC<SimplifiedModalsContainerProps> = ({
  showOnboarding,
  onCloseOnboarding,
  onCompleteOnboarding,
  deadlines,
}) => {
  return (
    <>
      {showOnboarding && (
        <UserOnboarding
          isOpen={showOnboarding}
          onClose={onCloseOnboarding}
          onComplete={onCompleteOnboarding}
        />
      )}
    </>
  );
};

export default SimplifiedModalsContainer;
