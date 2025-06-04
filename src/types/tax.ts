
export interface TaxDeadline {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'self-assessment' | 'corporation-tax' | 'vat' | 'paye' | 'cis' | 'other';
  userTypes: ('self-employed' | 'company-director')[];
  preparationStart?: string;
  preparationTips?: string;
  latePenalty?: string;
  lateSubmissionGuidance?: string;
  maxLateSubmissionDays?: number;
  priority: 'high' | 'medium' | 'low';
}

export type UserType = 'self-employed' | 'company-director' | 'both';
