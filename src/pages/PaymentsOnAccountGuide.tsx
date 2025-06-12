
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import PaymentsOnAccountGuide from '@/components/PaymentsOnAccountGuide';

const PaymentsOnAccountGuidePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <StreamlinedNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Payments on Account Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Understand advance tax payments and plan your cash flow accordingly
            </p>
          </div>
        </div>

        <PaymentsOnAccountGuide />
        
        {/* Key Dates */}
        <div className="mt-8 bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-700">
          <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100 mb-3">
            💰 Payment on Account Dates
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-teal-800 dark:text-teal-200">
            <div>
              <h4 className="font-semibold mb-2">First Payment</h4>
              <ul className="space-y-1 text-sm">
                <li>• Due: January 31st</li>
                <li>• 50% of previous year's tax bill</li>
                <li>• Same deadline as Self Assessment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Second Payment</h4>
              <ul className="space-y-1 text-sm">
                <li>• Due: July 31st</li>
                <li>• Remaining 50% of estimate</li>
                <li>• Mid-year payment date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsOnAccountGuidePage;
