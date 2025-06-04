
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  title: string;
  scenario: string;
  template: string;
  acceptanceRate: 'high' | 'medium' | 'low';
  requiredDocs: string[];
}

const templates: Template[] = [
  {
    id: 'illness',
    title: 'Personal Illness',
    scenario: 'Unable to complete submission due to serious illness',
    template: `Dear HMRC,

I am writing to request consideration for the late submission of my [Self Assessment/Corporation Tax Return] for the tax year [YEAR].

Due to a serious illness that began on [DATE], I was unable to complete my tax return by the deadline. I have been under medical care and was physically unable to gather the necessary documentation and complete the return.

I have now recovered sufficiently to complete my obligations and have enclosed/submitted the required return along with supporting medical documentation.

I respectfully request that any late filing penalties be waived given the exceptional circumstances outlined above.

Yours sincerely,
[Your Name]
[UTR/Company Number]`,
    acceptanceRate: 'high',
    requiredDocs: ['Medical certificate', 'Hospital discharge papers', 'GP letter']
  },
  {
    id: 'bereavement',
    title: 'Family Bereavement',
    scenario: 'Death of close family member affecting ability to file',
    template: `Dear HMRC,

I am writing regarding the late submission of my [Self Assessment/Corporation Tax Return] for the tax year [YEAR].

Unfortunately, I experienced the death of my [relationship] on [DATE], which significantly impacted my ability to focus on administrative matters including my tax obligations. The period following this bereavement involved funeral arrangements, estate matters, and significant emotional distress.

I have now been able to complete my tax return and submit all required information. I respectfully request consideration for waiving late filing penalties given these exceptional circumstances.

I have enclosed a copy of the death certificate as supporting documentation.

Yours sincerely,
[Your Name]
[UTR/Company Number]`,
    acceptanceRate: 'high',
    requiredDocs: ['Death certificate', 'Funeral director letter']
  },
  {
    id: 'technical',
    title: 'Technical Issues',
    scenario: 'Website problems or system failures preventing submission',
    template: `Dear HMRC,

I am writing to explain the circumstances surrounding the late submission of my [Self Assessment/Corporation Tax Return] for the tax year [YEAR].

Despite multiple attempts to submit my return before the deadline, I encountered persistent technical difficulties with the HMRC online system. I attempted to submit on [DATES] but received error messages preventing completion.

I have screenshots/reference numbers documenting these technical issues: [REFERENCE NUMBERS]. I eventually managed to submit successfully on [DATE] when the technical issues were resolved.

I respectfully request that late filing penalties be waived as the delay was due to technical issues beyond my control.

Yours sincerely,
[Your Name]
[UTR/Company Number]`,
    acceptanceRate: 'medium',
    requiredDocs: ['Screenshots of errors', 'System reference numbers', 'Browser/system details']
  },
  {
    id: 'postal',
    title: 'Postal Delays',
    scenario: 'Documents delayed in post affecting deadline',
    template: `Dear HMRC,

I am writing regarding my late [Self Assessment/Corporation Tax Return] submission for the tax year [YEAR].

I submitted my return by post on [DATE], which should have allowed sufficient time for delivery before the deadline. However, due to postal delays/strikes, my return was not received by HMRC until [DATE].

I have retained proof of posting dated [DATE] and can provide this as evidence that I took reasonable steps to meet the deadline.

I respectfully request that late filing penalties be waived as the delay was due to circumstances beyond my control.

Yours sincerely,
[Your Name]
[UTR/Company Number]`,
    acceptanceRate: 'medium',
    requiredDocs: ['Proof of posting certificate', 'Postal receipt']
  }
];

const LateSubmissionTemplates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [customizedTemplate, setCustomizedTemplate] = useState('');
  const { toast } = useToast();

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCustomizedTemplate(template.template);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(customizedTemplate);
    toast({
      title: "Copied to clipboard",
      description: "Template copied successfully",
    });
  };

  const getAcceptanceColor = (rate: Template['acceptanceRate']) => {
    switch (rate) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <Badge className={getAcceptanceColor(template.acceptanceRate)}>
                  {template.acceptanceRate} success rate
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{template.scenario}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">Required Documentation:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {template.requiredDocs.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTemplate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Template: {selectedTemplate.title}
            </CardTitle>
            <p className="text-sm text-gray-600">
              Customize the template below with your specific details
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={customizedTemplate}
              onChange={(e) => setCustomizedTemplate(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
              placeholder="Template will appear here..."
            />
            <div className="flex gap-2">
              <Button onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LateSubmissionTemplates;
