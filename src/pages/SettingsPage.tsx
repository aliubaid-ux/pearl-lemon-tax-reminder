
import React from 'react';
import EmailReminders from '@/components/EmailReminders';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import DeadlineTemplates from '@/components/DeadlineTemplates';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Download, Printer, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();

  const handleExportData = () => {
    try {
      // Export all localStorage data
      const data = {
        userData: localStorage.getItem('uk-tax-calendar-user-data'),
        notes: localStorage.getItem('uk-tax-calendar-notes'),
        progress: localStorage.getItem('uk-tax-calendar-progress'),
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `uk-tax-calendar-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Data Exported Successfully',
        description: 'Your calendar data has been downloaded as a backup file.',
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting your data. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handlePrintCalendar = () => {
    try {
      // Open a new window with printable calendar view
      const printWindow = window.open('/', '_blank');
      if (printWindow) {
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
          }, 1000);
        };
      }
      
      toast({
        title: 'Print Preview Opened',
        description: 'A new window has opened with your calendar ready to print.',
      });
    } catch (error) {
      toast({
        title: 'Print Failed',
        description: 'There was an error opening the print preview.',
        variant: 'destructive',
      });
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      try {
        localStorage.removeItem('uk-tax-calendar-user-data');
        localStorage.removeItem('uk-tax-calendar-notes');
        localStorage.removeItem('uk-tax-calendar-progress');
        localStorage.removeItem('dismissed-suggestions');
        
        toast({
          title: 'Data Reset Successfully',
          description: 'All your data has been cleared. The page will reload.',
        });
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast({
          title: 'Reset Failed',
          description: 'There was an error resetting your data.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Calendar
            </Link>
            <div className="flex-1" />
            <ThemeToggle />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Settings & Preferences
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Customize your tax calendar experience and manage your preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
          <EmailReminders />
          <AccessibilityFeatures />
          
          {/* Data Management Card */}
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Calendar Data
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                onClick={handlePrintCalendar}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Calendar
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white dark:bg-gray-800 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                onClick={handleResetData}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All Data
              </Button>
            </CardContent>
          </Card>
          
          <DeadlineTemplates />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
