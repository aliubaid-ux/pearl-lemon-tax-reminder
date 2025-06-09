
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, Clock, TrendingUp, Calculator, Settings } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { useNavigate } from 'react-router-dom';

interface MainDashboardProps {
  deadlines: TaxDeadline[];
  userType: 'self-employed' | 'company-director' | 'both';
}

const MainDashboard: React.FC<MainDashboardProps> = ({ deadlines, userType }) => {
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

  const thisMonthDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate.getMonth() === today.getMonth() && deadlineDate.getFullYear() === today.getFullYear();
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const deadlineDate = new Date(dateString);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={urgentDeadlines.length > 0 ? "border-red-200 bg-red-50 dark:bg-red-900/10" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent (Next 7 Days)</CardTitle>
            <AlertTriangle className={urgentDeadlines.length > 0 ? "h-4 w-4 text-red-600" : "h-4 w-4 text-gray-400"} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urgentDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">
              {urgentDeadlines.length > 0 ? "Requires immediate attention" : "All clear"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">
              Total deadlines this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coming Up</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingDeadlines.length}</div>
            <p className="text-xs text-muted-foreground">
              Next 8-30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Deadlines */}
      {urgentDeadlines.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-100">
              <AlertTriangle className="h-5 w-5" />
              Urgent Attention Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {urgentDeadlines.slice(0, 3).map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{deadline.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{deadline.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="destructive">
                      {getDaysUntil(deadline.date)} days left
                    </Badge>
                    <span className="text-sm text-gray-500">{formatDate(deadline.date)}</span>
                  </div>
                </div>
                <Badge 
                  variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}
                  className="ml-4"
                >
                  {deadline.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/penalty-calculator')}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Penalty Calculator</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/vat-calculator')}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Calculator className="h-6 w-6" />
              <span className="text-sm">VAT Calculator</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/common-tax-issues')}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <AlertTriangle className="h-6 w-6" />
              <span className="text-sm">Common Issues</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/settings')}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines Preview */}
      {upcomingDeadlines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Coming Up (Next 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 5).map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">{deadline.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                  </div>
                  <Badge variant="secondary">
                    {getDaysUntil(deadline.date)} days
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MainDashboard;
