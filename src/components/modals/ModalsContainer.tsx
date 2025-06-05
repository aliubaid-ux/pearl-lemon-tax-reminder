
import React from 'react';
import UserOnboarding from '@/components/UserOnboarding';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import GlobalSearch from '@/components/GlobalSearch';
import DeadlineFilters from '@/components/DeadlineFilters';
import { TaxDeadline } from '@/types/tax';

interface ModalsContainerProps {
  showOnboarding: boolean;
  onCloseOnboarding: () => void;
  onCompleteOnboarding: () => void;
  showShortcuts: boolean;
  onCloseShortcuts: () => void;
  showSearch: boolean;
  onCloseSearch: () => void;
  showFilters: boolean;
  onCloseFilters: () => void;
  deadlines: TaxDeadline[];
  onFilterChange: (filtered: TaxDeadline[]) => void;
}

const ModalsContainer: React.FC<ModalsContainerProps> = ({
  showOnboarding,
  onCloseOnboarding,
  onCompleteOnboarding,
  showShortcuts,
  onCloseShortcuts,
  showSearch,
  onCloseSearch,
  showFilters,
  onCloseFilters,
  deadlines,
  onFilterChange,
}) => {
  return (
    <>
      <UserOnboarding
        isOpen={showOnboarding}
        onClose={onCloseOnboarding}
        onComplete={onCompleteOnboarding}
      />

      <KeyboardShortcuts
        isOpen={showShortcuts}
        onClose={onCloseShortcuts}
      />

      <GlobalSearch
        deadlines={deadlines}
        isOpen={showSearch}
        onClose={onCloseSearch}
      />

      <DeadlineFilters
        deadlines={deadlines}
        isOpen={showFilters}
        onClose={onCloseFilters}
        onFilterChange={onFilterChange}
      />
    </>
  );
};

export default ModalsContainer;
