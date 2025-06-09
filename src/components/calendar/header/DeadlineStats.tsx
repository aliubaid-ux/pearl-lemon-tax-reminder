
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface DeadlineStatsProps {
  urgentCount: number;
  totalCount: number;
}

const DeadlineStats: React.FC<DeadlineStatsProps> = ({
  urgentCount,
  totalCount
}) => {
  return (
    <div className="flex items-center gap-3">
      <Badge variant="destructive" className="flex items-center gap-1">
        {urgentCount} urgent
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1">
        {totalCount} total
      </Badge>
    </div>
  );
};

export default DeadlineStats;
