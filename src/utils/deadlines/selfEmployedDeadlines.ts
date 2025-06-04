
import { TaxDeadline } from '@/types/tax';

export const selfEmployedDeadlines: TaxDeadline[] = [
  {
    id: 'sa-register',
    title: 'Register for Self Assessment',
    date: '2024-10-05',
    category: 'self-assessment',
    description: 'Register for Self Assessment if you started self-employment',
    latePenalty: '£100 late registration penalty',
    userTypes: ['self-employed', 'both'],
    priority: 'high'
  },
  {
    id: 'sa-return',
    title: 'Self Assessment Return',
    date: '2025-01-31',
    category: 'self-assessment',
    description: 'Submit your Self Assessment return online',
    latePenalty: '£100 immediate penalty, then £10 per day',
    userTypes: ['self-employed', 'both'],
    priority: 'high'
  },
  {
    id: 'sa-payment',
    title: 'Self Assessment Payment',
    date: '2025-01-31',
    category: 'self-assessment',
    description: 'Pay any tax owed for the previous tax year',
    latePenalty: 'Interest charged on late payments',
    userTypes: ['self-employed', 'both'],
    priority: 'high'
  },
  {
    id: 'poa-july',
    title: 'Payment on Account (1st)',
    date: '2024-07-31',
    category: 'self-assessment',
    description: 'First payment on account for current tax year',
    latePenalty: 'Interest charged on late payments',
    userTypes: ['self-employed', 'both'],
    priority: 'medium'
  }
];
