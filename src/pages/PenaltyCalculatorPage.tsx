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
          
          {/* Existing Pro Tips */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              💡 Pro Tips for Avoiding Penalties
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Set up calendar reminders 2 weeks before deadlines</li>
              <li>• File early even if you can't pay immediately</li>
              <li>• Keep detailed records to support any appeals</li>
              <li>• Use HMRC's online services for faster processing</li>
            </ul>
          </div>
          
          {/* Existing Common Scenarios */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">
              🚨 Common Penalty Scenarios
            </h3>
            <div className="space-y-3 text-amber-800">
              <div>
                <strong>Self Assessment:</strong> £100 for 1 day late, then £10/day up to £900
              </div>
              <div>
                <strong>Corporation Tax:</strong> £100-£1,000 depending on company size
              </div>
              <div>
                <strong>VAT Returns:</strong> 15% of VAT owed or £400 minimum
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenaltyCalculatorPage;
