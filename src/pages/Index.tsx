
import React, { useState } from 'react';
import { Calendar, AlertTriangle, Clock, Users, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TaxCalendar from '@/components/TaxCalendar';
import UserTypeSelector from '@/components/UserTypeSelector';
import DeadlineCard from '@/components/DeadlineCard';
import { getTaxDeadlines } from '@/utils/taxDeadlines';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">UK Tax Calendar</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay on top of your tax obligations with our comprehensive reminder tool for self-employed individuals and company directors
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-8">
          <UserTypeSelector userType={userType} onUserTypeChange={setUserType} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
              <AlertTriangle className="h-4 w-4 ml-auto text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{upcomingDeadlines.length}</div>
              <p className="text-xs text-gray-600">Next 3 months</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Type</CardTitle>
              {userType === 'self-employed' ? 
                <Users className="h-4 w-4 ml-auto text-blue-500" /> : 
                <Building2 className="h-4 w-4 ml-auto text-green-500" />
              }
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 capitalize">
                {userType.replace('-', ' ')}
              </div>
              <p className="text-xs text-gray-600">Selected profile</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Month</CardTitle>
              <Clock className="h-4 w-4 ml-auto text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {new Date().toLocaleDateString('en-GB', { month: 'long' })}
              </div>
              <p className="text-xs text-gray-600">{new Date().getFullYear()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Tax Calendar
                </CardTitle>
                <CardDescription>
                  View all your tax deadlines and preparation reminders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaxCalendar 
                  deadlines={deadlines}
                  selectedMonth={selectedMonth}
                  onMonthChange={setSelectedMonth}
                />
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>
                  Your next important tax dates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.slice(0, 5).map((deadline, index) => (
                    <DeadlineCard key={index} deadline={deadline} />
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No upcoming deadlines in the next 3 months</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  Download Tax Year Guide
                </Button>
                <Button className="w-full" variant="outline">
                  HMRC Website
                </Button>
                <Button className="w-full" variant="outline">
                  Set Email Reminders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
