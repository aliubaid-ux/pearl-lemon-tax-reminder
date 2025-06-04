
import React, { useState } from 'react';
import { Calendar, AlertTriangle, Users, Building2, Clock, CheckCircle } from 'lucide-react';
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
import VATThresholdMonitor from '@/components/VATThresholdMonitor';
import PenaltyCalculator from '@/components/PenaltyCalculator';
import EmploymentStatusChecker from '@/components/EmploymentStatusChecker';
import TradingAllowanceCalculator from '@/components/TradingAllowanceCalculator';
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 border shadow-xl hover-lift">
            <div className="flex items-center justify-between mb-8">
              <div></div>
              <div className="flex items-center gap-6">
                <div className="p-6 pearl-gradient rounded-3xl shadow-lg">
                  <Calendar className="h-12 w-12 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-5xl font-bold text-gray-900 mb-2">
                    UK Tax Calendar
                  </h1>
                  <p className="text-xl pearl-text-gradient font-semibold">
                    Professional Tax Management
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Streamline your tax compliance with our comprehensive deadline management system. 
              Never miss a filing deadline or payment due date again.
            </p>
            
            {urgentDeadlines.length > 0 && (
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg animate-pulse">
                <AlertTriangle className="h-6 w-6" />
                <span className="font-semibold text-lg">
                  {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''} approaching
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border">
              <div className="w-14 h-14 pearl-gradient rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Never Miss a Deadline</h3>
              <p className="text-gray-600 leading-relaxed">
                Smart calendar system with automated reminders and priority-based deadline tracking.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Profile Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored for self-employed individuals, company directors, and combined profiles.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Grade</h3>
              <p className="text-gray-600 leading-relaxed">
                Built for accountants and tax professionals with comprehensive HMRC guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Tax Year Selector */}
        <div className="mb-8 animate-scale-in">
          <TaxYearSelector
            currentTaxYear={currentTaxYear}
            onTaxYearChange={setCurrentTaxYear}
          />
        </div>

        {/* User Type Selection */}
        <div className="mb-8 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Select Your Profile</h2>
            <p className="text-gray-600 text-lg">Choose your taxpayer type for personalized deadline management</p>
          </div>
          <UserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </div>

        {/* Search and Filter */}
        <div className="mb-8 animate-fade-in">
          <SearchFilterBar
            deadlines={deadlines}
            onFilteredDeadlines={setFilteredDeadlines}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-slide-up">
          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-xl hover-lift">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Urgent</CardTitle>
              <AlertTriangle className="h-6 w-6 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{urgentDeadlines.length}</div>
              <p className="text-sm opacity-90">Next 30 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-xl hover-lift">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
              <Calendar className="h-6 w-6 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{upcomingDeadlines.length}</div>
              <p className="text-sm opacity-90">Next 3 months</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover-lift">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Profile</CardTitle>
              {userType === 'company-director' ? 
                <Building2 className="h-6 w-6 ml-auto" /> : 
                <Users className="h-6 w-6 ml-auto" />
              }
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold capitalize">
                {userType === 'both' ? 'Combined' : userType.replace('-', ' ')}
              </div>
              <p className="text-sm opacity-90">Active profile</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-xl hover-lift">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Period</CardTitle>
              <Clock className="h-6 w-6 ml-auto" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {new Date().toLocaleDateString('en-GB', { month: 'long' })}
              </div>
              <p className="text-sm opacity-90">{new Date().getFullYear()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calendar" className="space-y-8 animate-fade-in">
          <TabsList className="grid w-full grid-cols-5 h-14 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
            <TabsTrigger value="calendar" className="text-lg font-medium rounded-xl">Calendar</TabsTrigger>
            <TabsTrigger value="deadlines" className="text-lg font-medium rounded-xl">Deadlines</TabsTrigger>
            <TabsTrigger value="tools" className="text-lg font-medium rounded-xl">Tax Tools</TabsTrigger>
            <TabsTrigger value="checkers" className="text-lg font-medium rounded-xl">Calculators</TabsTrigger>
            <TabsTrigger value="templates" className="text-lg font-medium rounded-xl">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-4 text-2xl">
                      <Calendar className="h-7 w-7 text-blue-600" />
                      Tax Calendar
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                      View your tax deadlines by month with intelligent priority sorting
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

              <div className="space-y-8">
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4 text-xl">
                      <AlertTriangle className="h-6 w-6 text-amber-500" />
                      Priority Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingDeadlines.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingDeadlines.slice(0, 3).map((deadline) => (
                          <DeadlineCard key={deadline.id} deadline={deadline} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No upcoming deadlines</p>
                        <p className="text-gray-400">You're all caught up!</p>
                      </div>
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
          
          <TabsContent value="tools">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <VATThresholdMonitor />
              <PenaltyCalculator />
              <EmploymentStatusChecker />
              <TradingAllowanceCalculator />
            </div>
          </TabsContent>

          <TabsContent value="checkers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TradingAllowanceCalculator />
              <PenaltyCalculator />
            </div>
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
