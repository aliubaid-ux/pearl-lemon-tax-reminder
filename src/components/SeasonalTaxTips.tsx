
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Snowflake, Sun, Leaf, CloudRain, TrendingUp, AlertTriangle } from 'lucide-react';

interface SeasonalTip {
  id: string;
  title: string;
  description: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  monthsActive: number[];
  urgency: 'high' | 'medium' | 'low';
  applicableFor: string[];
  actionItems: string[];
}

const SeasonalTaxTips: React.FC = () => {
  const [currentTips, setCurrentTips] = useState<SeasonalTip[]>([]);
  const [currentMonth] = useState(new Date().getMonth());

  const seasonalTips: SeasonalTip[] = [
    {
      id: 'spring-planning',
      title: 'New Tax Year Planning',
      description: 'The new tax year starts in April. Review allowances and plan for the year ahead.',
      season: 'spring',
      monthsActive: [3, 4, 5],
      urgency: 'high',
      applicableFor: ['self-employed', 'company-director'],
      actionItems: [
        'Review personal and business allowances',
        'Plan pension contributions',
        'Consider timing of income and expenses',
        'Set up new record-keeping systems'
      ]
    },
    {
      id: 'summer-midyear',
      title: 'Mid-Year Review',
      description: 'Perfect time for a mid-year financial health check and tax planning.',
      season: 'summer',
      monthsActive: [6, 7, 8],
      urgency: 'medium',
      applicableFor: ['self-employed', 'company-director'],
      actionItems: [
        'Review first quarter performance',
        'Adjust tax savings if needed',
        'Plan for upcoming payment on account',
        'Review VAT registration threshold'
      ]
    },
    {
      id: 'autumn-preparation',
      title: 'Autumn Preparation',
      description: 'Start preparing for the busy tax season ahead.',
      season: 'autumn',
      monthsActive: [9, 10, 11],
      urgency: 'high',
      applicableFor: ['self-employed', 'company-director'],
      actionItems: [
        'Gather documents for Self Assessment',
        'Review and reconcile accounts',
        'Plan for January tax payments',
        'Consider year-end tax planning'
      ]
    },
    {
      id: 'winter-deadlines',
      title: 'Deadline Season',
      description: 'Key deadlines approaching - time for action!',
      season: 'winter',
      monthsActive: [0, 1, 2],
      urgency: 'high',
      applicableFor: ['self-employed', 'company-director'],
      actionItems: [
        'Complete Self Assessment returns',
        'Make tax payments on time',
        'File company accounts',
        'Plan for next year'
      ]
    },
    {
      id: 'vat-threshold-monitor',
      title: 'VAT Threshold Monitoring',
      description: 'Keep an eye on your turnover to avoid missing VAT registration.',
      season: 'spring',
      monthsActive: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      urgency: 'medium',
      applicableFor: ['self-employed'],
      actionItems: [
        'Track monthly turnover',
        'Monitor 12-month rolling total',
        'Prepare for VAT registration if needed',
        'Consider voluntary registration benefits'
      ]
    },
    {
      id: 'corporation-tax-planning',
      title: 'Corporation Tax Year-End',
      description: 'Plan ahead for your company\'s accounting year end.',
      season: 'winter',
      monthsActive: [0, 1, 2, 3],
      urgency: 'high',
      applicableFor: ['company-director'],
      actionItems: [
        'Review profit forecasts',
        'Consider dividend vs salary planning',
        'Plan corporation tax payments',
        'Prepare for accounts filing'
      ]
    }
  ];

  useEffect(() => {
    const relevantTips = seasonalTips.filter(tip => 
      tip.monthsActive.includes(currentMonth)
    );
    setCurrentTips(relevantTips);
  }, [currentMonth]);

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'spring': return <Leaf className="h-4 w-4 text-green-600" />;
      case 'summer': return <Sun className="h-4 w-4 text-yellow-600" />;
      case 'autumn': return <CloudRain className="h-4 w-4 text-orange-600" />;
      case 'winter': return <Snowflake className="h-4 w-4 text-blue-600" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (currentTips.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Seasonal Tax Tips
          <Badge variant="outline">{currentTips.length} active</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentTips.map((tip) => (
          <div
            key={tip.id}
            className={`p-4 rounded-lg border-l-4 ${
              tip.urgency === 'high' 
                ? 'border-l-red-500 bg-red-50' 
                : tip.urgency === 'medium'
                ? 'border-l-amber-500 bg-amber-50'
                : 'border-l-green-500 bg-green-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getSeasonIcon(tip.season)}
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getUrgencyColor(tip.urgency)}>
                  {tip.urgency} priority
                </Badge>
                {tip.urgency === 'high' && (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
            
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Action Items:</span>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                {tip.actionItems.map((action, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {tip.applicableFor.map((userType, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {userType.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SeasonalTaxTips;
