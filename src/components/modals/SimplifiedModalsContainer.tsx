
import React from 'react';
import UserOnboarding from '@/components/UserOnboarding';
import GlobalSearch from '@/components/GlobalSearch';
import DeadlineFilters from '@/components/DeadlineFilters';
import { TaxDeadline } from '@/types/tax';

interface SimplifiedModalsContainerProps {
  showOnboarding: boolean;
  onCloseOnboarding: () => void;
  onCompleteOnboarding: () => void;
  showSearch: boolean;
  onCloseSearch: () => void;
  showFilters: boolean;
  onCloseFilters: () => void;
  deadlines: TaxDeadline[];
  onFilterChange: (filtered: TaxDeadline[]) => void;
}

const SimplifiedModalsContainer: React.FC<SimplifiedModalsContainerProps> = ({
  showOnboarding,
  onCloseOnboarding,
  onCompleteOnboarding,
  showSearch,
  onCloseSearch,
  showFilters,
  onCloseFilters,
  deadlines,
  onFilterChange,
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

      {showSearch && (
        <GlobalSearch
          deadlines={deadlines}
          isOpen={showSearch}
          onClose={onCloseSearch}
        />
      )}

      {showFilters && (
        <DeadlineFilters
          deadlines={deadlines}
          isOpen={showFilters}
          onClose={onCloseFilters}
          onFilterChange={onFilterChange}
        />
      )}
    </>
  );
};

export default SimplifiedModalsContainer;
