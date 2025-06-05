
import { useState, useMemo } from 'react';
import { AlertTriangle, Clock, Calendar, DollarSign } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';

export const useDeadlineGroups = (deadlines: TaxDeadline[]) => {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(['urgent']));

  const toggleGroup = (groupId: string) => {
    const newOpenGroups = new Set(openGroups);
    if (newOpenGroups.has(groupId)) {
      newOpenGroups.delete(groupId);
    } else {
      newOpenGroups.add(groupId);
    }
    setOpenGroups(newOpenGroups);
  };

  const groups = useMemo(() => {
    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    return [
      {
        id: 'urgent',
        title: 'Urgent (Next 7 Days)',
        icon: AlertTriangle,
        color: 'red',
        deadlines: deadlines.filter(d => {
          const date = new Date(d.date);
          return date >= today && date <= oneWeekFromNow;
        })
      },
      {
        id: 'thisMonth',
        title: 'This Month',
        icon: Clock,
        color: 'amber',
        deadlines: deadlines.filter(d => {
          const date = new Date(d.date);
          return date > oneWeekFromNow && date <= oneMonthFromNow;
        })
      },
      {
        id: 'quarterly',
        title: 'Next 3 Months',
        icon: Calendar,
        color: 'blue',
        deadlines: deadlines.filter(d => {
          const date = new Date(d.date);
          return date > oneMonthFromNow && date <= threeMonthsFromNow;
        })
      },
      {
        id: 'byCategory',
        title: 'By Category',
        icon: DollarSign,
        color: 'green',
        deadlines: deadlines,
        isCategory: true
      }
    ];
  }, [deadlines]);

  return {
    groups,
    openGroups,
    toggleGroup
  };
};
