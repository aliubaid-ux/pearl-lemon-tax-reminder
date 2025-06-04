
import React, { useState } from 'react';
import { AlertTriangle, Calendar, CheckCircle, Calculator, Mail, FileText, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface QuickStatusOverviewProps {
  upcomingDeadlines: any[];
  onDeadlineClick: (deadline: any) => void;
  onShowAdvanced: () => void;
  onQuickAction: (action: string) => void;
}

const QuickStatusOverview: React.FC<QuickStatusOverviewProps> = ({
  upcomingDeadlines,
  onDeadlineClick,
  onShowAdvanced,
  onQuickAction
}) => {
  const { toast } = useToast();
  const [showCalendarOptions, setShowCalendarOptions] = useState<any>(null);

  const handleViewAllDeadlines = () => {
    // Scroll to the deadlines tab and activate it
    setTimeout(() => {
      const deadlinesTab = document.querySelector('[value="deadlines"]') as HTMLElement;
      if (deadlinesTab) {
        deadlinesTab.click();
        deadlinesTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toast({
          title: "Showing All Deadlines",
          description: "Navigated to the complete deadlines view.",
        });
      }
    }, 100);
  };

  const handleAddToCalendar = (deadline: any) => {
    setShowCalendarOptions(deadline);
  };

  const exportToGoogleCalendar = (deadline: any) => {
    const deadlineDate = new Date(deadline.date);
    const startDate = deadlineDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endDate = new Date(deadlineDate.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(deadline.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(deadline.description || 'Tax deadline reminder')}&location=UK`;
    
    window.open(googleCalUrl, '_blank');
    setShowCalendarOptions(null);
    toast({
      title: "Google Calendar",
      description: "Opening Google Calendar with your deadline.",
    });
  };

  const exportToiCal = (deadline: any) => {
    const deadlineDate = new Date(deadline.date);
    const startDate = deadlineDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endDate = new Date(deadlineDate.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    
    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PL Tax Reminder//EN
BEGIN:VEVENT
UID:${deadline.id}@pltaxreminder.com
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${deadline.title}
DESCRIPTION:${deadline.description || 'Tax deadline reminder'}
LOCATION:UK
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icalContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${deadline.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setShowCalendarOptions(null);
    toast({
      title: "iCal Export",
      description: "Calendar file downloaded successfully.",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-slide-up">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              Your Priority Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-3">
                {upcomingDeadlines.slice(0, 2).map((deadline) => (
                  <div 
                    key={deadline.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{deadline.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(deadline.date).toLocaleDateString('en-GB', { 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={deadline.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'}>
                        {deadline.priority}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddToCalendar(deadline)}
                        className="border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" className="flex-1" onClick={handleViewAllDeadlines}>
                    <FileText className="h-4 w-4 mr-2" />
                    View All Deadlines
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-300 font-medium">All caught up!</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">No urgent deadlines in the next 3 months</p>
                <Button variant="outline" size="sm" onClick={handleViewAllDeadlines}>
                  View All Deadlines
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover-lift">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <ArrowRight className="h-6 w-6 text-blue-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start hover:bg-green-50 border-green-200 dark:border-green-700 dark:hover:bg-green-900/20" 
                onClick={handleViewAllDeadlines}
              >
                <Calendar className="h-4 w-4 mr-2 text-green-600" />
                View All Tax Deadlines
                <span className="ml-auto text-xs text-gray-500">Complete annual view</span>
              </Button>
              <div className="text-center py-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  More tools available in the navigation menu above
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Options Modal */}
      {showCalendarOptions && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Add to Calendar</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{showCalendarOptions.title}</p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => exportToGoogleCalendar(showCalendarOptions)}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Google Calendar
              </Button>
              
              <Button 
                onClick={() => exportToiCal(showCalendarOptions)}
                variant="outline"
                className="w-full justify-start border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <Download className="h-4 w-4 mr-2" />
                Download iCal (.ics)
              </Button>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCalendarOptions(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickStatusOverview;
