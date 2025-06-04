
import React from 'react';
import VATThresholdMonitor from '@/components/VATThresholdMonitor';

const VATCalculatorPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">VAT Threshold Calculator</h1>
          <p className="text-lg text-gray-600">
            Monitor your turnover against the £85,000 VAT registration threshold and plan ahead.
          </p>
        </div>
        <VATThresholdMonitor />
      </div>
    </div>
  );
};

export default VATCalculatorPage;
