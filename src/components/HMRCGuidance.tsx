
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, XCircle, FileText, Clock, CreditCard, Users } from 'lucide-react';

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

// New data for common forum problems
interface ForumIssue {
  issue: string;
  solution: string;
  commonMistake: string;
  avoidanceTip: string;
  documentationNeeded?: string[];
}

const forumIssues: ForumIssue[] = [
  {
    issue: "Penalties despite no tax owed",
    solution: "Appeal with clear explanation that there was no tax liability. Include calculations.",
    commonMistake: "Thinking no tax means no need to file by deadline.",
    avoidanceTip: "Always file by the deadline even with zero tax liability. Filing and payment are separate obligations."
  },
  {
    issue: "Overwhelming HMRC reminders",
    solution: "Contact HMRC directly to update their records if you've already filed.",
    commonMistake: "Ignoring reminders thinking they're sent in error.",
    avoidanceTip: "Keep confirmation references for all submissions. Check your HMRC online account regularly."
  },
  {
    issue: "Accountant missed deadline",
    solution: "Appeal penalty with evidence you provided information to accountant with reasonable time.",
    commonMistake: "Assuming accountant will handle everything without your input.",
    avoidanceTip: "Set your own calendar reminders. Ask accountant for specific dates they need information.",
    documentationNeeded: ["Email/communication giving information to accountant", "Contract with accountant", "Timeline of communications"]
  },
  {
    issue: "Making Tax Digital confusion",
    solution: "Check HMRC website for exact MTD requirements for your business size and type.",
    commonMistake: "Misunderstanding which MTD rules apply to your business.",
    avoidanceTip: "Use HMRC-approved software early. Sign up for MTD pilot schemes when available.",
    documentationNeeded: ["Software compliance certificates", "Digital records"]
  },
  {
    issue: "Payments on Account confusion",
    solution: "Budget for 50% of current tax bill to be paid by Jan 31 for next year's tax.",
    commonMistake: "Being unprepared for advance payments in first year of self-assessment.",
    avoidanceTip: "Set aside 25-30% of income throughout the year in a separate account for tax.",
    documentationNeeded: ["Previous year's tax calculation", "SA302 form"]
  },
  {
    issue: "Penalties for dormant companies",
    solution: "File dormant company accounts and confirmation statement even for inactive businesses.",
    commonMistake: "Assuming dormant means no filing requirements.",
    avoidanceTip: "Consider striking off the company if truly dormant. Set annual reminders for dormant company filing.",
    documentationNeeded: ["Dormant company accounts", "Confirmation statement"]
  }
];

const HMRCGuidance: React.FC = () => {
  const [activeTab, setActiveTab] = useState("late-submission");

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
      <Tabs defaultValue="late-submission" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="late-submission">Late Submissions</TabsTrigger>
          <TabsTrigger value="common-issues">Common Issues</TabsTrigger>
          <TabsTrigger value="special-cases">Special Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="late-submission" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="common-issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Common Issues from Forums
              </CardTitle>
              <p className="text-sm text-gray-600">
                Real problems faced by taxpayers and how to solve them
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forumIssues.map((issue, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900">{issue.issue}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm text-green-700 mb-1">Solution:</h4>
                          <p className="text-sm text-gray-600">{issue.solution}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm text-red-700 mb-1">Common Mistake:</h4>
                          <p className="text-sm text-gray-600">{issue.commonMistake}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm text-blue-700 mb-1">How to Avoid:</h4>
                          <p className="text-sm text-gray-600">{issue.avoidanceTip}</p>
                        </div>
                        
                        {issue.documentationNeeded && (
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-1">Documentation Needed:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {issue.documentationNeeded.map((doc, docIndex) => (
                                <li key={docIndex} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special-cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Special Cases & Considerations
              </CardTitle>
              <p className="text-sm text-gray-600">
                Unusual situations that require specific approaches
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Multiple Income Sources</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Having multiple income sources can complicate tax obligations. You may need to:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      File even if each individual source is below thresholds
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      Track different deadlines for different income types
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      Keep separate records for each income source
                    </li>
                  </ul>
                  <div className="bg-purple-50 p-2 rounded text-sm text-purple-800">
                    <strong>Pro Tip:</strong> HMRC has special guidance for people with multiple income sources. 
                    Consider using accounting software that can track multiple income streams separately.
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Dormant Companies</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Even dormant companies have filing obligations:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      Must file dormant company accounts annually
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      Must submit confirmation statements
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      May still need to file Corporation Tax returns (nil)
                    </li>
                  </ul>
                  <div className="bg-purple-50 p-2 rounded text-sm text-purple-800">
                    <strong>Pro Tip:</strong> If the company will remain dormant long-term, consider striking it off
                    to avoid ongoing filing requirements. This costs £8-10 online and removes future obligations.
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Making Tax Digital Transition</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    MTD is being gradually introduced:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      Phased rollout based on business type and size
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      Requires compatible software for digital record keeping
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      Different deadlines for VAT, Income Tax, and Corporation Tax
                    </li>
                  </ul>
                  <div className="bg-purple-50 p-2 rounded text-sm text-purple-800">
                    <strong>Pro Tip:</strong> Join pilot schemes early to familiarize yourself with the system.
                    HMRC offers free software options for businesses below certain thresholds.
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 text-sm text-gray-500">
              Guidance based on current HMRC policies as of May 2023. Always check official sources for updates.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HMRCGuidance;
