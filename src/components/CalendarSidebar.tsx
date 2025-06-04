
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, AlertTriangle, TrendingUp, FileText, Users } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';

interface CalendarSidebarProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ deadlines, selectedMonth }) => {
  const today = new Date();
  const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

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

      {/* Quick Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-4 w-4" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <div className="p-2 bg-blue-50 rounded text-blue-800">
              💡 Set up calendar reminders 2 weeks before deadlines
            </div>
            <div className="p-2 bg-green-50 rounded text-green-800">
              📋 Keep all receipts and documents organized monthly
            </div>
            <div className="p-2 bg-purple-50 rounded text-purple-800">
              ⏰ Submit early to avoid last-minute technical issues
            </div>
          </div>
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
          <Button variant="outline" size="sm" className="w-full">
            Late Submission Templates
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            HMRC Guidance
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            Documentation Checklist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSidebar;
