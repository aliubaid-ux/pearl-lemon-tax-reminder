
import React from 'react';
import SharedHeader from '@/components/SharedHeader';
import SubscriptionManager from '@/components/subscription/SubscriptionManager';

const SubscriptionPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SharedHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Unlock the full potential of UK Tax Doctor with our premium features
            </p>
          </div>
          <SubscriptionManager />
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPage;
