
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import HMRCSupportGuide from '@/components/HMRCSupportGuide';

const HMRCSupportGuidePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              HMRC Support Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get the help you need from HMRC - when and how to contact them effectively
            </p>
          </div>
        </div>

        <HMRCSupportGuide />
        
        {/* Quick Reference */}
        <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
            📞 Emergency Contact Quick Reference
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-green-800 dark:text-green-200">
            <div>
              <h4 className="font-semibold mb-2">Self Assessment Helpline</h4>
              <p className="text-lg font-mono">0300 200 3310</p>
              <p className="text-sm">Open 8am to 8pm Mon-Fri, 8am to 4pm Sat</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">VAT Helpline</h4>
              <p className="text-lg font-mono">0300 200 3700</p>
              <p className="text-sm">Open 8am to 6pm Mon-Fri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMRCSupportGuidePage;
