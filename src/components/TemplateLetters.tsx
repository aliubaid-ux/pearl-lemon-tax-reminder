
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Download, FileText } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  purpose: string;
  template: string;
  fields: string[];
}

const TemplateLetters: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const templates: Template[] = [
    {
      id: 'penalty-appeal',
      title: 'Penalty Appeal Letter',
      purpose: 'Appeal against late filing penalties',
      fields: ['Your Name', 'Your Address', 'Tax Reference', 'Penalty Amount', 'Reason for Delay'],
      template: `Dear HMRC,

RE: Appeal against penalty for late filing - Tax Reference: [Tax Reference]

I am writing to formally appeal against the penalty of £[Penalty Amount] imposed for the late filing of my tax return.

I believe this penalty should be cancelled due to the following reasonable excuse:

[Reason for Delay]

I have now filed the outstanding return and am up to date with all my tax obligations. I would be grateful if you could review this case and cancel the penalty.

I look forward to your response.

Yours faithfully,

[Your Name]
[Your Address]`
    },
    {
      id: 'payment-plan',
      title: 'Payment Plan Request',
      purpose: 'Request a time to pay arrangement',
      fields: ['Your Name', 'Your Address', 'Tax Reference', 'Amount Owed', 'Proposed Monthly Payment', 'Financial Circumstances'],
      template: `Dear HMRC,

RE: Request for Time to Pay Arrangement - Tax Reference: [Tax Reference]

I am writing to request a time to pay arrangement for my outstanding tax bill of £[Amount Owed].

Due to [Financial Circumstances], I am currently unable to pay the full amount immediately. However, I can afford to pay £[Proposed Monthly Payment] per month.

I am committed to clearing this debt and maintaining future tax payments on time. Please could you consider setting up a payment plan to help me manage this situation.

I would be grateful for your consideration of this request.

Yours faithfully,

[Your Name]
[Your Address]`
    },
    {
      id: 'late-filing-excuse',
      title: 'Reasonable Excuse Letter',
      purpose: 'Explain circumstances for late filing',
      fields: ['Your Name', 'Your Address', 'Tax Reference', 'Filing Date', 'Excuse Details'],
      template: `Dear HMRC,

RE: Explanation for Late Filing - Tax Reference: [Tax Reference]

I am writing to explain the circumstances that led to the late filing of my tax return on [Filing Date].

The delay was due to the following reasonable excuse:

[Excuse Details]

I take my tax obligations seriously and this delay was entirely beyond my control. I have now filed the return and taken steps to ensure this situation does not arise again.

I would be grateful if you could take these circumstances into account when considering any penalties.

Yours faithfully,

[Your Name]
[Your Address]`
    }
  ];

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const generateLetter = () => {
    if (!selectedTemplateData) return '';
    
    let letter = selectedTemplateData.template;
    selectedTemplateData.fields.forEach(field => {
      const value = formData[field] || `[${field}]`;
      letter = letter.replace(new RegExp(`\\[${field}\\]`, 'g'), value);
    });
    
    return letter;
  };

  const copyToClipboard = () => {
    const letter = generateLetter();
    navigator.clipboard.writeText(letter);
  };

  const downloadLetter = () => {
    const letter = generateLetter();
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplateData?.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Template Letters
        </CardTitle>
        <p className="text-sm text-gray-600">
          Professional templates for common HMRC correspondence
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Template Type</Label>
          <div className="grid gap-2 mt-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{template.title}</h4>
                    <p className="text-sm text-gray-600">{template.purpose}</p>
                  </div>
                  <Badge variant="outline">
                    {template.fields.length} fields
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedTemplateData && (
          <div className="space-y-4">
            <div className="grid gap-3">
              {selectedTemplateData.fields.map((field) => (
                <div key={field}>
                  <Label htmlFor={field}>{field}</Label>
                  <Input
                    id={field}
                    value={formData[field] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [field]: e.target.value
                    }))}
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <Label>Generated Letter</Label>
              <Textarea
                value={generateLetter()}
                readOnly
                className="mt-2 min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={copyToClipboard} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button onClick={downloadLetter} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateLetters;
