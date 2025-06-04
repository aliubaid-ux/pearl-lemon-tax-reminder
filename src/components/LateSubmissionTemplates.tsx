
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Copy, FileText, AlertCircle, CheckCircle, Info, Download, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  title: string;
  scenario: string;
  template: string;
  acceptanceRate: 'high' | 'medium' | 'low';
  requiredDocs: string[];
  tips: string[];
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
    requiredDocs: ['Medical certificate', 'Hospital discharge papers', 'GP letter'],
    tips: [
      'Submit as soon as you\'re able to work',
      'Include specific dates of illness',
      'Attach all medical documentation',
      'Be honest about your condition'
    ]
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
    requiredDocs: ['Death certificate', 'Funeral director letter'],
    tips: [
      'Submit within reasonable time after bereavement',
      'Specify your relationship to the deceased',
      'Include death certificate',
      'Mention impact on your ability to work'
    ]
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
    requiredDocs: ['Screenshots of errors', 'System reference numbers', 'Browser/system details'],
    tips: [
      'Document all error messages',
      'Try multiple browsers and devices',
      'Keep screenshots as evidence',
      'Note exact times of attempts'
    ]
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
    requiredDocs: ['Proof of posting certificate', 'Postal receipt'],
    tips: [
      'Always use recorded delivery',
      'Keep proof of posting',
      'Post well before deadline',
      'Consider online submission as backup'
    ]
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
      description: "Template copied successfully. You can now paste it into your appeal letter.",
    });
  };

  const downloadTemplate = () => {
    const blob = new Blob([customizedTemplate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `late-submission-appeal-${selectedTemplate?.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Template downloaded as text file.",
    });
  };

  const getAcceptanceColor = (rate: Template['acceptanceRate']) => {
    switch (rate) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getSuccessIcon = (rate: Template['acceptanceRate']) => {
    switch (rate) {
      case 'high': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'low': return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Late Submission Appeal Templates</h1>
        <p className="text-gray-600">Professional templates to help you appeal late filing penalties</p>
      </div>

      {/* Instructions Card */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Info className="h-5 w-5" />
            How to Use These Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Choose the template that best matches your situation</li>
            <li>Review the required documentation you'll need</li>
            <li>Customize the template with your specific details</li>
            <li>Gather all supporting documents</li>
            <li>Submit your appeal through HMRC's online portal or by post</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
            <p className="text-sm font-medium">💡 Pro Tip: Submit your appeal as soon as possible after the deadline - delays reduce your chances of success.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
              selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500 border-blue-300' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  {template.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getSuccessIcon(template.acceptanceRate)}
                  <Badge className={`${getAcceptanceColor(template.acceptanceRate)} border`}>
                    {template.acceptanceRate} success rate
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600">{template.scenario}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Required Documentation:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {template.requiredDocs.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Success Tips:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {template.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1 text-xs">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedTemplate?.id === template.id && (
                <Badge variant="default" className="w-full justify-center py-2">
                  ✓ Template Selected
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTemplate && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Template: {selectedTemplate.title}
            </CardTitle>
            <p className="text-sm text-gray-600">
              Customize the template below with your specific details. Replace all items in [BRACKETS] with your information.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 p-4 rounded border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">Before You Start:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• Replace [Your Name] with your full name</li>
                <li>• Replace [UTR/Company Number] with your actual reference</li>
                <li>• Replace [DATE] and [YEAR] with specific dates</li>
                <li>• Replace [Self Assessment/Corporation Tax Return] with the correct form type</li>
                <li>• Add specific details about your situation</li>
              </ul>
            </div>

            <Textarea
              value={customizedTemplate}
              onChange={(e) => setCustomizedTemplate(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Template will appear here..."
            />
            
            <div className="flex gap-3">
              <Button onClick={copyToClipboard} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy Template
              </Button>
              <Button onClick={downloadTemplate} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Next Steps:</h4>
              <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                <li>Gather all required supporting documents</li>
                <li>Submit via HMRC's online appeal service or by post</li>
                <li>Keep copies of everything you send</li>
                <li>Follow up if you don't receive a response within 45 days</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Help Section */}
      <Card className="mt-8 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-900">Need Professional Help?</CardTitle>
        </CardHeader>
        <CardContent className="text-purple-800">
          <p className="mb-4">If your situation is complex or you're facing significant penalties, consider getting professional advice:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-medium mb-1">Tax Advisors</h4>
              <p className="text-sm">Specialized knowledge of HMRC procedures and appeal processes</p>
            </div>
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-medium mb-1">Chartered Accountants</h4>
              <p className="text-sm">Professional representation and comprehensive tax advice</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LateSubmissionTemplates;
