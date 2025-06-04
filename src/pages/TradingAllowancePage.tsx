
import React from 'react';
import TradingAllowanceCalculator from '@/components/TradingAllowanceCalculator';

const TradingAllowancePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trading Allowance Calculator</h1>
          <p className="text-lg text-gray-600">
            Check if you need to file Self Assessment and optimize your trading allowance vs actual expenses.
          </p>
        </div>
        <TradingAllowanceCalculator />
      </div>
    </div>
  );
};

export default TradingAllowancePage;
