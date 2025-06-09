
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import VATThresholdMonitor from '@/components/VATThresholdMonitor';

const VATCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <StreamlinedNavigation />
      
      <div className="container mx-auto py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="mb-6 px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                VAT Threshold Calculator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Monitor your turnover against the £85,000 VAT registration threshold and plan ahead with confidence.
              </p>
            </div>
          </div>
          
          <div className="pt-8">
            <VATThresholdMonitor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VATCalculatorPage;
