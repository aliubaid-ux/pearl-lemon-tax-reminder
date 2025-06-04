
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { loadUserData, saveUserData } from '@/utils/storage';
import UserTypeSelector from '@/components/UserTypeSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import GlobalSearch from '@/components/GlobalSearch';
import DeadlineFilters from '@/components/DeadlineFilters';
import NotificationCenter from '@/components/NotificationCenter';
import CalendarIntegration from '@/components/CalendarIntegration';
import EnhancedMobileNavigation from '@/components/EnhancedMobileNavigation';
import UserOnboarding from '@/components/UserOnboarding';
import { AlertTriangle, CheckCircle, Calendar, Search, Filter, Bell, Download, ExternalLink } from 'lucide-react';
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
    .slice(0, 5);

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
      case 'calendar-integration':
        // Scroll to calendar integration section
        document.getElementById('calendar-integration')?.scrollIntoView({ behavior: 'smooth' });
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

  const handleQuickCalendarExport = () => {
    // Generate ICS content for ALL deadlines for the next 12 months
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    const allYearDeadlines = getTaxDeadlines(userType).filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate >= today && deadlineDate <= nextYear;
    });

    const icsEvents = allYearDeadlines.map(deadline => {
      const date = new Date(deadline.date);
      const dateStr = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      
      return `BEGIN:VEVENT
UID:${deadline.id}@uktaxcalendar.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
DTSTART;VALUE=DATE:${dateStr.substring(0, 8)}
SUMMARY:${deadline.title}
DESCRIPTION:${deadline.description || 'UK Tax Deadline'}\\n\\nPriority: ${deadline.priority}\\nCategory: ${deadline.category}
CATEGORIES:TAX,DEADLINE,${deadline.priority.toUpperCase()}
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${deadline.title} due in 7 days
END:VALARM
END:VEVENT`;
    }).join('\n');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UK Tax Calendar Professional//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:UK Tax Calendar - ${userType.replace('-', ' ').toUpperCase()}
${icsEvents}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `uk-tax-calendar-${userType}-${new Date().getFullYear()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Calendar Export Complete',
      description: `All ${allYearDeadlines.length} tax deadlines for the next 12 months exported. Import the file to your calendar app.`,
    });
  };

  // Listen for quick export event
  useEffect(() => {
    const handleQuickExport = () => {
      handleQuickCalendarExport();
    };

    document.addEventListener('quickCalendarExport', handleQuickExport);
    return () => document.removeEventListener('quickCalendarExport', handleQuickExport);
  }, [userType]);

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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with Enhanced Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              UK Tax Calendar Professional
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Never miss a tax deadline - sync all your deadlines to your calendar in seconds
            </p>
          </div>
          <div className="flex items-center gap-3">
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

        {/* Step 2: Critical Upcoming Deadlines */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Step 2: Critical Deadlines to Act On Now
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Important deadlines you need to prepare for in the next 3 months
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
                Next 3 Months - Take Action Now
                <div className="flex gap-2 ml-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleQuickCalendarExport}
                    className="text-green-600 hover:bg-green-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Quick Export
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
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
        <section id="calendar-integration" className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Step 3: Integrate with Your Calendar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Add ALL your tax deadlines for the next 12 months to your calendar app
            </p>
          </div>
          
          <CalendarIntegration deadlines={filteredDeadlines} userType={userType} />
        </section>

        {/* Success Message */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                🎉 You're All Set!
              </h3>
              <p className="text-green-800 text-lg mb-4">
                Your tax deadlines are now integrated with your calendar. You'll never miss another deadline.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit HMRC Portal
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleQuickCalendarExport}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Again
                </Button>
              </div>
            </CardContent>
          </Card>
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
