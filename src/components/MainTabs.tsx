
import React from 'react';
import { Calendar, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SmartDeadlineGroups from '@/components/SmartDeadlineGroups';
import CalendarTab from '@/components/tabs/CalendarTab';
import { TaxDeadline } from '@/types/tax';

interface MainTabsProps {
  filteredDeadlines: TaxDeadline[];
  upcomingDeadlines: TaxDeadline[];
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
  userType: string;
}

const MainTabs: React.FC<MainTabsProps> = ({
  filteredDeadlines,
  upcomingDeadlines,
  selectedMonth,
  onMonthChange,
  userType
}) => {
  return (
    <Tabs defaultValue="deadlines" className="space-y-8 animate-fade-in">
      <TabsList className="grid w-full grid-cols-2 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg">
        <TabsTrigger 
          value="deadlines" 
          className="text-lg font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400"
        >
          <FileText className="h-4 w-4 mr-2" />
          All Deadlines
        </TabsTrigger>
        <TabsTrigger 
          value="calendar" 
          className="text-lg font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Calendar View
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="deadlines" className="space-y-6">
        <SmartDeadlineGroups deadlines={filteredDeadlines} />
      </TabsContent>

      <TabsContent value="calendar" className="space-y-6">
        <CalendarTab
          deadlines={filteredDeadlines}
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
          userType={userType}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;
