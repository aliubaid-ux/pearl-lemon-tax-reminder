
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
      description: 'Register for Self Assessment if you started self-employment. Required for all self-employed individuals.',
      latePenalty: '£100 late registration penalty',
      userTypes: ['self-employed'],
      priority: 'high'
    },
    {
      id: 'sa-return',
      title: 'Self Assessment Return',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Submit your Self Assessment return online. This is your annual tax return as a self-employed person.',
      latePenalty: '£100 immediate penalty, then £10 per day',
      userTypes: ['self-employed'],
      priority: 'high'
    },
    {
      id: 'sa-payment',
      title: 'Self Assessment Payment',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Pay any tax owed for the previous tax year. This is separate from your return submission.',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed'],
      priority: 'high'
    },
    {
      id: 'poa-july',
      title: 'Payment on Account (1st)',
      date: `${nextTaxYear}-07-31`,
      category: 'self-assessment',
      description: 'First payment on account for current tax year. Only applies if your tax bill was over £1,000.',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed'],
      priority: 'medium'
    },
    {
      id: 'poa-january-next',
      title: 'Payment on Account (2nd)',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Second payment on account for current tax year. Due same day as your tax return.',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed'],
      priority: 'medium'
    },
    {
      id: 'class-2-nic',
      title: 'Class 2 National Insurance',
      date: `${nextTaxYear + 1}-01-31`,
      category: 'self-assessment',
      description: 'Pay Class 2 National Insurance contributions if your profits exceed £6,515.',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['self-employed'],
      priority: 'medium'
    },
    {
      id: 'vat-registration',
      title: 'VAT Registration (if required)',
      date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-01`,
      category: 'vat',
      description: 'Register for VAT if your turnover exceeds £85,000 in the last 12 months.',
      latePenalty: 'Potential penalties for late registration',
      userTypes: ['self-employed'],
      priority: 'high'
    },
    {
      id: 'construction-industry-scheme',
      title: 'CIS Monthly Return',
      date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-19`,
      category: 'cis',
      description: 'Monthly return if you work in construction and are registered for CIS.',
      latePenalty: '£100 penalty for late submission',
      userTypes: ['self-employed'],
      priority: 'medium'
    }
  ];
})();
