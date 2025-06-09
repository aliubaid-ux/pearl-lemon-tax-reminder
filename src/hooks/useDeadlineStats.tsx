
import { useMemo } from 'react';
import { TaxDeadline } from '@/types/tax';

export const useDeadlineStats = (deadlines: TaxDeadline[]) => {
  return useMemo(() => {
    const today = new Date();
    
    const urgentDeadlines = deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 7 && daysUntil >= 0;
    });

    const upcomingDeadlines = deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 30 && daysUntil > 7;
    });

    const overdueDeadlines = deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate < today;
    });

    return {
      urgentDeadlines,
      upcomingDeadlines,
      overdueDeadlines,
      urgentCount: urgentDeadlines.length,
      upcomingCount: upcomingDeadlines.length,
      overdueCount: overdueDeadlines.length,
      totalDeadlines: deadlines.length
    };
  }, [deadlines]);
};
