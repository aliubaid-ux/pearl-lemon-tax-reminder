
import React from 'react';
import { AlertTriangle, Calculator, FileText, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PenaltyCalculator from '@/components/PenaltyCalculator';

const PenaltiesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Tax Penalties</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Calculate and understand UK tax penalties</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Use our penalty calculator to estimate potential fines for late tax submissions and payments.
          </p>
        </div>

        {/* Penalty Calculator */}
        <div className="mb-8">
          <PenaltyCalculator />
        </div>

        {/* Penalty Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-orange-600" />
                Self Assessment Penalties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Late Filing Penalties</h4>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  <li>• £100 - 1 day late</li>
                  <li>• £10/day - 3+ months late (max £900)</li>
                  <li>• £300 or 5% of tax due - 6+ months late</li>
                  <li>• £300 or 5% of tax due - 12+ months late</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Late Payment Penalties</h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• 5% - 30 days late</li>
                  <li>• 5% - 6 months late</li>
                  <li>• 5% - 12 months late</li>
                  <li>• Interest charged daily</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-green-600" />
                Corporation Tax Penalties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Late Filing Penalties</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• £100 - 1-3 months late</li>
                  <li>• £200 - 3+ months late</li>
                  <li>• 10% of unpaid tax or £500 minimum - 6+ months</li>
                  <li>• 20% of unpaid tax or £1,000 minimum - 12+ months</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Late Payment Penalties</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Interest charged from due date</li>
                  <li>• Currently 7.75% per year</li>
                  <li>• Calculated daily on outstanding amount</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Notice</h3>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  These penalty calculations are estimates based on current HMRC rates and may not reflect your exact situation. 
                  Always consult with a qualified tax professional or contact HMRC directly for official penalty assessments. 
                  Interest rates and penalty amounts may change.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PenaltiesPage;
