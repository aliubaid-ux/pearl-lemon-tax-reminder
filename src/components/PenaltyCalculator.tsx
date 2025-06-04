
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calculator, AlertTriangle, Info, Calendar } from 'lucide-react';

const PenaltyCalculator: React.FC = () => {
  const [taxType, setTaxType] = useState('');
  const [daysLate, setDaysLate] = useState('');
  const [taxOwed, setTaxOwed] = useState('');
  const [companySize, setCompanySize] = useState('');

  const calculatePenalty = () => {
    const days = parseInt(daysLate) || 0;
    const owed = parseFloat(taxOwed) || 0;

    if (!taxType || days <= 0) return null;

    let penalty = 0;
    let explanation = '';
    let interestRate = 0;

    switch (taxType) {
      case 'self-assessment':
        if (days === 1) {
          penalty = 100;
          explanation = 'Immediate £100 penalty for filing even 1 day late';
        } else if (days <= 90) {
          penalty = 100 + (days - 1) * 10;
          explanation = `£100 initial penalty + £10 per day (${days - 1} days)`;
        } else if (days <= 180) {
          penalty = 100 + 89 * 10 + Math.max(300, owed * 0.05);
          explanation = '£100 + £890 (90 days) + 5% of tax owed or £300 (whichever is higher)';
        } else {
          penalty = 100 + 89 * 10 + Math.max(300, owed * 0.05) + Math.max(300, owed * 0.05);
          explanation = 'Maximum penalties: £100 + £890 + two additional 5% charges';
        }
        interestRate = 7.75;
        break;

      case 'corporation-tax':
        const companyMultiplier = companySize === 'small' ? 1 : companySize === 'medium' ? 2 : 10;
        if (days <= 90) {
          penalty = 100 * companyMultiplier;
          explanation = `£${100 * companyMultiplier} for ${companySize} company`;
        } else if (days <= 180) {
          penalty = 200 * companyMultiplier;
          explanation = `£${200 * companyMultiplier} for ${companySize} company (over 3 months late)`;
        } else {
          penalty = 1000 * companyMultiplier;
          explanation = `£${1000 * companyMultiplier} for ${companySize} company (over 6 months late)`;
        }
        interestRate = 7.75;
        break;

      case 'vat':
        penalty = Math.max(400, owed * 0.15);
        explanation = '15% of VAT owed or £400 (whichever is higher)';
        interestRate = 7.75;
        break;

      default:
        return null;
    }

    const interest = owed * (interestRate / 100) * (days / 365);
    
    return {
      penalty,
      interest,
      total: penalty + interest,
      explanation,
      interestRate
    };
  };

  const result = calculatePenalty();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          HMRC Penalty Calculator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Calculate potential penalties for late tax submissions
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tax-type">Tax Type</Label>
            <Select onValueChange={setTaxType}>
              <SelectTrigger>
                <SelectValue placeholder="Select tax type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self-assessment">Self Assessment</SelectItem>
                <SelectItem value="corporation-tax">Corporation Tax</SelectItem>
                <SelectItem value="vat">VAT Return</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="days-late">Days Late</Label>
            <Input
              id="days-late"
              type="number"
              placeholder="0"
              value={daysLate}
              onChange={(e) => setDaysLate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="tax-owed">Tax Amount Owed (£)</Label>
            <Input
              id="tax-owed"
              type="number"
              placeholder="0"
              value={taxOwed}
              onChange={(e) => setTaxOwed(e.target.value)}
              className="mt-1"
            />
          </div>

          {taxType === 'corporation-tax' && (
            <div>
              <Label htmlFor="company-size">Company Size</Label>
              <Select onValueChange={setCompanySize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small Company</SelectItem>
                  <SelectItem value="medium">Medium Company</SelectItem>
                  <SelectItem value="large">Large Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {result && (
          <Alert className="border-red-300 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">
                    PENALTY ESTIMATE
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800">Late Filing Penalty</p>
                    <p className="text-2xl font-bold text-red-900">£{result.penalty.toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800">Interest ({result.interestRate}%)</p>
                    <p className="text-2xl font-bold text-red-900">£{result.interest.toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-400">
                    <p className="font-semibold text-red-800">Total Cost</p>
                    <p className="text-2xl font-bold text-red-900">£{result.total.toFixed(2)}</p>
                  </div>
                </div>

                <p className="text-red-800 font-medium">
                  {result.explanation}
                </p>
                
                <div className="bg-red-100 p-3 rounded">
                  <p className="font-semibold text-red-900 mb-1">⚠️ Real User Warning:</p>
                  <p className="text-red-800 text-sm italic">
                    "I got fined £160 for filing just 1 day late. Even though I owed £0 in tax, HMRC doesn't care - the penalty is automatic." - Reddit user
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-amber-50 p-3 rounded-lg">
          <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Penalty Key Facts
          </h4>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Penalties apply even if you owe £0 in tax</li>
            <li>• Self Assessment: £100 penalty from day 1, then £10/day</li>
            <li>• Corporation Tax: £100-£1,000 depending on company size</li>
            <li>• Interest is charged daily until payment is made</li>
            <li>• Appeals possible only with "reasonable excuse"</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PenaltyCalculator;
