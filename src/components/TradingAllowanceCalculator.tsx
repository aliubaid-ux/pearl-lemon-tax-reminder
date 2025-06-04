
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

const TradingAllowanceCalculator: React.FC = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [hasHMRCNotice, setHasHMRCNotice] = useState<boolean | null>(null);
  const [hasOtherIncome, setHasOtherIncome] = useState<boolean | null>(null);

  const calculateRecommendation = () => {
    const incomeNum = parseFloat(income) || 0;
    const expensesNum = parseFloat(expenses) || 0;
    const profit = incomeNum - expensesNum;
    
    // If HMRC has issued a notice, must file regardless
    if (hasHMRCNotice) {
      return {
        mustFile: true,
        reason: 'HMRC Notice',
        explanation: 'You must file because HMRC has issued you a notice to file, regardless of income level.'
      };
    }

    // If income over £1,000, must register and file
    if (incomeNum > 1000) {
      return {
        mustFile: true,
        reason: 'Income Threshold',
        explanation: 'Your trading income exceeds £1,000, so you must register for Self Assessment.'
      };
    }

    // If other income sources, might need to file
    if (hasOtherIncome) {
      return {
        mustFile: true,
        reason: 'Multiple Income Sources',
        explanation: 'With other income sources, you likely need to file even with low trading income.'
      };
    }

    // Under £1,000 and no other triggers
    if (incomeNum <= 1000) {
      const tradingAllowanceBenefit = Math.min(incomeNum, 1000);
      const actualExpensesBenefit = profit;
      
      return {
        mustFile: false,
        reason: 'Trading Allowance',
        explanation: `Your income is £${incomeNum.toFixed(2)}, which is under the £1,000 trading allowance.`,
        recommendation: tradingAllowanceBenefit >= actualExpensesBenefit ? 'Use Trading Allowance' : 'Claim Actual Expenses',
        savings: `Trading allowance would save you from paying tax on £${tradingAllowanceBenefit.toFixed(2)}`
      };
    }

    return {
      mustFile: null,
      reason: 'Insufficient Information',
      explanation: 'Please provide more information to get an accurate recommendation.'
    };
  };

  const result = calculateRecommendation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Trading Allowance Calculator
        </CardTitle>
        <p className="text-sm text-gray-600">
          Check if you need to file Self Assessment and optimize your allowances
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="income">Annual Trading Income (£)</Label>
            <Input
              id="income"
              type="number"
              placeholder="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="expenses">Annual Trading Expenses (£)</Label>
            <Input
              id="expenses"
              type="number"
              placeholder="0"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <Label>Has HMRC issued you a notice to file?</Label>
            <div className="flex gap-2 mt-1">
              <Button
                variant={hasHMRCNotice === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHasHMRCNotice(true)}
              >
                Yes
              </Button>
              <Button
                variant={hasHMRCNotice === false ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHasHMRCNotice(false)}
              >
                No
              </Button>
            </div>
          </div>

          <div>
            <Label>Do you have other income sources? (Employment, rental, etc.)</Label>
            <div className="flex gap-2 mt-1">
              <Button
                variant={hasOtherIncome === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHasOtherIncome(true)}
              >
                Yes
              </Button>
              <Button
                variant={hasOtherIncome === false ? 'default' : 'outline'}
                size="sm"
                onClick={() => setHasOtherIncome(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>

        {result.mustFile !== null && (
          <Alert className={result.mustFile ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}>
            {result.mustFile ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={result.mustFile ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {result.mustFile ? 'Must File' : 'May Not Need to File'}
                  </Badge>
                  <span className="font-semibold">{result.reason}</span>
                </div>
                <p className={result.mustFile ? 'text-red-800' : 'text-green-800'}>
                  {result.explanation}
                </p>
                {result.recommendation && (
                  <p className="text-blue-800">
                    <strong>Recommendation:</strong> {result.recommendation}
                  </p>
                )}
                {result.savings && (
                  <p className="text-green-800">
                    <strong>💰 {result.savings}</strong>
                  </p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Trading Allowance Key Points</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• £1,000 annual allowance for trading income</li>
            <li>• Can choose between allowance OR actual expenses (not both)</li>
            <li>• Must still file if HMRC issues a notice, regardless of income</li>
            <li>• Consider other income sources that might trigger filing requirements</li>
            <li>• When in doubt, register and file - it's safer than penalties</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingAllowanceCalculator;
