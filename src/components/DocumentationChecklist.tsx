
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import DocumentItem from './documentation/DocumentItem';

const documents = [
  {
    title: 'P60 (End of year certificate)',
    description: 'Shows total pay and tax for the tax year',
    priority: 'high' as const,
    category: 'Employment'
  },
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
    title: 'Dividend vouchers',
    description: 'Details of any dividends received',
    priority: 'medium' as const,
    category: 'Investment'
  }
];

const DocumentationChecklist: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documentation Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <DocumentItem
              key={index}
              title={doc.title}
              description={doc.description}
              priority={doc.priority}
              category={doc.category}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationChecklist;
