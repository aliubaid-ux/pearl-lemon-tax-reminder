
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeadlineTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  deadlines: string[];
  userTypes: string[];
  frequency: string;
}

const DeadlineTemplates: React.FC = () => {
  const { toast } = useToast();

  const templates: DeadlineTemplate[] = [
    {
      id: 'self-employed-essential',
      title: 'Self-Employed Essentials',
      description: 'Core deadlines for sole traders and freelancers',
      category: 'self-assessment',
      deadlines: ['Self Assessment Return', 'Payment on Account', 'Tax Payment'],
      userTypes: ['self-employed'],
      frequency: 'Annual'
    },
    {
      id: 'company-director-complete',
      title: 'Company Director Complete',
      description: 'All deadlines for limited company directors',
      category: 'corporation-tax',
      deadlines: ['Corporation Tax Return', 'PAYE Submissions', 'P11D Forms'],
      userTypes: ['company-director'],
      frequency: 'Various'
    },
    {
      id: 'vat-registered-quarterly',
      title: 'VAT Registered (Quarterly)',
      description: 'Quarterly VAT return deadlines',
      category: 'vat',
      deadlines: ['Q1 VAT Return', 'Q2 VAT Return', 'Q3 VAT Return', 'Q4 VAT Return'],
      userTypes: ['self-employed', 'company-director'],
      frequency: 'Quarterly'
    },
    {
      id: 'payroll-monthly',
      title: 'Monthly Payroll',
      description: 'Monthly PAYE and RTI submissions',
      category: 'paye',
      deadlines: ['PAYE Payment', 'RTI Submission', 'CIS Returns'],
      userTypes: ['company-director'],
      frequency: 'Monthly'
    }
  ];

  const handleDownloadTemplate = (template: DeadlineTemplate) => {
    // In a real app, this would generate and download a calendar file
    toast({
      title: 'Template Downloaded',
      description: `${template.title} calendar template has been prepared for download.`,
    });
  };

  const handleViewTemplate = (template: DeadlineTemplate) => {
    toast({
      title: 'Template Preview',
      description: `Showing preview for ${template.title} template.`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'self-assessment': return <FileText className="h-4 w-4" />;
      case 'corporation-tax': return <Calendar className="h-4 w-4" />;
      case 'vat': return <Clock className="h-4 w-4" />;
      case 'paye': return <AlertTriangle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'self-assessment': return 'bg-blue-100 text-blue-600';
      case 'corporation-tax': return 'bg-green-100 text-green-600';
      case 'vat': return 'bg-purple-100 text-purple-600';
      case 'paye': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Download className="h-5 w-5 text-purple-600" />
          </div>
          Deadline Templates
        </CardTitle>
        <p className="text-sm text-gray-600">
          Download pre-configured calendar templates for common tax scenarios
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card key={template.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(template.category)}`}>
                    {getCategoryIcon(template.category)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {template.frequency}
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{template.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-500">Includes:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.deadlines.slice(0, 3).map((deadline, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {deadline}
                      </Badge>
                    ))}
                    {template.deadlines.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.deadlines.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownloadTemplate(template)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewTemplate(template)}
                  >
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">Custom Templates</h5>
          <p className="text-sm text-gray-600 mb-3">
            Need a custom template for your specific business needs?
          </p>
          <Button variant="outline" size="sm">
            Request Custom Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeadlineTemplates;
