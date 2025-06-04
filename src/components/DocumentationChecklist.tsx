
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Download, AlertTriangle } from 'lucide-react';

interface DocumentCategory {
  title: string;
  description: string;
  items: {
    name: string;
    required: boolean;
    description: string;
    tips?: string;
  }[];
}

const documentationCategories: DocumentCategory[] = [
  {
    title: 'Personal Information',
    description: 'Basic identification and contact details',
    items: [
      {
        name: 'Copy of passport or driving licence',
        required: true,
        description: 'Photo ID to confirm identity'
      },
      {
        name: 'Proof of address (utility bill, bank statement)',
        required: true,
        description: 'Dated within last 3 months'
      },
      {
        name: 'National Insurance number',
        required: true,
        description: 'Usually on P60, P45, or payslip'
      }
    ]
  },
  {
    title: 'Income Documentation',
    description: 'All sources of income for the tax year',
    items: [
      {
        name: 'P60 (if employed)',
        required: true,
        description: 'Annual tax certificate from employer',
        tips: 'Contact employer if lost - they must provide a copy'
      },
      {
        name: 'P45 (if changed jobs)',
        required: true,
        description: 'Shows tax paid when leaving employment'
      },
      {
        name: 'Payslips (full year)',
        required: false,
        description: 'Backup if P60/P45 unavailable',
        tips: 'Keep all payslips until after tax return submitted'
      },
      {
        name: 'Bank statements showing interest',
        required: true,
        description: 'All accounts with interest earned'
      },
      {
        name: 'Dividend certificates',
        required: true,
        description: 'From any shares or investments held'
      }
    ]
  },
  {
    title: 'Self-Employment Records',
    description: 'For those with self-employment income',
    items: [
      {
        name: 'Business income records',
        required: true,
        description: 'Sales invoices, receipts, cash book'
      },
      {
        name: 'Business expense receipts',
        required: true,
        description: 'All allowable business expenses',
        tips: 'Keep receipts for 5 years after filing'
      },
      {
        name: 'Mileage log (if claiming)',
        required: false,
        description: 'Business travel records with purpose'
      },
      {
        name: 'Home office expenses',
        required: false,
        description: 'Utility bills, mortgage/rent if claiming home office'
      }
    ]
  },
  {
    title: 'Allowable Deductions',
    description: 'Evidence for any deductions claimed',
    items: [
      {
        name: 'Pension contribution statements',
        required: true,
        description: 'Personal pension payments made'
      },
      {
        name: 'Charitable donation receipts',
        required: true,
        description: 'Gift Aid eligible donations'
      },
      {
        name: 'Professional fees receipts',
        required: false,
        description: 'Subscriptions to professional bodies'
      },
      {
        name: 'Training course certificates/receipts',
        required: false,
        description: 'Work-related training and development'
      }
    ]
  }
];

const DocumentationChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleItemCheck = (itemKey: string, checked: boolean) => {
    const newChecked = new Set(checkedItems);
    if (checked) {
      newChecked.add(itemKey);
    } else {
      newChecked.delete(itemKey);
    }
    setCheckedItems(newChecked);
  };

  const getCompletionStats = () => {
    const totalRequired = documentationCategories.reduce(
      (total, category) => total + category.items.filter(item => item.required).length,
      0
    );
    const completedRequired = documentationCategories.reduce(
      (total, category) => 
        total + category.items.filter(item => 
          item.required && checkedItems.has(`${category.title}-${item.name}`)
        ).length,
      0
    );
    return { totalRequired, completedRequired };
  };

  const { totalRequired, completedRequired } = getCompletionStats();
  const completionPercentage = totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Documentation Checklist
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Ensure you have all required documents before submitting
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-600">
                {completedRequired}/{totalRequired} required items
              </div>
            </div>
          </div>
          {completionPercentage < 100 && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-700">
                You're missing {totalRequired - completedRequired} required document(s)
              </span>
            </div>
          )}
        </CardHeader>
      </Card>

      {documentationCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="text-lg">{category.title}</CardTitle>
            <p className="text-sm text-gray-600">{category.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => {
                const itemKey = `${category.title}-${item.name}`;
                const isChecked = checkedItems.has(itemKey);
                
                return (
                  <div key={itemIndex} className="flex items-start space-x-3 p-3 rounded-lg border bg-gray-50/50">
                    <Checkbox
                      id={itemKey}
                      checked={isChecked}
                      onCheckedChange={(checked) => handleItemCheck(itemKey, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <label 
                          htmlFor={itemKey} 
                          className={`font-medium cursor-pointer ${isChecked ? 'line-through text-gray-500' : ''}`}
                        >
                          {item.name}
                        </label>
                        {item.required && (
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      {item.tips && (
                        <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                          💡 Tip: {item.tips}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentationChecklist;
