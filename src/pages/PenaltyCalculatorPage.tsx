
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SharedHeader from '@/components/SharedHeader';
import PenaltyCalculator from '@/components/PenaltyCalculator';
import QuickDeadlineLookup from '@/components/QuickDeadlineLookup';
import PenaltyScenarios from '@/components/PenaltyScenarios';
import DownloadableChecklists from '@/components/DownloadableChecklists';
import TemplateLetters from '@/components/TemplateLetters';

const PenaltyCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SharedHeader 
        title="Penalty Calculator & Tools"
        subtitle="Calculate penalties and access helpful resources for tax compliance"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
          <PenaltyCalculator />
          
          {/* Additional Tools Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <QuickDeadlineLookup />
            <PenaltyScenarios />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <DownloadableChecklists />
            <TemplateLetters />
          </div>
          
          {/* Pro Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💡 Pro Tips for Avoiding Penalties
            </h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200">
              <li>• Set up calendar reminders 2 weeks before deadlines</li>
              <li>• File early even if you can't pay immediately</li>
              <li>• Keep detailed records to support any appeals</li>
              <li>• Use HMRC's online services for faster processing</li>
              <li>• Consider setting up a time to pay arrangement if needed</li>
              <li>• Save all correspondence with HMRC for your records</li>
            </ul>
          </div>
          
          {/* Common Scenarios */}
          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">
              🚨 Common Penalty Scenarios
            </h3>
            <div className="space-y-3 text-amber-800 dark:text-amber-200">
              <div>
                <strong>Self Assessment:</strong> £100 for 1 day late, then £10/day up to £900 after 90 days
              </div>
              <div>
                <strong>Corporation Tax:</strong> £100-£1,000 depending on company size and how late
              </div>
              <div>
                <strong>VAT Returns:</strong> 15% of VAT owed or £400 minimum for late filing
              </div>
              <div>
                <strong>PAYE/CIS:</strong> Penalties can range from £100 to £400 per month depending on employees
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
              🔗 Quick Access Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/hmrc-support-guide')}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium">HMRC Support</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get official help</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/common-tax-issues')}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium">Common Issues</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Solve frequent problems</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/settings')}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium">Set Reminders</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Never miss a deadline</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenaltyCalculatorPage;
