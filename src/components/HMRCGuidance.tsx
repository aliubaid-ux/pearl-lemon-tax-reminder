
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, FileText, Clock } from 'lucide-react';

interface GuidanceItem {
  reason: string;
  acceptanceRate: 'high' | 'medium' | 'low';
  documentation: string[];
  tips: string[];
}

const acceptedReasons: GuidanceItem[] = [
  {
    reason: 'Serious illness or hospitalization',
    acceptanceRate: 'high',
    documentation: ['Medical certificate', 'Hospital discharge papers', 'GP letter confirming incapacity'],
    tips: ['Must be for the specific period affecting deadline', 'Mental health conditions are accepted with proper documentation']
  },
  {
    reason: 'Death of close family member',
    acceptanceRate: 'high',
    documentation: ['Death certificate', 'Funeral director confirmation'],
    tips: ['Usually accepted for spouse, parent, child, or sibling', 'Allow reasonable time for bereavement']
  },
  {
    reason: 'Fire, flood, or theft affecting records',
    acceptanceRate: 'high',
    documentation: ['Police report', 'Insurance claim documents', 'Fire service report'],
    tips: ['Must show records were destroyed/stolen', 'Report incident immediately']
  },
  {
    reason: 'HMRC system technical failures',
    acceptanceRate: 'medium',
    documentation: ['Screenshots of error messages', 'System reference numbers', 'Multiple attempt evidence'],
    tips: ['Must try alternative methods (phone, agent)', 'Keep detailed logs of attempts']
  },
  {
    reason: 'Postal delays or strikes',
    acceptanceRate: 'medium',
    documentation: ['Proof of posting certificate', 'Postal receipt with date'],
    tips: ['Must post with reasonable time for delivery', 'Recorded delivery preferred']
  },
  {
    reason: 'Professional adviser failure',
    acceptanceRate: 'medium',
    documentation: ['Correspondence with adviser', 'Evidence of instructions given', 'Professional body complaints'],
    tips: ['Must show clear instruction to adviser', 'Take action against adviser']
  }
];

const commonRejections = [
  'Pressure of work or business commitments',
  'Lack of funds to pay tax',
  'Waiting for information that could have been requested earlier',
  'Computer breakdown without backup arrangements',
  'Forgot or overlooked the deadline',
  'Relying on reminder that never came'
];

const HMRCGuidance: React.FC = () => {
  const getAcceptanceIcon = (rate: string) => {
    switch (rate) {
      case 'high': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'low': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getAcceptanceColor = (rate: string) => {
    switch (rate) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            HMRC Accepted Reasons for Late Submission
          </CardTitle>
          <p className="text-sm text-gray-600">
            Based on HMRC guidance and historical acceptance rates
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {acceptedReasons.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    {getAcceptanceIcon(item.acceptanceRate)}
                    {item.reason}
                  </h3>
                  <Badge className={getAcceptanceColor(item.acceptanceRate)}>
                    {item.acceptanceRate} acceptance
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      Required Documentation
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.documentation.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Key Tips
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Commonly Rejected Reasons
          </CardTitle>
          <p className="text-sm text-gray-600">
            These reasons are typically not accepted by HMRC
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {commonRejections.map((reason, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded text-sm text-red-700">
                <XCircle className="h-3 w-3" />
                {reason}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HMRCGuidance;
