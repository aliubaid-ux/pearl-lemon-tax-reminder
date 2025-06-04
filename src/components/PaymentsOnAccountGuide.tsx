
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calculator, Calendar, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PaymentsOnAccountGuide: React.FC = () => {
  const [previousTaxBill, setPreviousTaxBill] = useState('');
  const [expectedIncome, setExpectedIncome] = useState('');
  const [isFirstYear, setIsFirstYear] = useState<boolean | null>(null);
  
  const calculatePayments = () => {
    const taxBill = parseFloat(previousTaxBill) || 0;
    
    // Only calculate payments on account if tax bill > £1,000
    if (taxBill <= 1000) {
      return {
        isEligible: false,
        firstPayment: 0,
        secondPayment: 0,
        reason: 'Tax bill £1,000 or less'
      };
    }
    
    const firstPayment = taxBill / 2;
    const secondPayment = taxBill / 2;
    
    return {
      isEligible: true,
      firstPayment,
      secondPayment,
      reason: 'Tax bill exceeds £1,000'
    };
  };

  const calculatePossibleReduction = () => {
    const taxBill = parseFloat(previousTaxBill) || 0;
    const expectedIncomeNum = parseFloat(expectedIncome) || 0;
    
    // Simple estimate - assumes same tax rate
    const expectedReduction = expectedIncomeNum < taxBill * 0.75 ? 
      ((taxBill * 0.75) - expectedIncomeNum) / 2 : 0;
    
    return {
      canReduce: expectedReduction > 0,
      estimatedReduction: expectedReduction,
      newPayment: (taxBill / 2) - expectedReduction
    };
  };

  const results = calculatePayments();
  const reduction = calculatePossibleReduction();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payments on Account Explainer
        </CardTitle>
        <p className="text-sm text-gray-600">
          Understand advance tax payments and avoid nasty surprises
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="calculator">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="explainer">How It Works</TabsTrigger>
            <TabsTrigger value="tips">Tips & Help</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Use this calculator to estimate your payments on account and whether you can reduce them.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="tax-bill">Last tax year's bill (£)</Label>
                <Input
                  id="tax-bill"
                  type="number"
                  placeholder="0"
                  value={previousTaxBill}
                  onChange={(e) => setPreviousTaxBill(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="expected-income">Expected income this year (£)</Label>
                <Input
                  id="expected-income"
                  type="number"
                  placeholder="0"
                  value={expectedIncome}
                  onChange={(e) => setExpectedIncome(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Is this your first year in Self Assessment?</Label>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant={isFirstYear === true ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIsFirstYear(true)}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={isFirstYear === false ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIsFirstYear(false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>

            {isFirstYear === true && parseFloat(previousTaxBill) > 0 && (
              <Alert className="border-amber-300 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>First Year Alert:</strong> Since this is your first year, you'll need to pay your full tax bill 
                  by January 31st <strong>AND</strong> make first payment on account for next year. 
                  This means a larger than expected payment.
                </AlertDescription>
              </Alert>
            )}

            {parseFloat(previousTaxBill) > 0 && (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-semibold mb-2">Your Payments on Account</h4>
                  
                  {!results.isEligible ? (
                    <Alert className="bg-green-50 border-green-200">
                      <Info className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        You don't need to make payments on account because your tax bill is £1,000 or less.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-white p-3 rounded-lg border text-center">
                          <p className="text-sm text-gray-600">First Payment (31 Jan)</p>
                          <p className="text-xl font-bold">£{results.firstPayment.toFixed(2)}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border text-center">
                          <p className="text-sm text-gray-600">Second Payment (31 Jul)</p>
                          <p className="text-xl font-bold">£{results.secondPayment.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      {isFirstYear === true && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <h5 className="font-semibold text-red-900">First Year Total Due (31 Jan)</h5>
                          <p className="text-lg font-bold text-red-800">
                            £{(parseFloat(previousTaxBill) + results.firstPayment).toFixed(2)}
                          </p>
                          <p className="text-xs text-red-700 mt-1">
                            (Full tax bill + first payment on account)
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {results.isEligible && reduction.canReduce && (
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Possible Reduction</h4>
                      <Badge className="bg-blue-200 text-blue-900">Savings Available</Badge>
                    </div>
                    
                    <p className="text-sm text-blue-800 mb-3">
                      Based on your expected income, you might be able to reduce your payments on account.
                    </p>
                    
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Current payment:</span>
                        <span className="text-sm">£{results.firstPayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Possible reduction:</span>
                        <span className="text-sm text-green-600">-£{reduction.estimatedReduction.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>New payment:</span>
                        <span>£{reduction.newPayment.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-blue-800">
                      <p className="font-semibold">How to claim a reduction:</p>
                      <ol className="list-decimal pl-4 mt-1 space-y-1">
                        <li>Log in to your HMRC online account</li>
                        <li>Go to Self Assessment</li>
                        <li>Select 'Reduce payments on account'</li>
                        <li>Enter your expected income</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="explainer" className="space-y-4">
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold text-blue-900 mb-2">What are Payments on Account?</h4>
              <p className="text-sm text-blue-800">
                Payments on account are advance payments towards your next tax bill. They help spread the cost
                of your tax across the year rather than paying it all at once.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="border-l-4 border-blue-300 pl-3">
                <h5 className="font-semibold text-gray-900">When do you need to make them?</h5>
                <p className="text-sm text-gray-600">
                  You need to make payments on account if your last Self Assessment tax bill was more than £1,000,
                  unless more than 80% of your tax was deducted at source (e.g., through PAYE).
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-300 pl-3">
                <h5 className="font-semibold text-gray-900">How much are they?</h5>
                <p className="text-sm text-gray-600">
                  Each payment is 50% of your previous tax bill. So if you owed £2,000 last year,
                  each payment on account would be £1,000.
                </p>
              </div>
              
              <div className="border-l-4 border-green-300 pl-3">
                <h5 className="font-semibold text-gray-900">When are they due?</h5>
                <p className="text-sm text-gray-600">
                  <strong>First payment:</strong> 31 January (the same day as your balancing payment for last year)<br />
                  <strong>Second payment:</strong> 31 July
                </p>
              </div>
              
              <div className="border-l-4 border-red-300 pl-3">
                <h5 className="font-semibold text-gray-900">First Year Shock</h5>
                <p className="text-sm text-gray-600">
                  In your first year of Self Assessment, you'll need to pay your full tax bill AND your first payment 
                  on account on the same day (31 January). This can be a nasty surprise if you haven't budgeted for it.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-300 pl-3">
                <h5 className="font-semibold text-gray-900">Can I reduce them?</h5>
                <p className="text-sm text-gray-600">
                  Yes, if you expect your income to be lower than last year. You can apply to reduce payments
                  through your HMRC online account. But be careful - if you reduce them too much, you'll be
                  charged interest on the underpayment.
                </p>
              </div>
            </div>
            
            <Alert className="border-amber-300 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Warning:</strong> Even if your income drops significantly, don't forget you still 
                need to make these payments unless you apply to reduce them.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-900 flex items-center gap-1 mb-2">
                  <Calculator className="h-4 w-4" />
                  Budgeting Tips
                </h5>
                <ul className="text-sm text-green-800 space-y-2">
                  <li>• Open a separate "tax" savings account</li>
                  <li>• Save 25-30% of your income monthly</li>
                  <li>• After first year, divide annual tax by 12 and save monthly</li>
                  <li>• Use accounting software with tax estimators</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-900 flex items-center gap-1 mb-2">
                  <Calendar className="h-4 w-4" />
                  Key Dates
                </h5>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• 31 January: Tax bill + First payment on account</li>
                  <li>• 31 July: Second payment on account</li>
                  <li>• Apply to reduce payments anytime before due date</li>
                  <li>• Set reminders 1 month before deadlines</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-900 flex items-center gap-1 mb-2">
                  <Info className="h-4 w-4" />
                  Reducing Payments Safely
                </h5>
                <ul className="text-sm text-purple-800 space-y-2">
                  <li>• Only reduce if you're confident income will be lower</li>
                  <li>• Keep evidence of why your income has decreased</li>
                  <li>• Don't reduce below what you'll likely owe</li>
                  <li>• Remember, interest applies to underpayments</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <h5 className="font-semibold text-amber-900 flex items-center gap-1 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  Common Mistakes
                </h5>
                <ul className="text-sm text-amber-800 space-y-2">
                  <li>• Not budgeting for first year "double payment"</li>
                  <li>• Forgetting July payment deadline</li>
                  <li>• Reducing payments without valid reason</li>
                  <li>• Not adjusting for significant income changes</li>
                </ul>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Additional Help</h4>
              <p className="text-sm text-gray-600">
                If you're struggling to pay, contact HMRC as soon as possible to discuss your options. 
                You may be able to set up a payment plan. The earlier you contact them, the more options you'll have.
              </p>
              
              <Button className="mt-3 w-full" variant="outline" asChild>
                <a href="https://www.gov.uk/pay-self-assessment-tax-bill/pay-in-instalments" target="_blank" rel="noopener noreferrer">
                  HMRC Payment Plan Information
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentsOnAccountGuide;
