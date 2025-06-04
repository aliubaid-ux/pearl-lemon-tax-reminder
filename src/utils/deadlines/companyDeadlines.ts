
import { TaxDeadline } from '@/types/tax';

export const companyDeadlines: TaxDeadline[] = [
  {
    id: 'ct600',
    title: 'Corporation Tax Return (CT600)',
    date: '2024-12-31',
    category: 'corporation-tax',
    description: 'Submit Corporation Tax return',
    latePenalty: '£100-£1,000 depending on company size',
    userTypes: ['company-director', 'both'],
    priority: 'high'
  },
  {
    id: 'ct-payment',
    title: 'Corporation Tax Payment',
    date: '2024-09-30',
    category: 'corporation-tax',
    description: 'Pay Corporation Tax for previous accounting period',
    latePenalty: 'Interest charged on late payments',
    userTypes: ['company-director', 'both'],
    priority: 'high'
  },
  {
    id: 'confirmation',
    title: 'Confirmation Statement',
    date: '2024-08-15',
    category: 'other',
    description: 'Annual confirmation statement to Companies House',
    latePenalty: '£150 late filing penalty',
    userTypes: ['company-director', 'both'],
    priority: 'medium'
  }
];
