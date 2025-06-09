
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Calendar, FileText } from 'lucide-react';

const MainTabsList: React.FC = () => {
  return (
    <div className="flex justify-center">
      <TabsList className="grid w-full max-w-md grid-cols-3 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg">
        <TabsTrigger 
          value="dashboard" 
          className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 transition-all duration-200"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger 
          value="calendar" 
          className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 transition-all duration-200"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Calendar
        </TabsTrigger>
        <TabsTrigger 
          value="deadlines" 
          className="text-base font-medium rounded-xl data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/30 dark:data-[state=active]:text-green-400 transition-all duration-200"
        >
          <FileText className="h-4 w-4 mr-2" />
          All Deadlines
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default MainTabsList;
