
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { loadUserData, saveUserData } from '@/utils/storage';
import UserTypeSelector from '@/components/UserTypeSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import SmartDeadlineGroups from '@/components/SmartDeadlineGroups';
import GlobalSearch from '@/components/GlobalSearch';
import DeadlineFilters from '@/components/DeadlineFilters';
import NotificationCenter from '@/components/NotificationCenter';
import CalendarIntegration from '@/components/CalendarIntegration';
import EnhancedMobileNavigation from '@/components/EnhancedMobileNavigation';
import UserOnboarding from '@/components/UserOnboarding';
import { AlertTriangle, CheckCircle, Calendar, Search, Filter, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [filteredDeadlines, setFilteredDeadlines] = useState(getTaxDeadlines('self-employed'));
  const [displayDeadlines, setDisplayDeadlines] = useState(getTaxDeadlines('self-employed'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const { toast } = useToast();

  // Load user data on mount
  useEffect(() => {
    const userData = loadUserData();
    setUserType(userData.userType);
    const deadlines = getTaxDeadlines(userData.userType);
    setFilteredDeadlines(deadlines);
    setDisplayDeadlines(deadlines);

    // Check if user is new (show onboarding)
    const hasSeenOnboarding = localStorage.getItem('uk-tax-calendar-onboarding-complete');
    if (!hasSeenOnboarding) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const upcomingDeadlines = filteredDeadlines
    .filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const today = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(today.getMonth() + 3);
      return deadlineDate >= today && deadlineDate <= threeMonthsFromNow;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const urgentCount = filteredDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);
    return deadlineDate >= today && deadlineDate <= oneWeekFromNow && deadline.priority === 'high';
  }).length;

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    const deadlines = getTaxDeadlines(type);
    setFilteredDeadlines(deadlines);
    setDisplayDeadlines(deadlines);
    saveUserData({ userType: type });
    toast({
      title: "Profile Updated!",
      description: `Your calendar is now personalized for ${type.replace('-', ' ')} activities.`,
    });
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'search':
        setIsSearchOpen(true);
        break;
      case 'filter':
        setIsFiltersOpen(true);
        break;
      default:
        console.log('Quick action:', action);
    }
  };

  const handleFilterChange = (filtered: typeof filteredDeadlines) => {
    setDisplayDeadlines(filtered);
  };

  const handleOnboardingComplete = () => {
    setIsOnboardingOpen(false);
    localStorage.setItem('uk-tax-calendar-onboarding-complete', 'true');
    toast({
      title: "Welcome aboard! 🎉",
      description: "You're all set to manage your tax deadlines like a pro.",
      duration: 5000,
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'k':
            event.preventDefault();
            setIsSearchOpen(true);
            break;
          case 'f':
            event.preventDefault();
            setIsFiltersOpen(true);
            break;
        }
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Enhanced Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Your Tax Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay on top of your UK tax deadlines with personalized reminders and tools
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Quick Action Buttons */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
              <Badge variant="secondary" className="ml-2 text-xs">⌘K</Badge>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsFiltersOpen(true)}
              className="hidden md:flex"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <NotificationCenter deadlines={filteredDeadlines} />
            <EnhancedMobileNavigation 
              urgentCount={urgentCount}
              onQuickAction={handleQuickAction}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenFilters={() => setIsFiltersOpen(true)}
            />
            <ThemeToggle />
          </div>
        </div>

        {/* Step 1: User Type Selection */}
        <section className="mb-12 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Step 1: Choose Your Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              This personalizes your tax calendar with the deadlines that matter to you
            </p>
          </div>
          <UserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </section>

        {/* Step 2: Priority Deadlines */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Step 2: Your Priority Deadlines
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Your most important upcoming tax deadlines
              {urgentCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {urgentCount} urgent
                </Badge>
              )}
            </p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg max-w-4xl mx-auto">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                Next 3 Months
                <div className="flex gap-2 ml-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsFiltersOpen(true)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{deadline.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(deadline.date).toLocaleDateString('en-GB', { 
                            weekday: 'long',
                            day: 'numeric', 
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                        {deadline.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {deadline.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={deadline.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}>
                          {deadline.priority}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium">All caught up!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">No urgent deadlines in the next 3 months</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Step 3: Calendar Integration */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Step 3: Calendar Integration
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Sync your deadlines with your preferred calendar application
            </p>
          </div>
          
          <CalendarIntegration deadlines={filteredDeadlines} userType={userType} />
        </section>

        {/* Step 4: All Deadlines */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Step 4: Complete Deadlines Calendar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              All your tax deadlines organized by category and importance
            </p>
          </div>
          
          <SmartDeadlineGroups deadlines={displayDeadlines} />
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            2025 UK Tax Calendar Professional - Advanced tax deadline management by Pearl Lemon Accountants
          </p>
        </footer>
      </div>

      {/* Modal Components */}
      <GlobalSearch 
        deadlines={filteredDeadlines}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      
      <DeadlineFilters
        deadlines={filteredDeadlines}
        onFilterChange={handleFilterChange}
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />

      <UserOnboarding
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Index;
