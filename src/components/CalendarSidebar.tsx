
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Users, 
  CreditCard,
  Calculator,
  HelpCircle
} from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CalendarSidebarProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ deadlines, selectedMonth }) => {
  const today = new Date();
  const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get deadlines for current month
  const monthDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= monthStart && deadlineDate <= monthEnd;
  });

  // Get upcoming deadlines in next 30 days
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  const upcomingDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= thirtyDaysFromNow;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate tax year progress
  const currentTaxYearStart = new Date(today.getFullYear(), 3, 6); // April 6th
  if (today < currentTaxYearStart) {
    currentTaxYearStart.setFullYear(today.getFullYear() - 1);
  }
  const currentTaxYearEnd = new Date(currentTaxYearStart.getFullYear() + 1, 3, 5); // April 5th next year
  
  const taxYearProgress = Math.min(100, Math.max(0, 
    ((today.getTime() - currentTaxYearStart.getTime()) / 
     (currentTaxYearEnd.getTime() - currentTaxYearStart.getTime())) * 100
  ));

  const monthName = selectedMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const handleButtonClick = (component: string) => {
    // In a real app, this would navigate to specific components/pages
    toast({
      title: `Opening ${component}`,
      description: `Navigating to ${component} component...`,
    });
    
    // Temporary navigation simulation - in a real app replace with actual routes
    switch (component) {
      case 'Late Submission Templates':
        navigate('/late-submission-templates');
        break;
      case 'HMRC Guidance':
        navigate('/hmrc-guidance');
        break;
      case 'Documentation Checklist':
        navigate('/documentation-checklist');
        break;
      case 'Common Mistakes':
        navigate('/common-mistakes');
        break;
      case 'Registration Tracker':
        navigate('/registration-tracker');
        break;
      case 'Trading Allowance':
        navigate('/trading-allowance');
        break;
      default:
        // Default fallback
        toast({
          title: 'Feature coming soon',
          description: 'This feature is under development.'
        });
    }
  };

  return (
    <div className="space-y-6">
      {/* Month Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-4 w-4" />
            {monthName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Deadlines this month</span>
            <Badge variant={monthDeadlines.length > 0 ? "destructive" : "secondary"}>
              {monthDeadlines.length}
            </Badge>
          </div>
          
          {monthDeadlines.length > 0 && (
            <div className="space-y-2">
              {monthDeadlines.slice(0, 3).map(deadline => (
                <div key={deadline.id} className="flex items-center justify-between text-sm">
                  <span className="truncate">{deadline.title}</span>
                  <span className="text-gray-500 ml-2">
                    {new Date(deadline.date).getDate()}
                  </span>
                </div>
              ))}
              {monthDeadlines.length > 3 && (
                <p className="text-xs text-gray-500">
                  +{monthDeadlines.length - 3} more deadlines
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tax Year Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-4 w-4" />
            Tax Year Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current tax year</span>
              <span>{Math.round(taxYearProgress)}%</span>
            </div>
            <Progress value={taxYearProgress} className="h-2" />
            <p className="text-xs text-gray-500">
              {currentTaxYearStart.getFullYear()}/{(currentTaxYearStart.getFullYear() + 1).toString().slice(-2)} tax year
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Urgent Actions */}
      {upcomingDeadlines.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Urgent Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.slice(0, 3).map(deadline => {
              const daysUntil = Math.ceil((new Date(deadline.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={deadline.id} className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{deadline.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {daysUntil} days
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{deadline.description}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* New Common Tax Mistakes Alert */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-red-900">
            <AlertTriangle className="h-4 w-4" />
            Common Mistakes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <div className="p-2 bg-white rounded text-red-800 border border-red-100">
              💡 Review common filing mistakes that cause penalties
            </div>
            <div className="p-2 bg-white rounded text-red-800 border border-red-100">
              📋 Avoid issues with trading allowance misconceptions
            </div>
          </div>
          <Button 
            variant="destructive" 
            size="sm" 
            className="w-full"
            onClick={() => handleButtonClick('Common Mistakes')}
          >
            View Common Mistakes
          </Button>
        </CardContent>
      </Card>

      {/* Special Issues Cards */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-4 w-4" />
            Key Tax Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-between"
            onClick={() => handleButtonClick('Registration Tracker')}
          >
            <span>Registration Deadlines</span>
            <Calendar className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-between"
            onClick={() => handleButtonClick('Trading Allowance')}
          >
            <span>Trading Allowance Calculator</span>
            <Calculator className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-between"
            onClick={() => handleButtonClick('Payments on Account')}
          >
            <span>Payments on Account Guide</span>
            <CreditCard className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-4 w-4" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleButtonClick('Late Submission Templates')}
          >
            Late Submission Templates
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleButtonClick('HMRC Guidance')}
          >
            HMRC Guidance
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleButtonClick('HMRC Support Guide')}
          >
            HMRC Support Contact
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => handleButtonClick('Documentation Checklist')}
          >
            Documentation Checklist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSidebar;
