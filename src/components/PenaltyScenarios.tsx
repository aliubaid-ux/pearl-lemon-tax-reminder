
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, DollarSign } from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  situation: string;
  penalty: string;
  lesson: string;
  category: 'self-assessment' | 'corporation-tax' | 'vat';
}

const PenaltyScenarios: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const scenarios: Scenario[] = [
    {
      id: '1',
      title: 'The "Zero Tax" Trap',
      situation: 'Sarah filed her Self Assessment 2 days late but owed £0 in tax.',
      penalty: '£100 immediate penalty + £20 daily penalties',
      lesson: 'Even if you owe no tax, the filing penalty still applies!',
      category: 'self-assessment'
    },
    {
      id: '2',
      title: 'The Forgotten Corporation Tax',
      situation: 'Small company forgot to file CT600 for 4 months.',
      penalty: '£100 initial + £200 (3+ months) = £300 total',
      lesson: 'Corporation Tax penalties increase significantly after 3 months.',
      category: 'corporation-tax'
    },
    {
      id: '3',
      title: 'VAT Return Nightmare',
      situation: 'Business filed VAT return 1 month late, owing £2,000 VAT.',
      penalty: '£300 penalty (15% of £2,000) + interest charges',
      lesson: 'VAT penalties are percentage-based and can be very expensive.',
      category: 'vat'
    },
    {
      id: '4',
      title: 'The Expensive Delay',
      situation: 'Freelancer filed 6 months late, owing £3,000 tax.',
      penalty: '£100 + £890 (90 days) + £150 (5%) + £150 (5%) = £1,290',
      lesson: 'Long delays trigger multiple penalty charges.',
      category: 'self-assessment'
    },
    {
      id: '5',
      title: 'Large Company Shock',
      situation: 'Large company filed Corporation Tax 7 months late.',
      penalty: '£10,000 penalty (£1,000 × 10 for large company)',
      lesson: 'Large companies face 10x penalty multipliers.',
      category: 'corporation-tax'
    }
  ];

  const filteredScenarios = selectedCategory === 'all' 
    ? scenarios 
    : scenarios.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'self-assessment': return <Clock className="h-4 w-4" />;
      case 'corporation-tax': return <DollarSign className="h-4 w-4" />;
      case 'vat': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Real Penalty Scenarios
        </CardTitle>
        <p className="text-sm text-gray-600">
          Learn from others' expensive mistakes
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {['all', 'self-assessment', 'corporation-tax', 'vat'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Scenarios' : 
               category.split('-').map(word => 
                 word.charAt(0).toUpperCase() + word.slice(1)
               ).join(' ')}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredScenarios.map((scenario) => (
            <div key={scenario.id} className="border rounded-lg p-4 bg-red-50 border-red-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-red-900">{scenario.title}</h4>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(scenario.category)}
                  {scenario.category.replace('-', ' ')}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <strong>Situation:</strong> {scenario.situation}
                </p>
                <p className="text-red-800">
                  <strong>Penalty:</strong> {scenario.penalty}
                </p>
                <p className="text-blue-800 bg-blue-50 p-2 rounded">
                  <strong>💡 Lesson:</strong> {scenario.lesson}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PenaltyScenarios;
