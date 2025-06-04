
import React from 'react';
import PenaltyCalculator from '@/components/PenaltyCalculator';

const PenaltyCalculatorPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HMRC Penalty Calculator</h1>
          <p className="text-lg text-gray-600">
            Calculate potential penalties for late tax submissions and understand the costs of missing deadlines.
          </p>
        </div>
        <PenaltyCalculator />
      </div>
    </div>
  );
};

export default PenaltyCalculatorPage;
