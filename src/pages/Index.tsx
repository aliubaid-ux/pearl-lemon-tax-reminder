
import React, { useState, useEffect } from 'react';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import WelcomeHero from '@/components/WelcomeHero';
import QuickAccessDashboard from '@/components/QuickAccessDashboard';
import UserOnboarding from '@/components/UserOnboarding';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import GlobalSearch from '@/components/GlobalSearch';
import DeadlineFilters from '@/components/DeadlineFilters';
import MainTabs from '@/components/MainTabs';
import VisualDeadlineDisplay from '@/components/VisualDeadlineDisplay';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { TaxDeadline } from '@/types/tax';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BarChart3 } from 'lucide-react';

const Index: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [deadlines, setDeadlines] = useState<TaxDeadline[]>([]);
  const [filteredDeadlines, setFilteredDeadlines] = useState<TaxDeadline[]>([]);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('uk-tax-doctor-onboarding-complete');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }

    // Load deadlines - default to 'both' for all deadlines
    const userType = localStorage.getItem('uk-tax-doctor-user-type') || 'both';
    const loadedDeadlines = getTaxDeadlines(userType as any);
    setDeadlines(loadedDeadlines);
    setFilteredDeadlines(loadedDeadlines);

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setShowSearch(true);
            break;
          case 'f':
            e.preventDefault();
            setShowFilters(true);
            break;
        }
      }
      if (e.key === '?') {
        e.preventDefault();
        setShowShortcuts(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('uk-tax-doctor-onboarding-complete', 'true');
  };

  const handleFilterChange = (filtered: TaxDeadline[]) => {
    setFilteredDeadlines(filtered);
    setShowFilters(false);
  };

  // Get upcoming deadlines for quick access dashboard
  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);
  const upcomingDeadlines = filteredDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= oneMonthFromNow;
  });

  // Get user type for visual display
  const userType = localStorage.getItem('uk-tax-doctor-user-type') || 'both';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <StreamlinedNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <WelcomeHero />
        
        <Tabs defaultValue="deadlines" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="deadlines" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Tax Deadlines
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Quick Access
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="deadlines" className="space-y-6">
            <VisualDeadlineDisplay 
              deadlines={filteredDeadlines}
              userType={userType}
            />
            <MainTabs
              filteredDeadlines={filteredDeadlines}
              upcomingDeadlines={upcomingDeadlines}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              userType={userType}
            />
          </TabsContent>
          
          <TabsContent value="dashboard" className="space-y-6">
            <QuickAccessDashboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <UserOnboarding
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />

      <KeyboardShortcuts
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      <GlobalSearch
        deadlines={deadlines}
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />

      <DeadlineFilters
        deadlines={deadlines}
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default Index;
