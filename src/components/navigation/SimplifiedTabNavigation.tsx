
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainDashboard from '@/components/dashboard/MainDashboard';
import MainTabs from '@/components/MainTabs';
import VisualDeadlineDisplay from '@/components/VisualDeadlineDisplay';
import EnhancedUserTypeSelector from '@/components/EnhancedUserTypeSelector';
import { TaxDeadline } from '@/types/tax';

type UserType = 'self-employed' | 'company-director' | 'both';

interface SimplifiedTabNavigationProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const SimplifiedTabNavigation: React.FC<SimplifiedTabNavigationProps> = ({
  deadlines,
  selectedMonth,
  onMonthChange,
  userType,
  onUserTypeChange
}) => {
  const today = new Date();
  
  const urgentDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil >= 0;
  });

  const upcomingDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil > 7;
  });

  return (
    <div className="space-y-8">
      {/* Header with user type selector */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <EnhancedUserTypeSelector
                userType={userType}
                onUserTypeChange={onUserTypeChange}
              />
            </div>
            
            {urgentDeadlines.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-sm">
                  {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main navigation tabs */}
      <Tabs defaultValue="dashboard" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg">
            <TabsTrigger 
              value="dashboard" 
              className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="deadlines" 
              className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400"
            >
              <FileText className="h-4 w-4 mr-2" />
              All Deadlines
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          <MainDashboard 
            deadlines={deadlines} 
            userType={userType} 
          />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <MainTabs
            filteredDeadlines={deadlines}
            upcomingDeadlines={upcomingDeadlines}
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
            userType={userType}
          />
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-6">
          <VisualDeadlineDisplay 
            deadlines={deadlines} 
            userType={userType} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimplifiedTabNavigation;
