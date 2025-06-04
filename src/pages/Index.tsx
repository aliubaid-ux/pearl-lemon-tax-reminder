
import React, { useState } from 'react';
import { Calendar, AlertTriangle, Users, Building2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaxCalendar from '@/components/TaxCalendar';
import UserTypeSelector from '@/components/UserTypeSelector';
import DeadlineCard from '@/components/DeadlineCard';
import QuickActionsCard from '@/components/QuickActionsCard';
import SearchFilterBar from '@/components/SearchFilterBar';
import TaxYearSelector from '@/components/TaxYearSelector';
import DeadlineTemplates from '@/components/DeadlineTemplates';
import SmartDeadlineGroups from '@/components/SmartDeadlineGroups';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { useToast } from '@/hooks/use-toast';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [currentTaxYear, setCurrentTaxYear] = useState(new Date().getFullYear());
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
    setUserType(type);
    setFilteredDeadlines(getTaxDeadlines(type));
    toast({
      title: "Profile Updated",
      description: `Switched to ${type.replace('-', ' ')} profile.`,
    });
  };

  const urgentDeadlines = upcomingDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-3xl p-8 border shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  UK Tax Calendar
                </h1>
              </div>
              <ThemeToggle />
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
              Professional tax deadline management for UK taxpayers
            </p>
            {urgentDeadlines.length > 0 && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">
                  {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Tax Year Selector */}
        <div className="mb-8">
          <TaxYearSelector
            currentTaxYear={currentTaxYear}
            onTaxYearChange={setCurrentTaxYear}
          />
        </div>

        {/* User Type Selection */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Select Your Profile</h2>
          </div>
          <UserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchFilterBar
            deadlines={deadlines}
            onFilteredDeadlines={setFilteredDeadlines}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent</CardTitle>
              <AlertTriangle className="h-4 w-4 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{urgentDeadlines.length}</div>
              <p className="text-xs opacity-80">Next 30 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
              <p className="text-xs opacity-80">Next 3 months</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              {userType === 'company-director' ? 
                <Building2 className="h-4 w-4 ml-auto" /> : 
                <Users className="h-4 w-4 ml-auto" />
              }
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold capitalize">
                {userType === 'both' ? 'Combined' : userType.replace('-', ' ')}
              </div>
              <p className="text-xs opacity-80">Active profile</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Period</CardTitle>
              <Clock className="h-4 w-4 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {new Date().toLocaleDateString('en-GB', { month: 'long' })}
              </div>
              <p className="text-xs opacity-80">{new Date().getFullYear()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-white/80 dark:bg-gray-800/80 rounded-xl">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Card className="bg-white/95 dark:bg-gray-800/95 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Calendar className="h-5 w-5" />
                      Tax Calendar
                    </CardTitle>
                    <CardDescription>
                      View your tax deadlines by month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TaxCalendar 
                      deadlines={filteredDeadlines}
                      selectedMonth={selectedMonth}
                      onMonthChange={setSelectedMonth}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-white/95 dark:bg-gray-800/95 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5" />
                      Priority Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingDeadlines.length > 0 ? (
                      <div className="space-y-3">
                        {upcomingDeadlines.slice(0, 3).map((deadline) => (
                          <DeadlineCard key={deadline.id} deadline={deadline} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
                    )}
                  </CardContent>
                </Card>

                <QuickActionsCard />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deadlines">
            <SmartDeadlineGroups deadlines={filteredDeadlines} />
          </TabsContent>
          
          <TabsContent value="templates">
            <DeadlineTemplates />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
