
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SharedHeader from '@/components/SharedHeader';
import TradingAllowanceCalculator from '@/components/TradingAllowanceCalculator';
import QuickDeadlineLookup from '@/components/QuickDeadlineLookup';
import DownloadableChecklists from '@/components/DownloadableChecklists';

const TradingAllowancePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SharedHeader 
        title="Trading Allowance Tools"
        subtitle="Check eligibility and manage your trading allowance efficiently"
      />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Main Calculator */}
          <TradingAllowanceCalculator />
          
          {/* Additional Tools */}
          <div className="grid lg:grid-cols-2 gap-6">
            <QuickDeadlineLookup />
            <DownloadableChecklists />
          </div>
          
          {/* Trading Allowance Information */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              📊 Trading Allowance Quick Facts
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-green-800">
              <div>
                <h4 className="font-semibold mb-2">What is it?</h4>
                <ul className="space-y-1 text-sm">
                  <li>• £1,000 annual tax-free allowance</li>
                  <li>• For trading, casual or miscellaneous income</li>
                  <li>• Alternative to claiming actual expenses</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Who can use it?</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Anyone with trading income under £1,000</li>
                  <li>• Freelancers, gig workers, side hustlers</li>
                  <li>• Online sellers, tutors, consultants</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingAllowancePage;
