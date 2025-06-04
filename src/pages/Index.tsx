
import React, { useState } from 'react';
import { Calendar, AlertTriangle, Users, Building2, Clock, CheckCircle, ArrowRight, PlayCircle, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  const [showAdvanced, setShowAdvanced] = useState(false);
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
        {/* Simplified Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border shadow-xl hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <div className="flex items-center gap-4">
                <div className="p-4 pearl-gradient rounded-2xl shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    UK Tax Calendar
                  </h1>
                  <p className="text-lg text-gray-600">
                    Never miss a tax deadline again
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            
            {urgentDeadlines.length > 0 && (
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg animate-pulse mb-4">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">
                  {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''} approaching
                </span>
              </div>
            )}

            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Get started by selecting your profile below, then view your personalized tax calendar.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button onClick={() => document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                Get Started
              </Button>
              <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
                {showAdvanced ? 'Simple View' : 'Advanced Features'}
              </Button>
            </div>
          </div>
        </section>

        {/* User Type Selection - Made Primary */}
        <section id="profile-section" className="mb-8 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Choose Your Profile</h2>
            <p className="text-gray-600">This helps us show you the right deadlines and information</p>
          </div>
          <UserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </section>

        {/* Quick Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                Your Next Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-3">
                  {upcomingDeadlines.slice(0, 2).map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{deadline.title}</p>
                        <p className="text-sm text-gray-600">{new Date(deadline.date).toLocaleDateString('en-GB', { 
                          day: 'numeric', 
                          month: 'long' 
                        })}</p>
                      </div>
                      <Badge className={deadline.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}>
                        {deadline.priority}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-3" onClick={() => setShowAdvanced(true)}>
                    View All Deadlines
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">You're all caught up!</p>
                  <p className="text-sm text-gray-500">No urgent deadlines in the next 3 months</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Calendar className="h-6 w-6 text-blue-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowAdvanced(true)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  View Tax Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowAdvanced(true)}>
                  <Calculator className="h-4 w-4 mr-2" />
                  Penalty Calculator
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowAdvanced(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  VAT Threshold Monitor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Features - Progressive Disclosure */}
        {showAdvanced && (
          <>
            {/* Tax Year Selector */}
            <div className="mb-8 animate-scale-in">
              <TaxYearSelector
                currentTaxYear={currentTaxYear}
                onTaxYearChange={setCurrentTaxYear}
              />
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

            {/* Main Content Tabs */}
            <Tabs defaultValue="calendar" className="space-y-8 animate-fade-in">
              <TabsList className="grid w-full grid-cols-4 h-14 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
                <TabsTrigger value="calendar" className="text-lg font-medium rounded-xl">Calendar</TabsTrigger>
                <TabsTrigger value="deadlines" className="text-lg font-medium rounded-xl">Deadlines</TabsTrigger>
                <TabsTrigger value="tools" className="text-lg font-medium rounded-xl">Tax Tools</TabsTrigger>
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
              
              <TabsContent value="templates">
                <DeadlineTemplates />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
