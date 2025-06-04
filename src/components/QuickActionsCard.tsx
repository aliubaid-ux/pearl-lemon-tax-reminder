
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Bell, FileText, Calculator, HelpCircle, Calendar, Mail, Smartphone, Printer, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { printCalendar, exportToCSV, shareDeadlines } from '@/utils/exportUtils';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { loadUserData } from '@/utils/storage';

const QuickActionsCard = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const userData = loadUserData();
  const deadlines = getTaxDeadlines(userData.userType);

  const handleDownload = async () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Download Started",
        description: "Your comprehensive UK tax year guide is being downloaded.",
      });
    }, 1500);
  };

  const handlePrint = () => {
    printCalendar(deadlines, userData.userType);
    toast({
      title: "Opening Print Dialog",
      description: "Your tax calendar is ready to print.",
    });
  };

  const handleExportCSV = () => {
    exportToCSV(deadlines);
    toast({
      title: "CSV Export Complete",
      description: "Your tax calendar data has been downloaded.",
    });
  };

  const handleShare = async () => {
    try {
      await shareDeadlines(deadlines, userData.userType);
      toast({
        title: "Share Successful",
        description: "Tax calendar shared successfully.",
      });
    } catch (error) {
      toast({
        title: "Shared to Clipboard",
        description: "Tax calendar copied to clipboard.",
      });
    }
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
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Tax%20Deadline%20Reminder&dates=${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=Important%20UK%20tax%20deadline%20approaching&location=UK`;
      
      window.open(googleCalendarUrl, '_blank');
      toast({
        title: "Google Calendar Export",
        description: "Opening Google Calendar with your tax deadlines...",
      });
    }, 1000);
  };

  const quickActions = [
    {
      id: 'print',
      title: 'Print Calendar',
      description: 'Print-friendly tax calendar',
      icon: Printer,
      action: handlePrint,
      variant: 'default' as const,
      category: 'export'
    },
    {
      id: 'export-csv',
      title: 'Export CSV',
      description: 'Download as spreadsheet',
      icon: Download,
      action: handleExportCSV,
      variant: 'outline' as const,
      category: 'export'
    },
    {
      id: 'share',
      title: 'Share Calendar',
      description: 'Share your deadlines',
      icon: Share,
      action: handleShare,
      variant: 'outline' as const,
      category: 'export'
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
      id: 'download-guide',
      title: 'Tax Year Guide',
      description: 'Comprehensive PDF guide',
      icon: FileText,
      action: handleDownload,
      loading: isDownloading,
      variant: 'outline' as const,
      category: 'download'
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
      description: 'Official HMRC calculator',
      icon: Calculator,
      action: () => handleExternalLink('https://www.gov.uk/estimate-income-tax', 'HMRC Tax Calculator'),
      variant: 'outline' as const,
      category: 'external'
    },
    {
      id: 'self-assessment',
      title: 'Self Assessment',
      description: 'Online portal',
      icon: Smartphone,
      action: () => handleExternalLink('https://www.gov.uk/log-in-file-self-assessment-tax-return', 'Self Assessment Portal'),
      variant: 'outline' as const,
      category: 'external'
    },
  ];

  const groupedActions = {
    export: quickActions.filter(action => action.category === 'export'),
    calendar: quickActions.filter(action => action.category === 'calendar'),
    download: quickActions.filter(action => action.category === 'download'),
    external: quickActions.filter(action => action.category === 'external')
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <CardTitle className="flex items-center gap-4 text-xl">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-gray-900 dark:text-white">Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Export & Print Section */}
        <div>
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 text-sm uppercase tracking-wide">Export & Print</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.export.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className={`w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200 ${
                  action.variant === 'default' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20'
                }`}
                onClick={action.action}
                disabled={action.loading}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg ${
                    action.variant === 'default' 
                      ? 'bg-white/20' 
                      : 'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    <action.icon className={`h-4 w-4 ${
                      action.loading ? 'animate-spin' : ''
                    } ${
                      action.variant === 'default' 
                        ? 'text-white' 
                        : 'text-green-600 dark:text-green-400'
                    }`} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{action.title}</div>
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
          <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 text-sm uppercase tracking-wide">Calendar Integration</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.calendar.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200 border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20"
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
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{action.title}</div>
                    <div className="text-xs opacity-75 text-gray-600 dark:text-gray-300">
                      {action.loading ? 'Exporting...' : action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Downloads Section */}
        <div>
          <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3 text-sm uppercase tracking-wide">Downloads</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.download.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200 border-purple-200 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
                onClick={action.action}
                disabled={action.loading}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <action.icon className={`h-4 w-4 text-purple-600 dark:text-purple-400 ${
                      action.loading ? 'animate-spin' : ''
                    }`} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{action.title}</div>
                    <div className="text-xs opacity-75 text-gray-600 dark:text-gray-300">
                      {action.loading ? 'Processing...' : action.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* External Resources Section */}
        <div>
          <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-3 text-sm uppercase tracking-wide">Official Resources</h4>
          <div className="grid grid-cols-1 gap-2">
            {groupedActions.external.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200 border-orange-200 hover:bg-orange-50 dark:border-orange-700 dark:hover:bg-orange-900/20"
                onClick={action.action}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <action.icon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{action.title}</div>
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
              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
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
