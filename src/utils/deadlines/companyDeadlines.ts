
import { TaxDeadline } from '@/types/tax';

export const companyDeadlines: TaxDeadline[] = [
  {
    id: 'ct600',
    title: 'Corporation Tax Return (CT600)',
    date: '2024-12-31',
    type: 'filing',
    description: 'Submit Corporation Tax return',
    penalty: '£100-£1,000 depending on company size',
    userTypes: ['company-director', 'both']
  },
  {
    id: 'ct-payment',
    title: 'Corporation Tax Payment',
    date: '2024-09-30',
    type: 'payment',
    description: 'Pay Corporation Tax for previous accounting period',
    penalty: 'Interest charged on late payments',
    userTypes: ['company-director', 'both']
  },
  {
    id: 'confirmation',
    title: 'Confirmation Statement',
    date: '2024-08-15',
    type: 'filing',
    description: 'Annual confirmation statement to Companies House',
    penalty: '£150 late filing penalty',
    userTypes: ['company-director', 'both']
  }
];
