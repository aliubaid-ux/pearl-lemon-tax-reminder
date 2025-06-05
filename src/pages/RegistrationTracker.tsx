
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import RegistrationTracker from '@/components/RegistrationTracker';

const RegistrationTrackerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              Registration Tracker
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Track your tax registration deadlines and avoid late registration penalties
            </p>
          </div>
        </div>

        <RegistrationTracker />
        
        {/* Important Dates */}
        <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
            📅 Key Registration Deadlines
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-purple-800 dark:text-purple-200">
            <div>
              <h4 className="font-semibold mb-2">Self Assessment</h4>
              <ul className="space-y-1 text-sm">
                <li>• Register by October 5th following tax year end</li>
                <li>• Late registration penalties start at £100</li>
                <li>• Additional penalties for continued delay</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">VAT Registration</h4>
              <ul className="space-y-1 text-sm">
                <li>• Register within 30 days of crossing threshold</li>
                <li>• £85,000 threshold for 2024/25</li>
                <li>• Penalties for late registration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTrackerPage;
