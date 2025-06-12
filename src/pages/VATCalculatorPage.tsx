
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
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              VAT Threshold Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Monitor your turnover against the £85,000 VAT registration threshold and plan ahead.
            </p>
          </div>
          <VATThresholdMonitor />
        </div>
      </div>
    </div>
  );
};

export default VATCalculatorPage;
