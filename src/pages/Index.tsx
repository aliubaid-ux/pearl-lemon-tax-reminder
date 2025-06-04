
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { loadUserData, saveUserData } from '@/utils/storage';
import UserTypeSelector from '@/components/UserTypeSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import SmartDeadlineGroups from '@/components/SmartDeadlineGroups';
import { AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type UserType = 'self-employed' | 'company-director' | 'both';

const Index = () => {
  const [userType, setUserType] = useState<UserType>('self-employed');
  const [filteredDeadlines, setFilteredDeadlines] = useState(getTaxDeadlines('self-employed'));
  const { toast } = useToast();

  // Load user data on mount
  useEffect(() => {
    const userData = loadUserData();
    setUserType(userData.userType);
    setFilteredDeadlines(getTaxDeadlines(userData.userType));
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

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    setFilteredDeadlines(getTaxDeadlines(type));
    saveUserData({ userType: type });
    toast({
      title: "Profile Updated!",
      description: `Your calendar is now personalized for ${type.replace('-', ' ')} activities.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Your Tax Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay on top of your UK tax deadlines with personalized reminders and tools
            </p>
          </div>
          <ThemeToggle />
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
            </p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg max-w-4xl mx-auto">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                Next 3 Months
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div 
                      key={deadline.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
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
                      <Badge className={deadline.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}>
                        {deadline.priority}
                      </Badge>
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

        {/* Step 3: All Deadlines */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Step 3: Complete Deadlines Calendar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              All your tax deadlines organized by category and importance
            </p>
          </div>
          
          <SmartDeadlineGroups deadlines={filteredDeadlines} />
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            2025 UK Tax Calendar - Professional tax deadline management by Pearl Lemon Accountants
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
