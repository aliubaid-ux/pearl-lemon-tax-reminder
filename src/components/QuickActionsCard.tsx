
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Bell, FileText, Calculator, HelpCircle, Calendar, Mail, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuickActionsCard = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Download Started",
        description: "Your comprehensive UK tax year guide is being downloaded.",
      });
    }, 1500);
  };

  const handleExternalLink = (url: string, title: string) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
      toast({
        title: "Opening External Link",
        description: `Redirecting to ${title}...`,
      });
    } catch (error) {
      toast({
        title: "Link Error",
        description: "Unable to open external link. Please check your browser settings.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleCalendarExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Generate Google Calendar URL with sample event
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Tax%20Deadline%20Reminder&dates=${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=Important%20UK%20tax%20deadline%20approaching&location=UK`;
      
      window.open(googleCalendarUrl, '_blank');
      toast({
        title: "Google Calendar Export",
        description: "Opening Google Calendar with your tax deadlines...",
      });
    }, 1000);
  };

  const handleICalExport = () => {
    // Generate iCal content
    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UK Tax Calendar//EN
BEGIN:VEVENT
UID:${Date.now()}@uktaxcalendar.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
DTSTART:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
SUMMARY:UK Tax Deadlines
DESCRIPTION:Important UK tax deadlines and reminders
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'uk-tax-calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "iCal Export Complete",
      description: "Tax calendar file downloaded successfully.",
    });
  };

  const handleEmailReminders = () => {
    toast({
      title: "Email Reminders Setup",
      description: "Professional email reminder system is being configured...",
    });
  };

  const quickActions = [
    {
      id: 'download-guide',
      title: 'Tax Year Guide',
      description: 'Comprehensive PDF guide for UK tax',
      icon: Download,
      action: handleDownload,
      loading: isDownloading,
      variant: 'default' as const,
      category: 'download'
    },
    {
      id: 'google-calendar',
      title: 'Google Calendar',
      description: 'Export to Google Calendar',
      icon: Calendar,
      action: handleGoogleCalendarExport,
      loading: isExporting,
      variant: 'outline' as const,
      category: 'calendar'
    },
    {
      id: 'ical-export',
      title: 'iCal Export',
      description: 'Download .ics calendar file',
      icon: FileText,
      action: handleICalExport,
      variant: 'outline' as const,
      category: 'calendar'
    },
    {
      id: 'email-reminders',
      title: 'Email Alerts',
      description: 'Intelligent deadline notifications',
      icon: Mail,
      action: handleEmailReminders,
      variant: 'outline' as const,
      category: 'notifications'
    },
    {
      id: 'hmrc-website',
      title: 'HMRC Portal',
      description: 'Official government portal',
      icon: ExternalLink,
      action: () => handleExternalLink('https://www.gov.uk/government/organisations/hm-revenue-customs', 'HMRC Portal'),
      variant: 'outline' as const,
      category: 'external'
    },
    {
      id: 'tax-calculator',
      title: 'Tax Calculator',
      description: 'Official HMRC tax calculator',
      icon: Calculator,
      action: () => handleExternalLink('https://www.gov.uk/estimate-income-tax', 'HMRC Tax Calculator'),
      variant: 'outline' as const,
      category: 'external'
    },
    {
      id: 'self-assessment',
      title: 'Self Assessment',
      description: 'Online Self Assessment portal',
      icon: Smartphone,
      action: () => handleExternalLink('https://www.gov.uk/log-in-file-self-assessment-tax-return', 'Self Assessment Portal'),
      variant: 'outline' as const,
      category: 'external'
    },
    {
      id: 'help-support',
      title: 'HMRC Support',
      description: 'Get help from HMRC',
      icon: HelpCircle,
      action: () => handleExternalLink('https://www.gov.uk/government/organisations/hm-revenue-customs/contact', 'HMRC Support'),
      variant: 'outline' as const,
      category: 'external'
    },
  ];

  const groupedActions = {
    download: quickActions.filter(action => action.category === 'download'),
    calendar: quickActions.filter(action => action.category === 'calendar'),
    notifications: quickActions.filter(action => action.category === 'notifications'),
    external: quickActions.filter(action => action.category === 'external')
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600">
        <CardTitle className="flex items-center gap-4 text-xl">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Download Section */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Downloads</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.download.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200"
                onClick={action.action}
                disabled={action.loading}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    action.variant === 'default' 
                      ? 'bg-white/20' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <action.icon className={`h-4 w-4 ${
                      action.loading ? 'animate-spin' : ''
                    } ${
                      action.variant === 'default' 
                        ? 'text-white' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className={`text-xs opacity-75 ${
                      action.variant === 'default' 
                        ? 'text-white' 
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {action.loading ? 'Processing...' : action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Calendar Integration Section */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Calendar Integration</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.calendar.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200"
                onClick={action.action}
                disabled={action.loading}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <action.icon className={`h-4 w-4 text-blue-600 dark:text-blue-400 ${
                      action.loading ? 'animate-spin' : ''
                    }`} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs opacity-75 text-gray-600 dark:text-gray-300">
                      {action.loading ? 'Exporting...' : action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Notifications</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.notifications.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200"
                onClick={action.action}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <action.icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs opacity-75 text-gray-600 dark:text-gray-300">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* External Resources Section */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Official Resources</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.external.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200"
                onClick={action.action}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <action.icon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs opacity-75 text-gray-600 dark:text-gray-300">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
        
        {/* Professional Footer */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Need personalized advice?</p>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              onClick={() => handleExternalLink('https://www.gov.uk/find-a-professional-adviser', 'Find an Adviser')}
            >
              Find a Chartered Accountant
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
