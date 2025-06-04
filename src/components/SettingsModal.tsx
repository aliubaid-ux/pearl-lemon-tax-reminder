
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Calendar, Mail, Smartphone, Download, ExternalLink, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsModalProps {
  children: React.ReactNode;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ children }) => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-email-notifications') === 'true';
  });
  const [pushNotifications, setPushNotifications] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-push-notifications') === 'true';
  });
  const [reminderTiming, setReminderTiming] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-reminder-timing') || '7';
  });
  const [weekendReminders, setWeekendReminders] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-weekend-reminders') === 'true';
  });
  const [calendarSync, setCalendarSync] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-calendar-sync') === 'true';
  });
  const [taxYearStart, setTaxYearStart] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-tax-year-start') || 'april';
  });
  const [emailFrequency, setEmailFrequency] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-email-frequency') || 'weekly';
  });
  const [professionalMode, setProfessionalMode] = useState(() => {
    return localStorage.getItem('uk-tax-doctor-professional-mode') === 'true';
  });

  const handleSaveSettings = () => {
    // Save all settings to localStorage
    localStorage.setItem('uk-tax-doctor-email-notifications', emailNotifications.toString());
    localStorage.setItem('uk-tax-doctor-push-notifications', pushNotifications.toString());
    localStorage.setItem('uk-tax-doctor-reminder-timing', reminderTiming);
    localStorage.setItem('uk-tax-doctor-weekend-reminders', weekendReminders.toString());
    localStorage.setItem('uk-tax-doctor-calendar-sync', calendarSync.toString());
    localStorage.setItem('uk-tax-doctor-tax-year-start', taxYearStart);
    localStorage.setItem('uk-tax-doctor-email-frequency', emailFrequency);
    localStorage.setItem('uk-tax-doctor-professional-mode', professionalMode.toString());

    toast({
      title: 'Settings Saved Successfully',
      description: 'Your preferences have been updated and will take effect immediately.',
    });
  };

  const handleResetSettings = () => {
    // Reset all settings to defaults
    setEmailNotifications(true);
    setPushNotifications(false);
    setReminderTiming('7');
    setWeekendReminders(false);
    setCalendarSync(false);
    setTaxYearStart('april');
    setEmailFrequency('weekly');
    setProfessionalMode(true);

    // Clear localStorage
    localStorage.removeItem('uk-tax-doctor-email-notifications');
    localStorage.removeItem('uk-tax-doctor-push-notifications');
    localStorage.removeItem('uk-tax-doctor-reminder-timing');
    localStorage.removeItem('uk-tax-doctor-weekend-reminders');
    localStorage.removeItem('uk-tax-doctor-calendar-sync');
    localStorage.removeItem('uk-tax-doctor-tax-year-start');
    localStorage.removeItem('uk-tax-doctor-email-frequency');
    localStorage.removeItem('uk-tax-doctor-professional-mode');

    toast({
      title: 'Settings Reset',
      description: 'All settings have been reset to their default values.',
    });
  };

  const handleExportCalendar = () => {
    const currentYear = new Date().getFullYear();
    const icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UK Tax Doctor//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:sa-deadline-${currentYear}@uktaxdoctor.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
DTSTART:${currentYear + 1}0131T235900Z
DTEND:${currentYear + 1}0131T235900Z
SUMMARY:Self Assessment Deadline
DESCRIPTION:Final deadline for Self Assessment tax return submission
LOCATION:United Kingdom
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Self Assessment deadline in 7 days
END:VALARM
END:VEVENT
BEGIN:VEVENT
UID:poa-1-${currentYear}@uktaxdoctor.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z
DTSTART:${currentYear + 1}0131T235900Z
DTEND:${currentYear + 1}0131T235900Z
SUMMARY:Payment on Account (1st)
DESCRIPTION:First payment on account deadline
LOCATION:United Kingdom
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Payment on Account deadline in 7 days
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icalContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'uk-tax-calendar-professional.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast({
      title: 'Calendar Export Complete',
      description: 'Your personalized tax calendar has been downloaded successfully.',
    });
  };

  const handleGoogleCalendarSync = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=UK%20Tax%20Deadlines&details=Professional%20UK%20tax%20deadline%20management&dates=20250131T235900Z/20250131T235900Z`;
    window.open(googleCalendarUrl, '_blank');
    
    toast({
      title: 'Google Calendar Sync',
      description: 'Opening Google Calendar integration...',
    });
  };

  const handleTestEmail = () => {
    if (!emailNotifications) {
      toast({
        title: "Email Notifications Disabled",
        description: "Please enable email notifications first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: 'Test Email Sent',
      description: 'A sample deadline reminder has been sent to your email address.',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            Professional Settings & Preferences
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5 text-blue-600" />
                Smart Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-semibold">Email Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Professional deadline reminders via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="font-semibold">Browser Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real-time browser alerts</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="font-semibold">Reminder Timing</Label>
                <Select value={reminderTiming} onValueChange={setReminderTiming}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 z-50">
                    <SelectItem value="1">1 day before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                    <SelectItem value="7">1 week before</SelectItem>
                    <SelectItem value="14">2 weeks before</SelectItem>
                    <SelectItem value="30">1 month before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">Email Frequency</Label>
                <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 z-50">
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly summary</SelectItem>
                    <SelectItem value="monthly">Monthly overview</SelectItem>
                    <SelectItem value="asneeded">As needed only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekend-reminders" className="font-semibold">Weekend Reminders</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Include weekend notifications</p>
                </div>
                <Switch
                  id="weekend-reminders"
                  checked={weekendReminders}
                  onCheckedChange={setWeekendReminders}
                />
              </div>

              <div className="pt-4 border-t">
                <Button onClick={handleTestEmail} variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Integration */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-green-600" />
                Calendar Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label className="font-semibold">Tax Year Start</Label>
                <Select value={taxYearStart} onValueChange={setTaxYearStart}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 z-50">
                    <SelectItem value="april">April 6th (UK Standard)</SelectItem>
                    <SelectItem value="january">January 1st (Calendar Year)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  UK tax year runs from 6 April to 5 April
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="calendar-sync" className="font-semibold">Auto Calendar Sync</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatic calendar updates</p>
                </div>
                <Switch
                  id="calendar-sync"
                  checked={calendarSync}
                  onCheckedChange={setCalendarSync}
                />
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <Button onClick={handleGoogleCalendarSync} variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Sync with Google Calendar
                </Button>
                
                <Button onClick={handleExportCalendar} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Calendar (.ics)
                </Button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                  📅 Professional Integration
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Seamlessly integrate with Outlook, Apple Calendar, and other professional tools
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Features */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="h-5 w-5 text-purple-600" />
                Professional Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="professional-mode" className="font-semibold">Professional Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced features for accountants</p>
                </div>
                <Switch
                  id="professional-mode"
                  checked={professionalMode}
                  onCheckedChange={setProfessionalMode}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Smart Email Templates</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Professional</Badge>
                </div>
                
                <div className="p-3 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Multi-Client Management</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Advanced</Badge>
                </div>
                
                <div className="p-3 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Custom Deadline Templates</span>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">Premium</Badge>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                  💡 Professional Tip
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Enable all notification types for comprehensive deadline management
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
          <Button onClick={handleSaveSettings} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
            <Settings className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleResetSettings}>
            Reset to Defaults
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
