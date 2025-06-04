
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useKeyboardNavigation, defaultShortcuts } from '@/hooks/useKeyboardNavigation';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { printCalendar, exportToCSV, shareDeadlines } from '@/utils/exportUtils';
import { loadUserData, saveUserData } from '@/utils/storage';
import UserTypeSelector from '@/components/UserTypeSelector';
import TaxYearSelector from '@/components/TaxYearSelector';
import SearchFilterBar from '@/components/SearchFilterBar';
import DeadlineNotes from '@/components/DeadlineNotes';
import HeroSection from '@/components/HeroSection';
import StatsCards from '@/components/StatsCards';
import QuickStatusOverview from '@/components/QuickStatusOverview';
import MainTabs from '@/components/MainTabs';
import { Button } from '@/components/ui/button';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [currentTaxYear, setCurrentTaxYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeadlines, setFilteredDeadlines] = useState(getTaxDeadlines('self-employed'));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState<any>(null);
  const { toast } = useToast();

  // Keyboard shortcuts
  const { showShortcuts } = useKeyboardNavigation({
    ...defaultShortcuts,
    'Ctrl+P': () => printCalendar(filteredDeadlines, userType),
    'Ctrl+E': () => exportToCSV(filteredDeadlines),
    'Ctrl+S': () => shareDeadlines(filteredDeadlines, userType),
    '?': () => showShortcuts()
  });
  
  // Load user data on mount
  useEffect(() => {
    const userData = loadUserData();
    setUserType(userData.userType);
    setFilteredDeadlines(getTaxDeadlines(userData.userType));
  }, []);
  
  const deadlines = getTaxDeadlines(userType);
  
  const upcomingDeadlines = filteredDeadlines
    .filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const today = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(today.getMonth() + 3);
      return deadlineDate >= today && deadlineDate <= threeMonthsFromNow;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const urgentDeadlines = upcomingDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  });

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setFilteredDeadlines(getTaxDeadlines(type));
    saveUserData({ userType: type });
    toast({
      title: "Profile Updated",
      description: `Switched to ${type.replace('-', ' ')} profile.`,
    });
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'print':
        printCalendar(filteredDeadlines, userType);
        break;
      case 'export':
        exportToCSV(filteredDeadlines);
        break;
      case 'share':
        shareDeadlines(filteredDeadlines, userType);
        break;
      case 'calendar':
        setShowAdvanced(true);
        setTimeout(() => {
          const element = document.querySelector('[value="calendar"]') as HTMLElement;
          if (element) {
            element.click();
          }
        }, 100);
        break;
      case 'deadlines':
        setShowAdvanced(true);
        setTimeout(() => {
          const element = document.querySelector('[value="deadlines"]') as HTMLElement;
          if (element) {
            element.click();
          }
        }, 100);
        break;
      case 'calculator':
        setShowAdvanced(true);
        setTimeout(() => {
          const element = document.querySelector('[value="tools"]') as HTMLElement;
          if (element) {
            element.click();
          }
        }, 100);
        break;
      default:
        setShowAdvanced(true);
    }
  };

  const handleGetStarted = () => {
    document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <HeroSection
          urgentDeadlines={urgentDeadlines}
          showAdvanced={showAdvanced}
          onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
          onGetStarted={handleGetStarted}
          onShowShortcuts={showShortcuts}
          onQuickAction={handleQuickAction}
          onPrint={() => printCalendar(filteredDeadlines, userType)}
          onShare={() => shareDeadlines(filteredDeadlines, userType)}
        />

        {/* User Type Selection */}
        <section id="profile-section" className="mb-8 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Choose Your Profile</h2>
            <p className="text-gray-600">This helps us show you the right deadlines and information</p>
          </div>
          <UserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </section>

        <QuickStatusOverview
          upcomingDeadlines={upcomingDeadlines}
          onDeadlineClick={setSelectedDeadline}
          onShowAdvanced={() => setShowAdvanced(true)}
          onQuickAction={handleQuickAction}
        />

        {/* Deadline Notes Modal */}
        {selectedDeadline && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{selectedDeadline.title}</h3>
                  <Button variant="ghost" onClick={() => setSelectedDeadline(null)}>×</Button>
                </div>
                <DeadlineNotes deadline={selectedDeadline} />
              </div>
            </div>
          </div>
        )}

        {/* Advanced Features */}
        {showAdvanced && (
          <>
            <div className="mb-8 animate-scale-in">
              <TaxYearSelector
                currentTaxYear={currentTaxYear}
                onTaxYearChange={setCurrentTaxYear}
              />
            </div>

            <div className="mb-8 animate-fade-in">
              <SearchFilterBar
                deadlines={deadlines}
                onFilteredDeadlines={setFilteredDeadlines}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            <StatsCards
              urgentDeadlines={urgentDeadlines}
              upcomingDeadlines={upcomingDeadlines}
              userType={userType}
            />

            <MainTabs
              filteredDeadlines={filteredDeadlines}
              upcomingDeadlines={upcomingDeadlines}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              userType={userType}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
