
import { TaxDeadline } from '@/types/tax';
import { selfEmployedDeadlines } from './deadlines/selfEmployedDeadlines';
import { companyDeadlines } from './deadlines/companyDeadlines';

type UserType = 'self-employed' | 'company-director' | 'both';

export const getTaxDeadlines = (userType: UserType): TaxDeadline[] => {
  console.log('Getting deadlines for user type:', userType);
  
  let filteredDeadlines: TaxDeadline[] = [];
  
  if (userType === 'both') {
    // For 'both', include all deadlines from both categories
    filteredDeadlines = [...selfEmployedDeadlines, ...companyDeadlines];
  } else if (userType === 'self-employed') {
    // Only self-employed deadlines
    filteredDeadlines = selfEmployedDeadlines.filter(deadline => 
      deadline.userTypes.includes('self-employed')
    );
  } else if (userType === 'company-director') {
    // Only company director deadlines
    filteredDeadlines = companyDeadlines.filter(deadline => 
      deadline.userTypes.includes('company-director')
    );
  }
  
  console.log(`Found ${filteredDeadlines.length} deadlines for ${userType}:`, filteredDeadlines.map(d => d.title));
  
  // Sort by date
  return filteredDeadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
