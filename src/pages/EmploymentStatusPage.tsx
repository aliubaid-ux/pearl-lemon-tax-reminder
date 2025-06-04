
import React from 'react';
import EmploymentStatusChecker from '@/components/EmploymentStatusChecker';

const EmploymentStatusPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Employment Status Checker</h1>
          <p className="text-lg text-gray-600">
            Determine whether you're employed or self-employed for tax purposes with our comprehensive checker.
          </p>
        </div>
        <EmploymentStatusChecker />
      </div>
    </div>
  );
};

export default EmploymentStatusPage;
