
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Phone, 
  Clock, 
  MessageSquare, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar
} from 'lucide-react';

interface ContactOption {
  method: string;
  waitTime: string;
  bestFor: string[];
  availability: string;
  tips: string[];
  phone?: string;
  website?: string;
}

const HMRCSupportGuide: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<string>('');

  const contactOptions: ContactOption[] = [
    {
      method: 'Self Assessment Helpline',
      waitTime: '10-30 minutes (peak times)',
      bestFor: ['Registration queries', 'Filing deadlines', 'Payment issues', 'UTR number problems'],
      availability: 'Mon-Fri 8am-6pm, Sat 8am-4pm',
      phone: '0300 200 3310',
      tips: [
        'Call early morning (8-9am) for shortest waits',
        'Have your National Insurance number ready',
        'Avoid calling in January (peak season)'
      ]
    },
    {
      method: 'Online Services',
      waitTime: 'Immediate',
      bestFor: ['Check deadlines', 'View account', 'Make payments', 'Update details'],
      availability: '24/7 (except maintenance)',
      website: 'https://www.gov.uk/government/organisations/hm-revenue-customs',
      tips: [
        'Use Government Gateway login',
        'Most queries can be resolved online',
        'Check HMRC guidance first'
      ]
    },
    {
      method: 'Webchat',
      waitTime: '5-15 minutes',
      bestFor: ['Quick questions', 'Guidance clarification', 'Non-urgent queries'],
      availability: 'Mon-Fri 8am-6pm',
      tips: [
        'Available on some HMRC pages',
        'Faster than phone for simple queries',
        'Not available during busy periods'
      ]
    },
    {
      method: 'Post',
      waitTime: '15+ working days',
      bestFor: ['Complex cases', 'Formal complaints', 'Document submission'],
      availability: 'Always',
      tips: [
        'Use recorded delivery',
        'Include all relevant reference numbers',
        'Keep copies of everything'
      ]
    }
  ];

  const commonQueries = [
    'Registration deadline missed',
    'UTR number lost',
    'Payment plan needed',
    'Penalty appeal',
    'Technical issues filing',
    'Trading allowance query',
    'Multiple income sources',
    'Accountant problems'
  ];

  const getTimeOfDayRecommendation = () => {
    const hour = new Date().getHours();
    if (hour >= 8 && hour <= 9) return { status: 'best', message: 'Great time to call - shortest wait times!' };
    if (hour >= 10 && hour <= 16) return { status: 'good', message: 'Good time to call - moderate wait times' };
    if (hour >= 17 || hour <= 7) return { status: 'closed', message: 'HMRC closed - try online services' };
    return { status: 'busy', message: 'Busy period - expect longer wait times' };
  };

  const timeRecommendation = getTimeOfDayRecommendation();
  const isWeekend = [0, 6].includes(new Date().getDay());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          HMRC Support Guide
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get effective help without the frustration
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className={`border-2 ${
          timeRecommendation.status === 'best' ? 'border-green-300 bg-green-50' :
          timeRecommendation.status === 'good' ? 'border-blue-300 bg-blue-50' :
          timeRecommendation.status === 'busy' ? 'border-yellow-300 bg-yellow-50' :
          'border-red-300 bg-red-50'
        }`}>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            <span className="font-semibold">Current Status:</span> {timeRecommendation.message}
            {isWeekend && timeRecommendation.status !== 'closed' && (
              <span className="block text-sm mt-1 text-amber-800">Weekend service limited to Saturday 8am-4pm. Expect longer waits.</span>
            )}
          </AlertDescription>
        </Alert>

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Contact Strategy Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Try online options before calling - most issues can be resolved</li>
            <li>• Prepare your UTR number, National Insurance number, and tax reference</li>
            <li>• Take notes of all interactions including times, dates, and officer names</li>
            <li>• Follow up in writing after important phone calls</li>
            <li>• Check HMRC website for service updates before contacting</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Select Your Query Type</h4>
          <div className="grid grid-cols-2 gap-2">
            {commonQueries.map((query, index) => (
              <Button
                key={index}
                variant={selectedQuery === query ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedQuery(query)}
                className="justify-start"
              >
                {query}
              </Button>
            ))}
          </div>
        </div>

        {selectedQuery && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="text-green-800 font-semibold">Recommended contact method for "{selectedQuery}"</p>
              <p className="text-green-700 text-sm mt-1">
                {selectedQuery.includes('technical') || selectedQuery.includes('UTR') ? 
                  'Online Service Helpdesk - 0300 200 3600' :
                selectedQuery.includes('missed') || selectedQuery.includes('penalty') ? 
                  'Self Assessment Helpline with copy of supporting documents' :
                selectedQuery.includes('payment') ? 
                  'Payment Helpline - 0300 200 3822' :
                  'Self Assessment Helpline - have your details ready'}
              </p>
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4 space-y-4">
          <h4 className="font-semibold text-gray-900">Contact Options</h4>
          
          {contactOptions.map((option, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold">{option.method}</h5>
                <Badge className={
                  option.waitTime.includes('Immediate') ? 'bg-green-100 text-green-800' :
                  option.waitTime.includes('5-15') ? 'bg-blue-100 text-blue-800' :
                  option.waitTime.includes('10-30') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {option.waitTime}
                </Badge>
              </div>
              
              <div className="text-sm space-y-2">
                <div className="flex gap-2 items-start">
                  <Calendar className="h-3 w-3 mt-1 text-gray-500" />
                  <p className="text-gray-600">{option.availability}</p>
                </div>
                
                {option.phone && (
                  <div className="flex gap-2 items-start">
                    <Phone className="h-3 w-3 mt-1 text-gray-500" />
                    <p className="text-gray-900 font-medium">{option.phone}</p>
                  </div>
                )}
                
                {option.website && (
                  <div className="flex gap-2 items-start">
                    <Globe className="h-3 w-3 mt-1 text-gray-500" />
                    <a href={option.website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 underline">
                      HMRC Online Services
                    </a>
                  </div>
                )}
                
                <div className="flex gap-2 items-start">
                  <FileText className="h-3 w-3 mt-1 text-gray-500" />
                  <div>
                    <p className="text-gray-700 font-medium">Best for:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {option.bestFor.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-xs font-medium text-blue-800">Pro tips:</p>
                  <ul className="text-xs text-blue-700 mt-1">
                    {option.tips.map((tip, i) => (
                      <li key={i} className="ml-3 list-disc">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HMRCSupportGuide;
