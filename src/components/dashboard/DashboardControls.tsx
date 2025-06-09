
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import EnhancedUserTypeSelector from '@/components/EnhancedUserTypeSelector';
import InteractiveCard from '@/components/InteractiveCard';
import { useFeedbackToast } from '@/hooks/useFeedbackToast';

type UserType = 'self-employed' | 'company-director' | 'both';

interface DashboardControlsProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
  urgentCount: number;
  onSearchToggle?: () => void;
  onFilterToggle?: () => void;
}

const DashboardControls: React.FC<DashboardControlsProps> = ({
  userType,
  onUserTypeChange,
  urgentCount,
  onSearchToggle,
  onFilterToggle
}) => {
  const { showFeedback } = useFeedbackToast();

  const handleSearchClick = () => {
    if (onSearchToggle) {
      onSearchToggle();
      showFeedback({
        type: 'info',
        title: 'Search opened',
        description: 'You can now search through your tax deadlines'
      });
    } else {
      showFeedback({
        type: 'warning',
        title: 'Search not available',
        description: 'Search functionality is being prepared'
      });
    }
  };

  const handleFilterClick = () => {
    if (onFilterToggle) {
      onFilterToggle();
      showFeedback({
        type: 'info',
        title: 'Filters opened',
        description: 'Customize which deadlines you want to see'
      });
    } else {
      showFeedback({
        type: 'warning',
        title: 'Filters not available',
        description: 'Filter functionality is being prepared'
      });
    }
  };

  return (
    <InteractiveCard
      title="Dashboard Controls"
      description="Manage your tax deadline preferences and quick actions"
      hoverable={false}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex-1">
          <EnhancedUserTypeSelector
            userType={userType}
            onUserTypeChange={onUserTypeChange}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <EnhancedButton
            variant="outline"
            size="sm"
            icon={Search}
            onClick={handleSearchClick}
            tooltip="Search through your tax deadlines"
          >
            Search
          </EnhancedButton>
          <EnhancedButton
            variant="outline"
            size="sm"
            icon={Filter}
            onClick={handleFilterClick}
            tooltip={`Filter deadlines${urgentCount > 0 ? ` (${urgentCount} urgent)` : ''}`}
          >
            Filter
            {urgentCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {urgentCount}
              </Badge>
            )}
          </EnhancedButton>
        </div>
      </div>
    </InteractiveCard>
  );
};

export default DashboardControls;
