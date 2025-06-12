
import React from 'react';
import SharedHeader from '@/components/SharedHeader';
import SubscriptionManager from '@/components/subscription/SubscriptionManager';

const SubscriptionPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SharedHeader 
        title="Choose Your Plan"
        subtitle="Unlock the full potential of UK Tax Doctor with our premium features"
      />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <SubscriptionManager />
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPage;
