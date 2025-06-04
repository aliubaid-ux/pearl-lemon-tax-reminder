
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, DollarSign, Calendar, FileText, Users, Calculator, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Mistake {
  id: string;
  title: string;
  description: string;
  consequences: string[];
  howToAvoid: string[];
  severity: 'high' | 'medium' | 'low';
  category: string;
  affectedUsers: string[];
}

const CommonMistakes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const mistakes: Mistake[] = [
    {
      id: 'late-filing',
      title: 'Missing Filing Deadlines',
      description: 'Not submitting tax returns by the required deadline dates',
      consequences: ['£100 minimum penalty', 'Daily penalties after 3 months', 'Interest on unpaid tax'],
      howToAvoid: ['Set calendar reminders', 'File early to avoid last-minute issues', 'Use our deadline calendar'],
      severity: 'high',
      category: 'deadlines',
      affectedUsers: ['self-employed', 'company-director']
    },
    {
      id: 'trading-allowance',
      title: 'Misunderstanding Trading Allowance',
      description: 'Incorrectly claiming trading allowance when not eligible or beneficial',
      consequences: ['Missed tax relief opportunities', 'Incorrect tax calculations', 'Potential penalties'],
      howToAvoid: ['Use our Trading Allowance Calculator', 'Understand the £1,000 threshold', 'Consider actual expenses vs allowance'],
      severity: 'medium',
      category: 'allowances',
      affectedUsers: ['self-employed']
    },
    {
      id: 'vat-threshold',
      title: 'Missing VAT Registration Threshold',
      description: 'Not registering for VAT when turnover exceeds £85,000',
      consequences: ['Penalties for late registration', 'Backdated VAT liability', 'Interest charges'],
      howToAvoid: ['Monitor turnover regularly', 'Register before reaching threshold', 'Use our VAT threshold monitor'],
      severity: 'high',
      category: 'vat',
      affectedUsers: ['self-employed', 'company-director']
    },
    {
      id: 'payment-account',
      title: 'Forgetting Payments on Account',
      description: 'Not making required advance payments for next year\'s tax',
      consequences: ['Penalty charges', 'Interest on late payments', 'Cashflow problems'],
      howToAvoid: ['Set reminders for July 31st and January 31st', 'Budget for advance payments', 'Consider reducing payments if income drops'],
      severity: 'high',
      category: 'payments',
      affectedUsers: ['self-employed']
    },
    {
      id: 'class2-ni',
      title: 'Class 2 National Insurance Confusion',
      description: 'Not understanding when Class 2 NI is payable or voluntary',
      consequences: ['Gaps in National Insurance record', 'Reduced pension entitlement', 'Unnecessary payments'],
      howToAvoid: ['Understand the £6,515 threshold', 'Make voluntary payments if beneficial', 'Check your NI record annually'],
      severity: 'medium',
      category: 'national-insurance',
      affectedUsers: ['self-employed']
    },
    {
      id: 'p11d-deadlines',
      title: 'Missing P11D Filing Deadlines',
      description: 'Not submitting P11D forms for employee benefits by July 6th',
      consequences: ['£300+ penalties per form', 'Interest on unpaid Class 1A NI', 'HMRC investigations'],
      howToAvoid: ['Calendar reminders for July 6th', 'Prepare forms early', 'Use payroll software'],
      severity: 'high',
      category: 'paye',
      affectedUsers: ['company-director']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: FileText },
    { id: 'deadlines', label: 'Deadlines', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'vat', label: 'VAT', icon: Calculator },
    { id: 'allowances', label: 'Allowances', icon: Users },
    { id: 'paye', label: 'PAYE', icon: FileText },
    { id: 'national-insurance', label: 'National Insurance', icon: Users }
  ];

  const filteredMistakes = selectedCategory === 'all' 
    ? mistakes 
    : mistakes.filter(mistake => mistake.category === selectedCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGetHelp = (mistakeId: string) => {
    toast({
      title: "Getting Help",
      description: "Redirecting to relevant guidance and support resources...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Common Tax Mistakes</h1>
        <p className="text-gray-600">Learn about frequent tax filing errors and how to avoid them</p>
      </div>

      {/* Category Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mistakes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMistakes.map((mistake) => (
          <Card key={mistake.id} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  {mistake.title}
                </CardTitle>
                <Badge className={getSeverityColor(mistake.severity)}>
                  {mistake.severity} risk
                </Badge>
              </div>
              <p className="text-gray-600">{mistake.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Consequences */}
              <div>
                <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Consequences
                </h4>
                <ul className="text-sm space-y-1">
                  {mistake.consequences.map((consequence, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-gray-700">{consequence}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Avoid */}
              <div>
                <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  How to Avoid
                </h4>
                <ul className="text-sm space-y-1">
                  {mistake.howToAvoid.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Affected Users */}
              <div className="flex flex-wrap gap-2">
                {mistake.affectedUsers.map((userType, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {userType.replace('-', ' ')}
                  </Badge>
                ))}
              </div>

              <Button 
                className="w-full mt-4"
                onClick={() => handleGetHelp(mistake.id)}
              >
                Get Help with This Issue
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prevention Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            General Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Stay Organized</h4>
              <p className="text-sm text-blue-800">Keep accurate records and use our calendar system to track deadlines</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Seek Professional Help</h4>
              <p className="text-sm text-green-800">Consider hiring a qualified accountant for complex situations</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Use HMRC Resources</h4>
              <p className="text-sm text-purple-800">Take advantage of official guidance and helplines</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonMistakes;
