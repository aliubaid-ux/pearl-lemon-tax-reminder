
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  FileText, 
  Phone, 
  X,
  CheckCircle,
  Info
} from 'lucide-react';

interface CommonMistake {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'registration' | 'filing' | 'payment' | 'mtd' | 'support';
  solution: string;
  preventionTip: string;
}

const commonMistakes: CommonMistake[] = [
  {
    id: 'registration-deadline',
    title: 'Missing Self-Assessment Registration Deadline',
    description: 'Must register by October 5th following the tax year you started self-employment',
    impact: 'high',
    category: 'registration',
    solution: 'Register immediately online at gov.uk. Late registration may incur £100 penalty.',
    preventionTip: 'Set a reminder for October 5th when you start any self-employed work, no matter how small.'
  },
  {
    id: 'trading-allowance-confusion',
    title: 'Trading Allowance Misconception',
    description: 'Earning under £1,000 doesn\'t automatically exempt you from filing if HMRC issues a notice',
    impact: 'high',
    category: 'filing',
    solution: 'Always file if you receive a notice to file, regardless of income level.',
    preventionTip: 'Register for self-assessment even with small income - better safe than sorry.'
  },
  {
    id: 'penalties-no-tax-owed',
    title: 'Penalties Despite No Tax Owed',
    description: 'Late filing penalties apply even when no tax is owed - filing and payment are separate',
    impact: 'medium',
    category: 'filing',
    solution: 'File on time even if no tax is due. Consider reasonable excuse appeal if late.',
    preventionTip: 'Set filing reminders 2 weeks before deadline. Filing is mandatory regardless of tax owed.'
  },
  {
    id: 'payments-on-account',
    title: 'Unexpected Payments on Account',
    description: 'Advance payments for next year catch many first-time filers off guard',
    impact: 'high',
    category: 'payment',
    solution: 'Budget for 50% of this year\'s tax bill to be paid by January 31st for next year.',
    preventionTip: 'Open a separate savings account and save 25-30% of profits for tax throughout the year.'
  },
  {
    id: 'accountant-reliance',
    title: 'Over-Reliance on Accountants',
    description: 'You remain legally responsible even if your accountant misses deadlines',
    impact: 'high',
    category: 'filing',
    solution: 'Monitor deadlines yourself and maintain regular contact with your accountant.',
    preventionTip: 'Set your own calendar reminders 1 month before each deadline as backup.'
  },
  {
    id: 'mtd-compliance',
    title: 'Making Tax Digital Confusion',
    description: 'MTD requirements for record-keeping and software can be overwhelming',
    impact: 'medium',
    category: 'mtd',
    solution: 'Use HMRC-approved software and keep digital records from day one.',
    preventionTip: 'Choose simple cloud-based accounting software early - don\'t wait until deadlines approach.'
  },
  {
    id: 'filing-obligations',
    title: 'Unclear Filing Requirements',
    description: 'Confusion about when to file with multiple income sources',
    impact: 'medium',
    category: 'registration',
    solution: 'File if: self-employed income >£1,000, rental income >£2,500, or HMRC sends notice.',
    preventionTip: 'When in doubt, register and file - penalties for not filing are worse than filing unnecessarily.'
  },
  {
    id: 'dormant-company-penalties',
    title: 'Dormant Company Filing Forgotten',
    description: 'Dormant companies still need to file confirmation statements and accounts',
    impact: 'medium',
    category: 'filing',
    solution: 'File dormant company accounts and confirmation statement annually.',
    preventionTip: 'Set annual reminders or consider striking off if permanently dormant.'
  }
];

const CommonMistakesAlert: React.FC = () => {
  const [dismissedMistakes, setDismissedMistakes] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const activeMistakes = commonMistakes.filter(mistake => !dismissedMistakes.has(mistake.id));
  const visibleMistakes = showAll ? activeMistakes : activeMistakes.slice(0, 3);

  const dismissMistake = (id: string) => {
    setDismissedMistakes(prev => new Set([...prev, id]));
  };

  const getImpactColor = (impact: CommonMistake['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryIcon = (category: CommonMistake['category']) => {
    switch (category) {
      case 'registration': return <FileText className="h-4 w-4" />;
      case 'filing': return <Clock className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'mtd': return <FileText className="h-4 w-4" />;
      case 'support': return <Phone className="h-4 w-4" />;
    }
  };

  if (activeMistakes.length === 0) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Great! You've reviewed all common tax mistakes. Stay vigilant and keep these tips in mind.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-900">
          <AlertTriangle className="h-5 w-5" />
          Common Tax Mistakes to Avoid
        </CardTitle>
        <p className="text-sm text-red-700">
          Based on real user experiences and forum complaints
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {visibleMistakes.map((mistake) => (
          <div key={mistake.id} className="bg-white rounded-lg p-4 border border-red-100">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getCategoryIcon(mistake.category)}
                <h4 className="font-semibold text-gray-900">{mistake.title}</h4>
                <Badge className={getImpactColor(mistake.impact)}>
                  {mistake.impact} impact
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissMistake(mistake.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{mistake.description}</p>
            
            <div className="space-y-2">
              <div className="bg-blue-50 p-2 rounded text-sm">
                <strong className="text-blue-800">Solution: </strong>
                <span className="text-blue-700">{mistake.solution}</span>
              </div>
              <div className="bg-green-50 p-2 rounded text-sm">
                <strong className="text-green-800">💡 Prevention: </strong>
                <span className="text-green-700">{mistake.preventionTip}</span>
              </div>
            </div>
          </div>
        ))}
        
        {activeMistakes.length > 3 && (
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll ? 'Show Less' : `Show ${activeMistakes.length - 3} More Mistakes`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CommonMistakesAlert;
