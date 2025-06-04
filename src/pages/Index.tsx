
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { loadUserData, saveUserData } from '@/utils/storage';
import EnhancedUserTypeSelector from '@/components/EnhancedUserTypeSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import GlobalSearch from '@/components/GlobalSearch';
import DeadlineFilters from '@/components/DeadlineFilters';
import NotificationCenter from '@/components/NotificationCenter';
import CalendarIntegration from '@/components/CalendarIntegration';
import EnhancedMobileNavigation from '@/components/EnhancedMobileNavigation';
import UserOnboarding from '@/components/UserOnboarding';
import ModernCard from '@/components/ModernCard';
import AnimatedButton from '@/components/AnimatedButton';
import ModernBadge from '@/components/ModernBadge';
import ComprehensiveUserGuide from '@/components/ComprehensiveUserGuide';
import { AlertTriangle, CheckCircle, Calendar, Search, Filter, ExternalLink, Download, Settings, Sparkles, Target, Clock, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';
import TaxYearToggle from '@/components/TaxYearToggle';
import ProgressTracker from '@/components/ProgressTracker';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import SmartDeadlineGroups from '@/components/SmartDeadlineGroups';
import EnhancedQuickActions from '@/components/EnhancedQuickActions';
import SmartSuggestions from '@/components/SmartSuggestions';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [filteredDeadlines, setFilteredDeadlines] = useState(getTaxDeadlines('self-employed'));
  const [displayDeadlines, setDisplayDeadlines] = useState(getTaxDeadlines('self-employed'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);
  const [currentTaxYear, setCurrentTaxYear] = useState('2024-2025');
  const { toast } = useToast();
  const navigate = useNavigate();

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
      case 'user-guide':
        setIsUserGuideOpen(true);
        break;
      case 'calendar-integration':
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
    localStorage.setItem('uk-tax-doctor-onboarding-complete', 'true');
    toast({
      title: "Welcome to UK Tax Doctor! 🎉",
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

  const handleShowShortcuts = () => {
    setIsShortcutsOpen(true);
  };

  const handleTaxYearChange = (taxYear: string) => {
    setCurrentTaxYear(taxYear);
    toast({
      title: "Tax Year Changed",
      description: `Now viewing deadlines for ${taxYear}`,
    });
  };

  // Enhanced keyboard shortcuts
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
          case 'e':
            event.preventDefault();
            handleQuickCalendarExport();
            break;
          case 'd':
            event.preventDefault();
            // Jump to current tax year
            const currentYear = getCurrentTaxYear();
            setCurrentTaxYear(currentYear);
            break;
        }
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsFiltersOpen(false);
        setIsShortcutsOpen(false);
      }
      if (event.key === '?') {
        event.preventDefault();
        setIsShortcutsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getCurrentTaxYear = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const isAfterApril5 = now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() >= 6);
    return isAfterApril5 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Modern Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl" />
          
          <div className="relative flex items-center justify-between mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <ModernBadge variant="info" size="sm">
                  2025 Professional Edition
                </ModernBadge>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                UK Tax Doctor
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Your AI-powered tax specialist - diagnose deadlines, prescribe solutions, and cure tax compliance headaches
              </p>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {/* Fixed Navigation Menu with proper z-index and background */}
              <div className="hidden lg:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-white/90 backdrop-blur-sm">Tax Calculators</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[400px] bg-white dark:bg-gray-800 z-[9999] border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm">
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/penalty-calculator')}
                          >
                            <div className="text-sm font-medium leading-none">Penalty Calculator</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Calculate late filing and payment penalties
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/vat-calculator')}
                          >
                            <div className="text-sm font-medium leading-none">VAT Calculator</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Calculate VAT amounts and check thresholds
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/trading-allowance')}
                          >
                            <div className="text-sm font-medium leading-none">Trading Allowance</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Check if you qualify for trading allowance
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-white/90 backdrop-blur-sm">Tax Resources</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[400px] bg-white dark:bg-gray-800 z-[9999] border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm">
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/common-tax-issues')}
                          >
                            <div className="text-sm font-medium leading-none">Common Tax Issues</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Solutions for frequent tax problems
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/hmrc-support-guide')}
                          >
                            <div className="text-sm font-medium leading-none">HMRC Support Guide</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              How to get help from HMRC
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/common-mistakes')}
                          >
                            <div className="text-sm font-medium leading-none">Common Mistakes</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Avoid these common tax filing errors
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-white/90 backdrop-blur-sm">Tools & Help</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[400px] bg-white dark:bg-gray-800 z-[9999] border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg backdrop-blur-sm">
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => setIsUserGuideOpen(true)}
                          >
                            <div className="text-sm font-medium leading-none">📖 Complete User Guide</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Comprehensive guide to using UK Tax Doctor
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/employment-status')}
                          >
                            <div className="text-sm font-medium leading-none">Employment Status</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Check your employment status
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/registration-tracker')}
                          >
                            <div className="text-sm font-medium leading-none">Registration Tracker</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Track your tax registrations
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                            onClick={() => navigate('/settings')}
                          >
                            <div className="text-sm font-medium leading-none">Settings</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Manage your preferences
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <AnimatedButton
                variant="glass"
                size="sm"
                icon={Book}
                onClick={() => setIsUserGuideOpen(true)}
                className="hidden md:flex"
              >
                User Guide
              </AnimatedButton>

              <AnimatedButton
                variant="glass"
                size="sm"
                icon={Search}
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex"
              >
                Search
                <Badge variant="secondary" className="ml-2 text-xs">⌘K</Badge>
              </AnimatedButton>
              
              <AnimatedButton
                variant="glass"
                size="sm"
                icon={Filter}
                onClick={() => setIsFiltersOpen(true)}
                className="hidden md:flex"
              >
                Filter
              </AnimatedButton>

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

          {/* Enhanced Quick Stats with Better Animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ModernCard variant="glass" className="p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white shadow-lg">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active Deadlines</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{filteredDeadlines.length}</p>
                  <p className="text-xs text-gray-500">Personalized for you</p>
                </div>
              </div>
            </ModernCard>
            
            <ModernCard variant="glass" className="p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white shadow-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Upcoming (3 months)</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{upcomingDeadlines.length}</p>
                  <p className="text-xs text-gray-500">Requires attention</p>
                </div>
              </div>
            </ModernCard>
            
            <ModernCard variant="glass" className="p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-white shadow-lg">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Urgent (1 week)</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{urgentCount}</p>
                  <p className="text-xs text-gray-500">Immediate action</p>
                </div>
              </div>
            </ModernCard>
          </div>
        </div>

        {/* Tax Year Toggle */}
        <section className="mb-8">
          <TaxYearToggle 
            currentTaxYear={currentTaxYear}
            onTaxYearChange={handleTaxYearChange}
          />
        </section>

        {/* Smart Suggestions Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI-Powered Recommendations
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Intelligent suggestions tailored to your tax profile to help you stay compliant and optimize your filings
            </p>
          </div>
          <SmartSuggestions deadlines={filteredDeadlines} userType={userType} />
        </section>

        {/* Step 1: Enhanced User Type Selection */}
        <section className="mb-12 animate-slide-up">
          <div className="text-center mb-8">
            <ModernBadge variant="info" size="lg" className="mb-4">
              Step 1
            </ModernBadge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Tax Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              This personalizes your entire tax calendar experience and shows your specific deadlines with intelligent recommendations
            </p>
          </div>
          <EnhancedUserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </section>

        {/* Enhanced Quick Actions */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Access Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Essential tax tools and resources at your fingertips
            </p>
          </div>
          <EnhancedQuickActions
            onSearch={() => setIsSearchOpen(true)}
            onFilter={() => setIsFiltersOpen(true)}
            onExportCalendar={handleQuickCalendarExport}
            onShowShortcuts={handleShowShortcuts}
          />
        </section>

        {/* Progress Tracker and Smart Groups */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Intelligent Deadline Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Track your progress and organize deadlines with smart categorization
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ProgressTracker deadlines={filteredDeadlines} />
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Smart Deadline Groups
              </h3>
              <SmartDeadlineGroups deadlines={filteredDeadlines} />
            </div>
          </div>
        </section>

        {/* Step 2: Critical Upcoming Deadlines */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <ModernBadge variant="warning" size="lg" className="mb-4">
              Step 2
            </ModernBadge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Critical Action Items
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Important deadlines requiring your immediate attention in the next 3 months
              {urgentCount > 0 && (
                <ModernBadge variant="error" className="ml-2">
                  {urgentCount} urgent
                </ModernBadge>
              )}
            </p>
          </div>

          <ModernCard variant="elevated" className="max-w-4xl mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6" />
                <div>
                  <h3 className="text-xl font-semibold">Next 3 Months - Take Action Now</h3>
                  <p className="text-amber-100">Stay ahead of your tax obligations</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id} 
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{deadline.title}</h4>
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
                        <ModernBadge 
                          variant={deadline.priority === 'high' ? 'error' : 'warning'}
                        >
                          {deadline.priority}
                        </ModernBadge>
                        <AnimatedButton 
                          variant="minimal"
                          size="sm"
                          icon={ExternalLink}
                          onClick={() => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank')}
                        >
                          View Details
                        </AnimatedButton>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">All caught up!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">No urgent deadlines in the next 3 months</p>
                </div>
              )}
            </div>
          </ModernCard>
        </section>

        {/* Step 3: Calendar Integration */}
        <section id="calendar-integration" className="mb-12">
          <div className="text-center mb-8">
            <ModernBadge variant="success" size="lg" className="mb-4">
              Step 3
            </ModernBadge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Seamless Calendar Integration
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Add ALL your tax deadlines for the next 12 months to your preferred calendar app with one click
            </p>
          </div>
          
          <CalendarIntegration deadlines={filteredDeadlines} userType={userType} />
        </section>

        {/* Success Message */}
        <section className="mb-12">
          <ModernCard variant="elevated" className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 max-w-4xl mx-auto overflow-hidden">
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-lg">
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                🎉 You're All Set!
              </h3>
              <p className="text-emerald-800 text-lg mb-6">
                Your tax deadlines are now integrated with your calendar. You'll never miss another deadline.
              </p>
              <div className="flex gap-4 justify-center">
                <AnimatedButton 
                  variant="primary"
                  icon={ExternalLink}
                  onClick={() => window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank')}
                >
                  Visit HMRC Portal
                </AnimatedButton>
                <AnimatedButton 
                  variant="glass"
                  icon={Settings}
                  onClick={() => navigate('/settings')}
                >
                  Manage Settings
                </AnimatedButton>
              </div>
            </div>
          </ModernCard>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 rounded-2xl">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              2025 UK Tax Doctor - AI-powered tax deadline management by Pearl Lemon Accountants
            </p>
          </div>
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

      <ComprehensiveUserGuide
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
      />

      <KeyboardShortcuts
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
};

export default Index;
