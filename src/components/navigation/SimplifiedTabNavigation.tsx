
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BarChart3, User } from 'lucide-react';
import MainDashboard from '@/components/dashboard/MainDashboard';
import TaxCalendar from '@/components/TaxCalendar';
import UserTypeSelector from '@/components/UserTypeSelector';
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
  onUserTypeChange,
}) => {
  return (
    <Tabs defaultValue="dashboard" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Calendar</span>
        </TabsTrigger>
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard" className="space-y-6">
        <MainDashboard deadlines={deadlines} userType={userType} />
      </TabsContent>
      
      <TabsContent value="calendar" className="space-y-6">
        <TaxCalendar
          deadlines={deadlines}
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
        />
      </TabsContent>
      
      <TabsContent value="profile" className="space-y-6">
        <UserTypeSelector 
          userType={userType}
          onUserTypeChange={onUserTypeChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SimplifiedTabNavigation;
