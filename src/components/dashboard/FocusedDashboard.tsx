
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
    <div className="space-y-6">
      {/* Quick Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={urgentDeadlines.length > 0 ? "border-red-200 bg-red-50/50 dark:bg-red-900/10" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Urgent</p>
                <p className="text-2xl font-bold">{urgentDeadlines.length}</p>
              </div>
              <AlertTriangle className={urgentDeadlines.length > 0 ? "h-6 w-6 text-red-600" : "h-6 w-6 text-gray-400"} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coming Up</p>
                <p className="text-2xl font-bold">{upcomingDeadlines.length}</p>
              </div>
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile</p>
                <p className="text-lg font-semibold capitalize">{userType.replace('-', ' ')}</p>
              </div>
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Deadlines Alert */}
      {urgentDeadlines.length > 0 && (
        <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-100 text-lg">
              <AlertTriangle className="h-5 w-5" />
              Action Required - {urgentDeadlines.length} Urgent Deadline{urgentDeadlines.length > 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {urgentDeadlines.slice(0, 2).map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{deadline.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                </div>
                <Badge variant="destructive">
                  {getDaysUntil(deadline.date)} days
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-white/90 dark:bg-gray-800/90">
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

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/penalty-calculator')}
                  className="h-16 flex flex-col gap-1"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs">Penalty Calculator</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/vat-calculator')}
                  className="h-16 flex flex-col gap-1"
                >
                  <Calculator className="h-5 w-5" />
                  <span className="text-xs">VAT Calculator</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/common-tax-issues')}
                  className="h-16 flex flex-col gap-1"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-xs">Common Issues</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/hmrc-support-guide')}
                  className="h-16 flex flex-col gap-1"
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">HMRC Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines Preview */}
          {upcomingDeadlines.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Next 30 Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {upcomingDeadlines.slice(0, 4).map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{deadline.title}</p>
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
