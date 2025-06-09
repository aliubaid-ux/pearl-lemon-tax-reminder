
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
      
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="space-y-8">
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="mb-6 px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                Payments on Account Guide
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Understand advance tax payments and plan your cash flow accordingly to avoid surprises
              </p>
            </div>
          </div>

          <div className="pt-8">
            <PaymentsOnAccountGuide />
          </div>
          
          {/* Enhanced Key Dates */}
          <div className="mt-12 bg-teal-50 dark:bg-teal-900/20 p-8 rounded-xl border border-teal-200 dark:border-teal-700 shadow-lg">
            <h3 className="text-2xl font-semibold text-teal-900 dark:text-teal-100 mb-6">
              💰 Payment on Account Dates
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-teal-800 dark:text-teal-200">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-3">First Payment</h4>
                <ul className="space-y-2 text-base">
                  <li>• Due: January 31st</li>
                  <li>• 50% of previous year's tax bill</li>
                  <li>• Same deadline as Self Assessment</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-3">Second Payment</h4>
                <ul className="space-y-2 text-base">
                  <li>• Due: July 31st</li>
                  <li>• Remaining 50% of estimate</li>
                  <li>• Mid-year payment date</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsOnAccountGuidePage;
