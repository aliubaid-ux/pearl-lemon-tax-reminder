
import { TaxDeadline } from '@/types/tax';

export const selfEmployedDeadlines: TaxDeadline[] = (() => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based (0 = January)
  
  // Determine the current and next tax year
  const taxYearStart = currentMonth >= 3 ? currentYear : currentYear - 1; // Tax year starts April 6th
  const nextTaxYear = taxYearStart + 1;
  
  return [
    {
      id: 'sa-register',
      title: 'Register for Self Assessment',
      date: `${nextTaxYear}-10-05`,
      category: 'self-assessment',
      description: 'Register for Self Assessment if you started self-employment',
      latePenalty: '£100 late registration penalty',
      userTypes: ['self-employed', 'both'],
      priority: 'high'
    },
    {
      id: 'sa-return',
      title: 'Self Assessment Return',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Submit your Self Assessment return online',
      latePenalty: '£100 immediate penalty, then £10 per day',
      userTypes: ['self-employed', 'both'],
      priority: 'high'
    },
    {
      id: 'sa-payment',
      title: 'Self Assessment Payment',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Pay any tax owed for the previous tax year',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed', 'both'],
      priority: 'high'
    },
    {
      id: 'poa-july',
      title: 'Payment on Account (1st)',
      date: `${nextTaxYear}-07-31`,
      category: 'self-assessment',
      description: 'First payment on account for current tax year',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed', 'both'],
      priority: 'medium'
    },
    {
      id: 'poa-january-next',
      title: 'Payment on Account (2nd)',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Second payment on account for current tax year',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed', 'both'],
      priority: 'medium'
    },
    {
      id: 'class-2-nic',
      title: 'Class 2 National Insurance',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Pay Class 2 National Insurance contributions if applicable',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed', 'both'],
      priority: 'medium'
    }
  ];
})();
