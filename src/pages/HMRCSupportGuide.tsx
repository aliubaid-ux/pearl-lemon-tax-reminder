
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
                HMRC Support Guide
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Get the help you need from HMRC - when and how to contact them effectively for the best results
              </p>
            </div>
          </div>

          <div className="pt-8">
            <HMRCSupportGuide />
          </div>
          
          {/* Enhanced Quick Reference */}
          <div className="mt-12 bg-green-50 dark:bg-green-900/20 p-8 rounded-xl border border-green-200 dark:border-green-700 shadow-lg">
            <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100 mb-6">
              📞 Emergency Contact Quick Reference
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-green-800 dark:text-green-200">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-3">Self Assessment Helpline</h4>
                <p className="text-2xl font-mono font-bold">0300 200 3310</p>
                <p className="text-base">Open 8am to 8pm Mon-Fri, 8am to 4pm Sat</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-3">VAT Helpline</h4>
                <p className="text-2xl font-mono font-bold">0300 200 3700</p>
                <p className="text-base">Open 8am to 6pm Mon-Fri</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMRCSupportGuidePage;
