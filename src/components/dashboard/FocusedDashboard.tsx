
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Calculator, 
  FileText,
  LayoutDashboard,
  TrendingUp
} from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { useNavigate } from 'react-router-dom';
import MainTabs from '@/components/MainTabs';
import VisualDeadlineDisplay from '@/components/VisualDeadlineDisplay';

type UserType = 'self-employed' | 'company-director' | 'both';

interface FocusedDashboardProps {
  deadlines: TaxDeadline[];
  userType: UserType;
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const FocusedDashboard: React.FC<FocusedDashboardProps> = ({ 
  deadlines, 
  userType, 
  selectedMonth, 
  onMonthChange 
}) => {
  const navigate = useNavigate();
  const today = new Date();

  // Calculate key metrics
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const deadlineDate = new Date(dateString);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  return (
    <div className="space-y-4">
      {/* Quick Status Overview - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className={urgentDeadlines.length > 0 ? "border-red-200 bg-red-50/50 dark:bg-red-900/10" : "border-0 shadow-sm"}>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Urgent</p>
                <p className="text-xl font-bold">{urgentDeadlines.length}</p>
              </div>
              <AlertTriangle className={urgentDeadlines.length > 0 ? "h-5 w-5 text-red-600" : "h-5 w-5 text-gray-400"} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Coming Up</p>
                <p className="text-xl font-bold">{upcomingDeadlines.length}</p>
              </div>
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Profile</p>
                <p className="text-sm font-semibold capitalize">{userType.replace('-', ' ')}</p>
              </div>
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Deadlines Alert - Simplified */}
      {urgentDeadlines.length > 0 && (
        <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-100 text-base">
              <AlertTriangle className="h-4 w-4" />
              {urgentDeadlines.length} Urgent Deadline{urgentDeadlines.length > 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {urgentDeadlines.slice(0, 2).map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{deadline.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                </div>
                <Badge variant="destructive" className="text-xs">
                  {getDaysUntil(deadline.date)} days
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs - Simplified */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-10 bg-white/90 dark:bg-gray-800/90 border-0 shadow-sm">
          <TabsTrigger value="overview" className="text-sm">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="deadlines" className="text-sm">
            <FileText className="h-4 w-4 mr-2" />
            All Deadlines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Quick Actions - Simplified */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/penalty-calculator')}
                  className="h-12 flex flex-col gap-1 text-xs"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Penalty Calc</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/vat-calculator')}
                  className="h-12 flex flex-col gap-1 text-xs"
                >
                  <Calculator className="h-4 w-4" />
                  <span>VAT Calc</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/common-tax-issues')}
                  className="h-12 flex flex-col gap-1 text-xs"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Issues</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/hmrc-support-guide')}
                  className="h-12 flex flex-col gap-1 text-xs"
                >
                  <FileText className="h-4 w-4" />
                  <span>Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines Preview - Simplified */}
          {upcomingDeadlines.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Next 30 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {upcomingDeadlines.slice(0, 3).map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-xs">{deadline.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {getDaysUntil(deadline.date)} days
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <MainTabs
            filteredDeadlines={deadlines}
            upcomingDeadlines={upcomingDeadlines}
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
            userType={userType}
          />
        </TabsContent>

        <TabsContent value="deadlines">
          <VisualDeadlineDisplay 
            deadlines={deadlines} 
            userType={userType} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FocusedDashboard;
