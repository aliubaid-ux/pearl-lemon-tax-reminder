
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calculator, Calendar, AlertTriangle, Info, DollarSign, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PaymentsOnAccountGuide: React.FC = () => {
  const [lastYearTax, setLastYearTax] = useState<string>('');
  const [calculatedPayment, setCalculatedPayment] = useState<number | null>(null);
  const { toast } = useToast();

  const calculatePaymentOnAccount = () => {
    const tax = parseFloat(lastYearTax);
    if (isNaN(tax) || tax < 1000) {
      toast({
        title: "No Payment Required",
        description: "Payments on account are only required if last year's tax was £1,000 or more.",
        variant: "default"
      });
      setCalculatedPayment(0);
      return;
    }
    
    const payment = tax / 2;
    setCalculatedPayment(payment);
    toast({
      title: "Calculation Complete",
      description: `Each payment on account: £${payment.toFixed(2)}`,
    });
  };

  const paymentDates = [
    {
      date: "31st January",
      description: "First payment on account + any balance owed",
      year: "Current year"
    },
    {
      date: "31st July",
      description: "Second payment on account",
      year: "Current year"
    }
  ];

  const examples = [
    {
      scenario: "Self-employed earning £50,000",
      lastYearTax: 8000,
      payment: 4000,
      explanation: "Tax bill was £8,000, so each payment is £4,000"
    },
    {
      scenario: "Small business with £30,000 profit",
      lastYearTax: 4500,
      payment: 2250,
      explanation: "Tax bill was £4,500, so each payment is £2,250"
    },
    {
      scenario: "Part-time freelancer",
      lastYearTax: 800,
      payment: 0,
      explanation: "Tax bill under £1,000, so no payments required"
    }
  ];

  const reductionReasons = [
    "Your income has significantly decreased",
    "You expect to pay less tax this year",
    "You've made large pension contributions",
    "You've claimed significant business expenses",
    "You've reduced your working hours"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments on Account Guide</h1>
        <p className="text-gray-600">Understand and calculate your advance tax payments</p>
      </div>

      {/* What are Payments on Account */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            What are Payments on Account?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Payments on account are advance payments towards your next year's Income Tax and Class 4 National Insurance. 
            They're based on the previous year's tax bill and help spread the cost of your tax throughout the year.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Key Points:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Required if last year's tax was £1,000 or more</li>
              <li>• Split into two equal payments</li>
              <li>• Due on 31st January and 31st July</li>
              <li>• Can be reduced if you expect to pay less tax</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Payment Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Year's Tax Bill (£)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={lastYearTax}
                onChange={(e) => setLastYearTax(e.target.value)}
              />
            </div>
            <Button onClick={calculatePaymentOnAccount} className="w-full">
              Calculate Payment
            </Button>
            
            {calculatedPayment !== null && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Your Payments:</h4>
                <div className="text-lg font-bold text-green-800">
                  £{calculatedPayment.toFixed(2)} each
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Due on 31st January and 31st July
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Dates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Important Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentDates.map((date, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{date.date}</h4>
                  <Badge variant="outline">{date.year}</Badge>
                </div>
                <p className="text-sm text-gray-600">{date.description}</p>
              </div>
            ))}
            
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Late Payment</h4>
              </div>
              <p className="text-sm text-amber-800">
                Interest is charged on late payments from the due date until paid in full.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Real Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {examples.map((example, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{example.scenario}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Last year's tax:</span>
                      <span className="font-medium">£{example.lastYearTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Each payment:</span>
                      <span className="font-medium">£{example.payment.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{example.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reducing Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Reducing Your Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 text-sm">
              You can reduce your payments on account if you expect to pay less tax this year:
            </p>
            <ul className="text-sm space-y-2">
              {reductionReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <p className="text-sm text-amber-800">
                <strong>Warning:</strong> If you reduce too much, you may face interest charges on the shortfall.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Getting Help */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded">
                <h4 className="font-medium">Online Banking</h4>
                <p className="text-sm text-gray-600">Direct transfer using your UTR as reference</p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">Direct Debit</h4>
                <p className="text-sm text-gray-600">Set up automatic payments to avoid missing deadlines</p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">Credit/Debit Card</h4>
                <p className="text-sm text-gray-600">Pay online with a small fee (1.25%)</p>
              </div>
              <div className="p-3 border rounded">
                <h4 className="font-medium">CHAPS</h4>
                <p className="text-sm text-gray-600">Same-day payment for urgent situations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Budget in Advance</h4>
              <p className="text-sm text-blue-800">Set aside money monthly to cover your payments on account</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Use Direct Debit</h4>
              <p className="text-sm text-green-800">Avoid late payment penalties with automatic payments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsOnAccountGuide;
