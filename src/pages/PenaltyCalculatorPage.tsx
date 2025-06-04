
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import PenaltyCalculator from '@/components/PenaltyCalculator';
import QuickDeadlineLookup from '@/components/QuickDeadlineLookup';
import PenaltyScenarios from '@/components/PenaltyScenarios';
import DownloadableChecklists from '@/components/DownloadableChecklists';
import TemplateLetters from '@/components/TemplateLetters';

const PenaltyCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              Penalty Calculator & Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Calculate penalties and access helpful resources for tax compliance
            </p>
          </div>
        </div>

        <div className="grid gap-8">
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
          
          {/* Quick Access Links */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-6 text-center">
              Need More Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/hmrc-support-guide')}
                className="h-auto p-4 text-left bg-white dark:bg-gray-800"
              >
                <div>
                  <div className="font-medium">HMRC Support</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get official help</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/common-tax-issues')}
                className="h-auto p-4 text-left bg-white dark:bg-gray-800"
              >
                <div>
                  <div className="font-medium">Common Issues</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Solve frequent problems</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/settings')}
                className="h-auto p-4 text-left bg-white dark:bg-gray-800"
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
