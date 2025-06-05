
import { useState, useEffect } from 'react';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { TaxDeadline } from '@/types/tax';

type UserType = 'self-employed' | 'company-director' | 'both';

export const useUserTypeAndDeadlines = () => {
  const [deadlines, setDeadlines] = useState<TaxDeadline[]>([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState<TaxDeadline[]>([]);
  const [userType, setUserType] = useState<UserType>('both');

  useEffect(() => {
    // Load user type from localStorage
    const savedUserType = localStorage.getItem('uk-tax-doctor-user-type') as UserType || 'both';
    setUserType(savedUserType);

    // Load deadlines based on user type
    const loadedDeadlines = getTaxDeadlines(savedUserType);
    setDeadlines(loadedDeadlines);
    setFilteredDeadlines(loadedDeadlines);
  }, []);

  const handleUserTypeChange = (newUserType: UserType) => {
    setUserType(newUserType);
    localStorage.setItem('uk-tax-doctor-user-type', newUserType);
    
    // Reload deadlines for the new user type
    const newDeadlines = getTaxDeadlines(newUserType);
    setDeadlines(newDeadlines);
    setFilteredDeadlines(newDeadlines);
  };

  const handleFilterChange = (filtered: TaxDeadline[]) => {
    setFilteredDeadlines(filtered);
  };

  // Get upcoming deadlines for quick access dashboard
  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);
  const upcomingDeadlines = filteredDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= oneMonthFromNow;
  });

  return {
    deadlines,
    filteredDeadlines,
    userType,
    upcomingDeadlines,
    handleUserTypeChange,
    handleFilterChange,
  };
};
