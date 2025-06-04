
import { TaxDeadline, UserType } from '@/types/tax';

export const getAllTaxDeadlines = (): TaxDeadline[] => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  return [
    // Self Assessment Deadlines
    {
      id: 'sa-paper-deadline',
      title: 'Self Assessment Paper Return',
      description: 'Deadline for submitting paper self assessment tax returns',
      date: `${nextYear}-10-31`,
      category: 'self-assessment',
      userTypes: ['self-employed'],
      preparationStart: `${nextYear}-09-01`,
      preparationTips: 'Gather all income records, expenses, and receipts. Consider switching to online submission for later deadline.',
      latePenalty: '£100 immediate penalty, then £10/day after 3 months (max £900), then 5% of tax owed after 6 months',
      lateSubmissionGuidance: 'You can still submit late but penalties apply immediately. Switch to online for extra time.',
      maxLateSubmissionDays: 365,
      priority: 'high'
    },
    {
      id: 'sa-online-deadline',
      title: 'Self Assessment Online Return',
      description: 'Deadline for submitting online self assessment tax returns',
      date: `${nextYear}-01-31`,
      category: 'self-assessment',
      userTypes: ['self-employed'],
      preparationStart: `${nextYear}-01-01`,
      preparationTips: 'Use HMRC online services or accounting software. Ensure you have your UTR number and Government Gateway details.',
      latePenalty: '£100 immediate penalty, then £10/day after 3 months (max £900), then 5% of tax owed after 6 months',
      lateSubmissionGuidance: 'Submit as soon as possible to minimize penalties. Contact HMRC if you have reasonable excuse.',
      maxLateSubmissionDays: 365,
      priority: 'high'
    },
    {
      id: 'sa-payment-deadline',
      title: 'Self Assessment Tax Payment',
      description: 'Deadline for paying self assessment tax owed',
      date: `${nextYear}-01-31`,
      category: 'self-assessment',
      userTypes: ['self-employed'],
      preparationStart: `${nextYear}-01-15`,
      preparationTips: 'Set up Direct Debit or make payment online. Consider payment on account for next year.',
      latePenalty: '5% of unpaid tax immediately, then 5% after 6 months, then 5% after 12 months',
      lateSubmissionGuidance: 'Interest charged daily on late payments. Set up payment plan if you cannot pay in full.',
      maxLateSubmissionDays: 30,
      priority: 'high'
    },
    {
      id: 'sa-poa-deadline',
      title: 'Payment on Account (1st)',
      description: 'First payment on account for next year\'s tax',
      date: `${nextYear}-01-31`,
      category: 'self-assessment',
      userTypes: ['self-employed'],
      preparationStart: `${nextYear}-01-15`,
      preparationTips: 'Usually 50% of last year\'s tax bill. You can reduce if you expect lower income.',
      latePenalty: '5% of unpaid amount immediately, then 5% after 6 months',
      lateSubmissionGuidance: 'Contact HMRC to discuss payment plans if struggling to pay.',
      maxLateSubmissionDays: 30,
      priority: 'medium'
    },
    {
      id: 'sa-poa2-deadline',
      title: 'Payment on Account (2nd)',
      description: 'Second payment on account for current year\'s tax',
      date: `${currentYear}-07-31`,
      category: 'self-assessment',
      userTypes: ['self-employed'],
      preparationStart: `${currentYear}-07-15`,
      preparationTips: 'Second 50% payment. Review if reduction needed based on current year income.',
      latePenalty: '5% of unpaid amount immediately, then 5% after 6 months',
      lateSubmissionGuidance: 'Set up Direct Debit to avoid missing future payments.',
      maxLateSubmissionDays: 30,
      priority: 'medium'
    },

    // Corporation Tax Deadlines
    {
      id: 'ct-return-deadline',
      title: 'Corporation Tax Return',
      description: 'Deadline for submitting Corporation Tax return (CT600)',
      date: `${nextYear}-12-31`,
      category: 'corporation-tax',
      userTypes: ['company-director'],
      preparationStart: `${nextYear}-11-01`,
      preparationTips: 'Prepare annual accounts first. Use HMRC online services or accounting software.',
      latePenalty: '£100 for up to 3 months late, then £200 for up to 6 months, then £500',
      lateSubmissionGuidance: 'Submit immediately to avoid escalating penalties. Contact HMRC if you need more time.',
      maxLateSubmissionDays: 365,
      priority: 'high'
    },
    {
      id: 'ct-payment-deadline',
      title: 'Corporation Tax Payment',
      description: 'Deadline for paying Corporation Tax owed',
      date: `${nextYear}-09-30`,
      category: 'corporation-tax',
      userTypes: ['company-director'],
      preparationStart: `${nextYear}-09-15`,
      preparationTips: 'Calculate tax owed based on company profits. Set up Direct Debit for automatic payment.',
      latePenalty: 'Interest charged from day after due date at Bank of England base rate + 2.5%',
      lateSubmissionGuidance: 'Pay as soon as possible to minimize interest. Contact HMRC for payment plans.',
      maxLateSubmissionDays: 90,
      priority: 'high'
    },

    // VAT Deadlines (Quarterly)
    {
      id: 'vat-q1-deadline',
      title: 'VAT Return - Q1',
      description: 'VAT return and payment for Q1 (Jan-Mar)',
      date: `${currentYear}-05-07`,
      category: 'vat',
      userTypes: ['self-employed', 'company-director'],
      preparationStart: `${currentYear}-04-20`,
      preparationTips: 'Gather all sales and purchase invoices. Use VAT software or HMRC online.',
      latePenalty: 'Default surcharge of 2% for first default, increasing to 15% for subsequent defaults',
      lateSubmissionGuidance: 'Submit within 7 days to avoid surcharge. Contact HMRC if you have problems.',
      maxLateSubmissionDays: 7,
      priority: 'high'
    },
    {
      id: 'vat-q2-deadline',
      title: 'VAT Return - Q2',
      description: 'VAT return and payment for Q2 (Apr-Jun)',
      date: `${currentYear}-08-07`,
      category: 'vat',
      userTypes: ['self-employed', 'company-director'],
      preparationStart: `${currentYear}-07-20`,
      preparationTips: 'Ensure all Q2 transactions are recorded. Check for any input VAT claims.',
      latePenalty: 'Default surcharge of 2% for first default, increasing to 15% for subsequent defaults',
      lateSubmissionGuidance: 'Pay electronically for same-day processing. Paper submissions take 3 working days.',
      maxLateSubmissionDays: 7,
      priority: 'high'
    },
    {
      id: 'vat-q3-deadline',
      title: 'VAT Return - Q3',
      description: 'VAT return and payment for Q3 (Jul-Sep)',
      date: `${currentYear}-11-07`,
      category: 'vat',
      userTypes: ['self-employed', 'company-director'],
      preparationStart: `${currentYear}-10-20`,
      preparationTips: 'Review quarterly sales and expenses. Ensure VAT registration details are current.',
      latePenalty: 'Default surcharge of 2% for first default, increasing to 15% for subsequent defaults',
      lateSubmissionGuidance: 'Use Direct Debit to ensure payments are made on time automatically.',
      maxLateSubmissionDays: 7,
      priority: 'high'
    },
    {
      id: 'vat-q4-deadline',
      title: 'VAT Return - Q4',
      description: 'VAT return and payment for Q4 (Oct-Dec)',
      date: `${nextYear}-02-07`,
      category: 'vat',
      userTypes: ['self-employed', 'company-director'],
      preparationStart: `${nextYear}-01-20`,
      preparationTips: 'Final quarter of the year - ensure all end-of-year adjustments are included.',
      latePenalty: 'Default surcharge of 2% for first default, increasing to 15% for subsequent defaults',
      lateSubmissionGuidance: 'Consider switching to monthly returns if you regularly receive VAT refunds.',
      maxLateSubmissionDays: 7,
      priority: 'high'
    },

    // PAYE Deadlines (Monthly)
    {
      id: 'paye-monthly',
      title: 'PAYE & NIC Payment',
      description: 'Monthly PAYE and National Insurance contributions',
      date: `${currentYear}-${String(new Date().getMonth() + 2).padStart(2, '0')}-19`,
      category: 'paye',
      userTypes: ['company-director'],
      preparationStart: `${currentYear}-${String(new Date().getMonth() + 2).padStart(2, '0')}-10`,
      preparationTips: 'Submit FPS (Full Payment Submission) before or on payday. Use payroll software.',
      latePenalty: '£100-£400 per month depending on number of employees, plus interest',
      lateSubmissionGuidance: 'Submit RTI return immediately. Contact HMRC if you cannot pay in full.',
      maxLateSubmissionDays: 14,
      priority: 'high'
    },

    // Annual deadlines
    {
      id: 'p11d-deadline',
      title: 'P11D Forms',
      description: 'P11D forms for employee benefits and expenses',
      date: `${currentYear}-07-06`,
      category: 'paye',
      userTypes: ['company-director'],
      preparationStart: `${currentYear}-06-01`,
      preparationTips: 'List all employee benefits like company cars, medical insurance, loans.',
      latePenalty: '£100 per 50 employees per month late, minimum £100',
      lateSubmissionGuidance: 'Submit online for automatic copy to employees.',
      maxLateSubmissionDays: 30,
      priority: 'medium'
    }
  ];
};

export const getTaxDeadlines = (userType: UserType): TaxDeadline[] => {
  const allDeadlines = getAllTaxDeadlines();
  
  if (userType === 'both') {
    return allDeadlines;
  }
  
  return allDeadlines.filter(deadline => 
    deadline.userTypes.includes(userType as 'self-employed' | 'company-director')
  );
};
