import React, { useState } from 'react';
import { Calendar, AlertTriangle, Clock, Users, Building2, Settings, Sparkles, Download, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaxCalendar from '@/components/TaxCalendar';
import UserTypeSelector from '@/components/UserTypeSelector';
import DeadlineCard from '@/components/DeadlineCard';
import QuickActionsCard from '@/components/QuickActionsCard';
import SearchFilterBar from '@/components/SearchFilterBar';
import TaxYearSelector from '@/components/TaxYearSelector';
import DeadlineTemplates from '@/components/DeadlineTemplates';
import SettingsModal from '@/components/SettingsModal';
import SmartDeadlineGroups from '@/components/SmartDeadlineGroups';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { useToast } from '@/hooks/use-toast';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [currentTaxYear, setCurrentTaxYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeadlines, setFilteredDeadlines] = useState(getTaxDeadlines(userType));
  const { toast } = useToast();
  
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

  const handleUserTypeChange = (type: UserType) => {
    setIsLoading(true);
    setTimeout(() => {
      setUserType(type);
      setFilteredDeadlines(getTaxDeadlines(type));
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: `Switched to ${type.replace('-', ' ')} profile. Deadlines have been updated.`,
      });
    }, 300);
  };

  const urgentDeadlines = upcomingDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  });

  const getUserTypeDescription = (type: UserType) => {
    switch (type) {
      case 'self-employed':
        return 'Tailored for sole traders, freelancers, and independent contractors';
      case 'company-director':
        return 'Comprehensive deadlines for limited company directors and shareholders';
      case 'both':
        return 'Complete overview for those managing both personal and business obligations';
      default:
        return '';
    }
  };

  const handleCalendarExport = () => {
    toast({
      title: "Calendar Export Started",
      description: "Generating your personalized tax calendar...",
    });
  };

  const handleEmailReminders = () => {
    toast({
      title: "Email Reminders",
      description: "Setting up intelligent deadline notifications...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Premium Header Design */}
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div></div>
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-75"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                    UK Tax Calendar
                  </h1>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Professional Tax Management Platform
                    </span>
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCalendarExport}
                  className="bg-white/50 hover:bg-white/70 border-white/30"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleEmailReminders}
                  className="bg-white/50 hover:bg-white/70 border-white/30"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reminders
                </Button>
                <ThemeToggle />
                <SettingsModal>
                  <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white/70 border-white/30">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SettingsModal>
              </div>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
              The most comprehensive tax deadline management system for UK professionals. 
              Seamlessly integrate with your calendar, receive intelligent reminders, and never miss a critical deadline again.
            </p>
            {urgentDeadlines.length > 0 && (
              <div className="mt-8 inline-block">
                <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-xl animate-pulse">
                  <AlertTriangle className="h-6 w-6" />
                  <div>
                    <span className="font-bold text-lg">
                      {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''} approaching
                    </span>
                    <p className="text-sm opacity-90">Requires immediate attention within 30 days</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Enhanced Tax Year Selection */}
        <div className="mb-12">
          <TaxYearSelector
            currentTaxYear={currentTaxYear}
            onTaxYearChange={setCurrentTaxYear}
          />
        </div>

        {/* Premium User Type Selection */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Select Your Professional Profile
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {getUserTypeDescription(userType)}
            </p>
          </div>
          <UserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </div>

        {/* Enhanced Search and Filter */}
        <div className="mb-12">
          <SearchFilterBar
            deadlines={deadlines}
            onFilteredDeadlines={setFilteredDeadlines}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Premium Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Urgent Actions</CardTitle>
                  <div className="ml-auto p-2 bg-white/20 rounded-full">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black mb-1">{urgentDeadlines.length}</div>
                  <p className="text-sm opacity-80">Next 30 days</p>
                  {urgentDeadlines.length > 0 && (
                    <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30">
                      Immediate attention required
                    </Badge>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Upcoming Deadlines</CardTitle>
                  <div className="ml-auto p-2 bg-white/20 rounded-full">
                    <Calendar className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-black mb-1">{upcomingDeadlines.length}</div>
                  <p className="text-sm opacity-80">Next 3 months</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Tax Profile</CardTitle>
                  <div className="ml-auto p-2 bg-white/20 rounded-full">
                    {userType === 'self-employed' ? 
                      <Users className="h-4 w-4" /> : 
                      userType === 'company-director' ?
                      <Building2 className="h-4 w-4" /> :
                      <Users className="h-4 w-4" />
                    }
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black mb-1 capitalize">
                    {userType === 'both' ? 'Combined' : userType.replace('-', ' ')}
                  </div>
                  <p className="text-sm opacity-80">Active profile</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Current Period</CardTitle>
                  <div className="ml-auto p-2 bg-white/20 rounded-full">
                    <Clock className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-black mb-1">
                    {new Date().toLocaleDateString('en-GB', { month: 'long' })}
                  </div>
                  <p className="text-sm opacity-80">{new Date().getFullYear()} Tax Year</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Enhanced Main Content with Premium Tabs */}
        <Tabs defaultValue="calendar" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-14 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-2">
            <TabsTrigger value="calendar" className="rounded-xl font-semibold">Calendar View</TabsTrigger>
            <TabsTrigger value="deadlines" className="rounded-xl font-semibold">Smart Deadlines</TabsTrigger>
            <TabsTrigger value="templates" className="rounded-xl font-semibold">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-4 text-2xl text-gray-900 dark:text-white">
                          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          Interactive Tax Calendar
                        </CardTitle>
                        <CardDescription className="mt-3 text-gray-600 dark:text-gray-300 text-base">
                          Navigate through months to view all your important tax deadlines and preparation periods
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    {isLoading ? (
                      <div className="space-y-6">
                        <Skeleton className="h-96 w-full rounded-xl" />
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    ) : (
                      <TaxCalendar 
                        deadlines={filteredDeadlines}
                        selectedMonth={selectedMonth}
                        onMonthChange={setSelectedMonth}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600">
                    <CardTitle className="flex items-center gap-4 text-xl text-gray-900 dark:text-white">
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                        <AlertTriangle className="h-5 w-5 text-white" />
                      </div>
                      Priority Deadlines
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Your most critical tax dates in the next 3 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isLoading ? (
                      <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="border-l-4 border-gray-200 p-4 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                    ) : upcomingDeadlines.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingDeadlines.slice(0, 5).map((deadline, index) => (
                          <DeadlineCard key={deadline.id} deadline={deadline} />
                        ))}
                        {upcomingDeadlines.length > 5 && (
                          <div className="text-center pt-4 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {upcomingDeadlines.length - 5} more deadlines upcoming
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                              View All Deadlines
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">All caught up!</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          No upcoming deadlines in the next 3 months for your current profile.
                        </p>
                        <Button variant="outline" size="sm" onClick={() => setSelectedMonth(new Date(new Date().setMonth(new Date().getMonth() + 3)))}>
                          View Future Deadlines
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <QuickActionsCard />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deadlines" className="space-y-8">
            {isLoading ? (
              <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
                    <CardContent className="p-8">
                      <Skeleton className="h-8 w-48 mb-6" />
                      <div className="space-y-4">
                        {Array.from({ length: 2 }).map((_, j) => (
                          <div key={j} className="border-l-4 border-gray-200 p-4 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <SmartDeadlineGroups deadlines={filteredDeadlines} />
            )}
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-8">
            <DeadlineTemplates />
          </TabsContent>
        </Tabs>

        {/* Enhanced Professional Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Professional Tax Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                This platform provides comprehensive tax deadline management based on current UK regulations. 
                For complex tax situations, always consult with a qualified chartered accountant or tax adviser.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="bg-white/50">HMRC Compliant</Badge>
                <Badge variant="outline" className="bg-white/50">Professional Grade</Badge>
                <Badge variant="outline" className="bg-white/50">Calendar Integration</Badge>
                <Badge variant="outline" className="bg-white/50">Smart Reminders</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })} • 
              Version 2.0 • Built for UK Tax Professionals
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
