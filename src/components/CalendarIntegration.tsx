
import React, { useState } from 'react';
import { Calendar, Download, Upload, ExternalLink, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { TaxDeadline } from '@/types/tax';

interface CalendarIntegrationProps {
  deadlines: TaxDeadline[];
  userType: string;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({ deadlines, userType }) => {
  const { toast } = useToast();

  const generateICSContent = (deadlinesToExport: TaxDeadline[]) => {
    // Filter for next 12 months
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    
    const next12MonthsDeadlines = deadlinesToExport.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate >= today && deadlineDate <= nextYear;
    });

    const icsEvents = next12MonthsDeadlines.map(deadline => {
      const date = new Date(deadline.date);
      const dateStr = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      
      return `BEGIN:VEVENT
UID:${deadline.id}@uktaxcalendar.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
DTSTART;VALUE=DATE:${dateStr.substring(0, 8)}
SUMMARY:${deadline.title}
DESCRIPTION:${deadline.description || 'UK Tax Deadline'}\\n\\nPriority: ${deadline.priority}\\nCategory: ${deadline.category}\\n\\nFor more information visit: https://gov.uk/hmrc
LOCATION:United Kingdom
CATEGORIES:TAX,DEADLINE,${deadline.priority.toUpperCase()}
PRIORITY:${deadline.priority === 'high' ? 1 : deadline.priority === 'medium' ? 5 : 9}
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${deadline.title} due in 7 days
END:VALARM
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${deadline.title} due tomorrow
END:VALARM
END:VEVENT`;
    }).join('\n');

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UK Tax Calendar Professional//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:UK Tax Calendar - ${userType.replace('-', ' ').toUpperCase()}
X-WR-CALDESC:Professional UK tax deadline management calendar for next 12 months
X-WR-TIMEZONE:Europe/London
${icsEvents}
END:VCALENDAR`;
  };

  const handleExport = () => {
    const content = generateICSContent(deadlines);
    const filename = `uk-tax-calendar-${userType}-12months-${new Date().getFullYear()}.ics`;
    const mimeType = 'text/calendar;charset=utf-8';

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Count next 12 months deadlines
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);
    const count = deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate >= today && deadlineDate <= nextYear;
    }).length;

    toast({
      title: 'Calendar Export Complete',
      description: `All ${count} tax deadlines for the next 12 months exported successfully.`,
    });
  };

  const calendarPlatforms = [
    {
      id: 'google-calendar',
      title: 'Google Calendar',
      description: 'Sync with Google Workspace',
      icon: ExternalLink,
      action: () => {
        handleExport();
        setTimeout(() => {
          window.open('https://calendar.google.com/', '_blank');
        }, 1000);
      }
    },
    {
      id: 'apple-calendar',
      title: 'Apple Calendar',
      description: 'For iPhone, iPad & Mac',
      icon: Smartphone,
      action: handleExport
    },
    {
      id: 'outlook',
      title: 'Microsoft Outlook',
      description: 'Sync with Office 365',
      icon: ExternalLink,
      action: () => {
        handleExport();
        setTimeout(() => {
          window.open('https://outlook.live.com/calendar/', '_blank');
        }, 1000);
      }
    }
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-blue-600" />
          One-Click Calendar Integration
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Export Button */}
        <div className="text-center space-y-4">
          <Button 
            onClick={handleExport} 
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto"
          >
            <Download className="h-5 w-5 mr-3" />
            Download All Tax Deadlines (Next 12 Months)
          </Button>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Downloads a calendar file (.ics) with all your tax deadlines
          </p>
        </div>

        {/* Platform Integration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-center">Choose Your Calendar App</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {calendarPlatforms.map((platform) => (
              <Button
                key={platform.id}
                variant="outline"
                onClick={platform.action}
                className="h-auto p-4 hover:bg-green-50 border-green-200"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <platform.icon className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-medium">{platform.title}</div>
                    <div className="text-xs text-gray-500">{platform.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Simple Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">📝 How to Add to Your Calendar</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Click "Download All Tax Deadlines" or choose your calendar app above</li>
            <li>Open the downloaded file (.ics) or import it into your calendar app</li>
            <li>All your tax deadlines will appear with automatic reminders</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarIntegration;
