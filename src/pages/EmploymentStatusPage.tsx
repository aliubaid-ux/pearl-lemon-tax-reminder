
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import EmploymentStatusChecker from '@/components/EmploymentStatusChecker';

const EmploymentStatusPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              Employment Status Checker
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Determine whether you're employed, self-employed, or working via a limited company
            </p>
          </div>
        </div>

        <EmploymentStatusChecker />
        
        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            🏢 Why Employment Status Matters
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-blue-800 dark:text-blue-200">
            <div>
              <h4 className="font-semibold mb-2">Tax Obligations</h4>
              <ul className="space-y-1 text-sm">
                <li>• Different tax deadlines</li>
                <li>• Varying deduction rules</li>
                <li>• Separate reporting requirements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Rights & Benefits</h4>
              <ul className="space-y-1 text-sm">
                <li>• Employment protection</li>
                <li>• Pension contributions</li>
                <li>• Holiday entitlement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">IR35 Considerations</h4>
              <ul className="space-y-1 text-sm">
                <li>• Off-payroll working rules</li>
                <li>• Determination statements</li>
                <li>• Contract structure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentStatusPage;
