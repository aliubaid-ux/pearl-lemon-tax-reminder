
import React from 'react';
import { Calendar, Calculator, Settings, Bell, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import TaxCalendar from '@/components/TaxCalendar';
import SmartDeadlineGroups from '@/components/SmartDeadlineGroups';
import VATThresholdMonitor from '@/components/VATThresholdMonitor';
import PenaltyCalculator from '@/components/PenaltyCalculator';
import EmploymentStatusChecker from '@/components/EmploymentStatusChecker';
import TradingAllowanceCalculator from '@/components/TradingAllowanceCalculator';
import EmailReminders from '@/components/EmailReminders';
import DeadlineTemplates from '@/components/DeadlineTemplates';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import { exportToCSV, printCalendar } from '@/utils/exportUtils';

interface MainTabsProps {
  filteredDeadlines: any[];
  upcomingDeadlines: any[];
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
      <TabsList className="grid w-full grid-cols-4 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg">
        <TabsTrigger value="deadlines" className="text-lg font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400">
          <FileText className="h-4 w-4 mr-2" />
          All Deadlines
        </TabsTrigger>
        <TabsTrigger value="calendar" className="text-lg font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400">
          <Calendar className="h-4 w-4 mr-2" />
          Calendar View
        </TabsTrigger>
        <TabsTrigger value="tools" className="text-lg font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400">
          <Calculator className="h-4 w-4 mr-2" />
          Calculators
        </TabsTrigger>
        <TabsTrigger value="settings" className="text-lg font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="deadlines">
        <SmartDeadlineGroups deadlines={filteredDeadlines} />
      </TabsContent>

      <TabsContent value="calendar">
        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-4 text-2xl text-gray-900 dark:text-white">
              <Calendar className="h-7 w-7 text-green-600" />
              Tax Calendar
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              View your tax deadlines by month with visual indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaxCalendar 
              deadlines={filteredDeadlines}
              selectedMonth={selectedMonth}
              onMonthChange={onMonthChange}
            />
            
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => printCalendar(filteredDeadlines, userType)}
              >
                Print Calendar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => exportToCSV(filteredDeadlines)}
              >
                Export to CSV
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const today = new Date();
                  onMonthChange(today);
                }}
              >
                Go to Current Month
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="tools">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PenaltyCalculator />
          <VATThresholdMonitor />
          <EmploymentStatusChecker />
          <TradingAllowanceCalculator />
        </div>
      </TabsContent>
      
      <TabsContent value="settings">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EmailReminders />
          <AccessibilityFeatures />
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => exportToCSV(filteredDeadlines)}
              >
                Export Calendar Data
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => printCalendar(filteredDeadlines, userType)}
              >
                Print Calendar
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-200 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                onClick={() => {
                  localStorage.removeItem('uk-tax-calendar-data');
                  window.location.reload();
                }}
              >
                Reset All Data
              </Button>
            </CardContent>
          </Card>
          <DeadlineTemplates />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;
