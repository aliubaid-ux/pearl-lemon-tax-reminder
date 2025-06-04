import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import DocumentItem from './documentation/DocumentItem';

const documents = [
  // Employment Documents
  {
    title: 'P60 (End of year certificate)',
    description: 'Shows total pay and tax for the tax year',
    priority: 'high' as const,
    category: 'Employment'
  },
  {
    title: 'P45 (Leaving certificate)',
    description: 'Details of pay and tax when you leave a job',
    priority: 'high' as const,
    category: 'Employment'
  },
  {
    title: 'P11D (Benefits in kind)',
    description: 'Company benefits like car, medical insurance, etc.',
    priority: 'medium' as const,
    category: 'Employment'
  },
  {
    title: 'Payslips',
    description: 'All payslips for the tax year',
    priority: 'medium' as const,
    category: 'Employment'
  },
  
  // Business Documents
  {
    title: 'Bank statements',
    description: 'All business bank statements for the tax year',
    priority: 'high' as const,
    category: 'Business'
  },
  {
    title: 'Receipts and invoices',
    description: 'All business expenses and income records',
    priority: 'high' as const,
    category: 'Business'
  },
  {
    title: 'Mileage log',
    description: 'Business travel records with dates and purposes',
    priority: 'medium' as const,
    category: 'Business'
  },
  {
    title: 'Office expenses',
    description: 'Working from home costs, office supplies, utilities',
    priority: 'medium' as const,
    category: 'Business'
  },
  {
    title: 'Professional fees',
    description: 'Accountant, solicitor, professional memberships',
    priority: 'medium' as const,
    category: 'Business'
  },
  {
    title: 'Equipment purchases',
    description: 'Computers, phones, tools, capital allowances items',
    priority: 'medium' as const,
    category: 'Business'
  },
  
  // Investment Documents
  {
    title: 'Dividend vouchers',
    description: 'Details of any dividends received',
    priority: 'medium' as const,
    category: 'Investment'
  },
  {
    title: 'Share dealing records',
    description: 'Buy/sell transactions, capital gains/losses',
    priority: 'medium' as const,
    category: 'Investment'
  },
  {
    title: 'Interest statements',
    description: 'Bank and building society interest earned',
    priority: 'low' as const,
    category: 'Investment'
  },
  
  // Property Documents
  {
    title: 'Rental income records',
    description: 'Rent received, letting agent statements',
    priority: 'high' as const,
    category: 'Property'
  },
  {
    title: 'Property expenses',
    description: 'Repairs, maintenance, letting fees, insurance',
    priority: 'high' as const,
    category: 'Property'
  },
  {
    title: 'Mortgage interest statements',
    description: 'Buy-to-let mortgage interest payments',
    priority: 'medium' as const,
    category: 'Property'
  },
  
  // Pension Documents
  {
    title: 'Pension contributions',
    description: 'Personal and employer pension payments',
    priority: 'medium' as const,
    category: 'Pension'
  },
  {
    title: 'Pension income',
    description: 'State pension, private pension payments received',
    priority: 'high' as const,
    category: 'Pension'
  },
  
  // Other Documents
  {
    title: 'Gift Aid donations',
    description: 'Charitable donations with Gift Aid declarations',
    priority: 'low' as const,
    category: 'Other'
  },
  {
    title: 'Student loan repayments',
    description: 'Details of student loan deductions',
    priority: 'low' as const,
    category: 'Other'
  },
  {
    title: 'Medical expenses',
    description: 'Private medical insurance, dental costs',
    priority: 'low' as const,
    category: 'Other'
  }
];

const DocumentationChecklist: React.FC = () => {
  const categories = ['Employment', 'Business', 'Investment', 'Property', 'Pension', 'Other'];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6" />
              Complete Documentation Checklist
            </CardTitle>
            <p className="text-gray-600">
              Comprehensive list of documents needed for your tax return
            </p>
          </CardHeader>
          <CardContent>
            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
                  {category} Documents
                </h3>
                <div className="space-y-3">
                  {documents
                    .filter(doc => doc.category === category)
                    .map((doc, index) => (
                      <DocumentItem
                        key={`${category}-${index}`}
                        title={doc.title}
                        description={doc.description}
                        priority={doc.priority}
                        category={doc.category}
                      />
                    ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentationChecklist;
