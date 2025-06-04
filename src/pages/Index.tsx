
import React, { useState } from 'react';
import { Calendar, AlertTriangle, Clock, Users, Building2, Download, ExternalLink, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import TaxCalendar from '@/components/TaxCalendar';
import UserTypeSelector from '@/components/UserTypeSelector';
import DeadlineCard from '@/components/DeadlineCard';
import QuickActionsCard from '@/components/QuickActionsCard';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { useToast } from '@/hooks/use-toast';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const deadlines = getTaxDeadlines(userType);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const upcomingDeadlines = deadlines
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
        return 'Showing deadlines for sole traders and freelancers';
      case 'company-director':
        return 'Showing deadlines for limited company directors';
      case 'both':
        return 'Showing all deadlines for self-employed and company directors';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header with better typography */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              UK Tax Calendar
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Never miss a tax deadline again. Our comprehensive calendar keeps you organized with timely reminders 
            for self-employed individuals and company directors across the UK.
          </p>
          {urgentDeadlines.length > 0 && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg inline-block">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-semibold">
                  {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''} approaching
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Enhanced User Type Selection */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Choose Your Tax Profile</h2>
            <p className="text-gray-600">{getUserTypeDescription(userType)}</p>
          </div>
          <UserTypeSelector userType={userType} onUserTypeChange={handleUserTypeChange} />
        </div>

        {/* Enhanced Quick Stats with loading states */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Upcoming Deadlines</CardTitle>
                  <div className="ml-auto p-2 bg-amber-100 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{upcomingDeadlines.length}</div>
                  <p className="text-sm text-gray-600">Next 3 months</p>
                  {urgentDeadlines.length > 0 && (
                    <Badge variant="destructive" className="mt-2">
                      {urgentDeadlines.length} urgent
                    </Badge>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Tax Profile</CardTitle>
                  <div className="ml-auto p-2 bg-blue-100 rounded-full">
                    {userType === 'self-employed' ? 
                      <Users className="h-4 w-4 text-blue-600" /> : 
                      userType === 'company-director' ?
                      <Building2 className="h-4 w-4 text-green-600" /> :
                      <Users className="h-4 w-4 text-purple-600" />
                    }
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-1 capitalize">
                    {userType === 'both' ? 'Combined' : userType.replace('-', ' ')}
                  </div>
                  <p className="text-sm text-gray-600">Current selection</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Current Period</CardTitle>
                  <div className="ml-auto p-2 bg-purple-100 rounded-full">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {new Date().toLocaleDateString('en-GB', { month: 'long' })}
                  </div>
                  <p className="text-sm text-gray-600">{new Date().getFullYear()} Tax Year</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content Grid with improved spacing */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Enhanced Calendar View */}
          <div className="xl:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      Tax Calendar Overview
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Navigate through months to view all your important tax deadlines and preparation periods
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-80 w-full" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ) : (
                  <TaxCalendar 
                    deadlines={deadlines}
                    selectedMonth={selectedMonth}
                    onMonthChange={setSelectedMonth}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Deadlines with better empty state */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>
                  Your most important tax dates in the next 3 months
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
                      <div className="text-center pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 mb-3">
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
                    <div className="p-4 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      No upcoming deadlines in the next 3 months for your current profile.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSelectedMonth(new Date(new Date().setMonth(new Date().getMonth() + 3)))}>
                      View Future Deadlines
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions */}
            <QuickActionsCard />
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="text-sm mb-2">
              Tax information is based on current UK tax regulations. Always consult with a qualified accountant for advice specific to your situation.
            </p>
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
