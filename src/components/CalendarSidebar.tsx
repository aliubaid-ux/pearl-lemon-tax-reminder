
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { useNavigate } from 'react-router-dom';
import CalendarStats from '@/components/calendar/CalendarStats';
import UpcomingDeadlines from '@/components/calendar/UpcomingDeadlines';
import QuickActions from '@/components/calendar/QuickActions';
import HelpAndSupport from '@/components/calendar/HelpAndSupport';

interface CalendarSidebarProps {
  deadlines: TaxDeadline[];
  selectedMonth: Date;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ deadlines, selectedMonth }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <CalendarStats deadlines={deadlines} selectedMonth={selectedMonth} />
      <UpcomingDeadlines deadlines={deadlines} />
      
      {/* Common Tax Mistakes Alert */}
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
            onClick={() => navigate('/common-mistakes')}
          >
            View Common Mistakes
          </Button>
        </CardContent>
      </Card>

      <QuickActions />
      <HelpAndSupport />
    </div>
  );
};

export default CalendarSidebar;
