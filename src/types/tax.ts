
export interface TaxDeadline {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  latePenalty?: string;
  userTypes: string[];
  priority: 'high' | 'medium' | 'low';
  preparationStart?: string;
  preparationTips?: string;
  lateSubmissionGuidance?: string;
  requiredDocuments?: string[];
  estimatedTime?: string;
  hmrcLink?: string;
  dependencies?: string[];
  relatedDeadlines?: string[];
  quickWins?: string[];
}

export interface UserProfile {
  userType: 'self-employed' | 'company-director' | 'both';
  businessName?: string;
  accountingYearEnd?: string;
  vatRegistered?: boolean;
  employeeCount?: number;
  preferences: {
    reminderDays: number[];
    emailReminders: boolean;
    smsReminders: boolean;
  };
}

export interface TaxCalculation {
  grossIncome: number;
  allowableExpenses: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  totalTax: number;
}

export interface VATReturn {
  period: string;
  sales: number;
  purchases: number;
  vatOnSales: number;
  vatOnPurchases: number;
  netVat: number;
  dueDate: string;
}

export interface PenaltyCalculation {
  type: string;
  daysLate: number;
  taxAmount: number;
  penaltyAmount: number;
  interestAmount: number;
  totalAmount: number;
}

export interface DocumentChecklist {
  category: string;
  documents: {
    name: string;
    required: boolean;
    completed: boolean;
    description: string;
  }[];
}
