
import React, { useState, useEffect } from 'react';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import WelcomeHero from '@/components/WelcomeHero';
import QuickAccessDashboard from '@/components/QuickAccessDashboard';
import TaxCalendar from '@/components/TaxCalendar';
import UserOnboarding from '@/components/UserOnboarding';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import GlobalSearch from '@/components/GlobalSearch';
import DeadlineFilters from '@/components/DeadlineFilters';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { TaxDeadline } from '@/types/tax';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <StreamlinedNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <WelcomeHero />
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Full Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <QuickAccessDashboard />
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  UK Tax Calendar 2024-2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaxCalendar 
                  deadlines={filteredDeadlines}
                  selectedMonth={selectedMonth}
                  onMonthChange={setSelectedMonth}
                />
              </CardContent>
            </Card>
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
