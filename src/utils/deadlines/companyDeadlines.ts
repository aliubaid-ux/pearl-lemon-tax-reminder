
import { TaxDeadline } from '@/types/tax';

export const companyDeadlines: TaxDeadline[] = (() => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based
  
  // For companies, we'll assume a common year-end of March 31st
  const accountingYearEnd = currentMonth >= 2 ? currentYear : currentYear - 1; // March = month 2
  const nextAccountingYear = accountingYearEnd + 1;
  
  return [
    {
      id: 'ct600',
      title: 'Corporation Tax Return (CT600)',
      date: `${nextAccountingYear}-12-31`,
      category: 'corporation-tax',
      description: 'Submit Corporation Tax return (12 months after accounting year end)',
      latePenalty: '£100-£1,000 depending on company size',
      userTypes: ['company-director', 'both'],
      priority: 'high'
    },
    {
      id: 'ct-payment',
      title: 'Corporation Tax Payment',
      date: `${nextAccountingYear}-09-30`,
      category: 'corporation-tax',
      description: 'Pay Corporation Tax (9 months and 1 day after accounting period end)',
      latePenalty: 'Interest charged on late payments',
      userTypes: ['company-director', 'both'],
      priority: 'high'
    },
    {
      id: 'confirmation',
      title: 'Confirmation Statement',
      date: `${nextAccountingYear}-08-15`,
      category: 'other',
      description: 'Annual confirmation statement to Companies House',
      latePenalty: '£150 late filing penalty',
      userTypes: ['company-director', 'both'],
      priority: 'medium'
    },
    {
      id: 'annual-accounts',
      title: 'Annual Accounts Filing',
      date: `${nextAccountingYear}-09-30`,
      category: 'other',
      description: 'File annual accounts with Companies House (9 months after year end)',
      latePenalty: '£150-£1,500 depending on company size and delay',
      userTypes: ['company-director', 'both'],
      priority: 'high'
    },
    {
      id: 'paye-submission',
      title: 'PAYE Submission',
      date: `${currentYear}-${String(currentMonth + 2).padStart(2, '0')}-19`,
      category: 'paye',
      description: 'Monthly PAYE and National Insurance submission',
      latePenalty: '£100-£400 per month penalty',
      userTypes: ['company-director', 'both'],
      priority: 'high'
    },
    {
      id: 'vat-return',
      title: 'VAT Return (Quarterly)',
      date: `${currentMonth >= 9 ? currentYear + 1 : currentYear}-${String((Math.floor(currentMonth / 3) + 1) * 3 + 1).padStart(2, '0')}-07`,
      category: 'vat',
      description: 'Quarterly VAT return submission',
      latePenalty: '£200 default surcharge, escalating penalties',
      userTypes: ['company-director', 'both'],
      priority: 'medium'
    }
  ];
})();
