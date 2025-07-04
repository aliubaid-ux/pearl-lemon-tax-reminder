
import React from 'react';
import UnifiedNavigation from '@/components/navigation/UnifiedNavigation';
import WelcomeHero from '@/components/WelcomeHero';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <UnifiedNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <WelcomeHero />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
