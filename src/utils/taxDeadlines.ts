
import { TaxDeadline } from '@/types/tax';
import { selfEmployedDeadlines } from './deadlines/selfEmployedDeadlines';
import { companyDeadlines } from './deadlines/companyDeadlines';

type UserType = 'self-employed' | 'company-director' | 'both';

export const getTaxDeadlines = (userType: UserType): TaxDeadline[] => {
  const allDeadlines = [...selfEmployedDeadlines, ...companyDeadlines];
  
  if (userType === 'both') {
    return allDeadlines;
  }
  
  return allDeadlines.filter(deadline => 
    deadline.userTypes.includes(userType) || deadline.userTypes.includes('both')
  );
};
