
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Bell, Calendar, Mail, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsModalProps {
  children: React.ReactNode;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ children }) => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [reminderTiming, setReminderTiming] = useState('7');
  const [weekendReminders, setWeekendReminders] = useState(false);
  const [calendarSync, setCalendarSync] = useState(false);
  const [taxYearStart, setTaxYearStart] = useState('april');

  const handleSaveSettings = () => {
    // In a real app, this would save to localStorage or backend
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  const handleExportCalendar = () => {
    toast({
      title: 'Calendar Export',
      description: 'Your tax calendar is being prepared for download.',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings & Preferences
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive deadline reminders via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Browser push notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Reminder Timing</Label>
                <Select value={reminderTiming} onValueChange={setReminderTiming}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day before</SelectItem>
                    <SelectItem value="3">3 days before</SelectItem>
                    <SelectItem value="7">1 week before</SelectItem>
                    <SelectItem value="14">2 weeks before</SelectItem>
                    <SelectItem value="30">1 month before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekend-reminders">Weekend Reminders</Label>
                  <p className="text-sm text-gray-600">Send reminders on weekends</p>
                </div>
                <Switch
                  id="weekend-reminders"
                  checked={weekendReminders}
                  onCheckedChange={setWeekendReminders}
                />
              </div>
            </CardContent>
          </Card>

          {/* Calendar Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-4 w-4" />
                Calendar Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tax Year Start</Label>
                <Select value={taxYearStart} onValueChange={setTaxYearStart}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="april">April (UK Standard)</SelectItem>
                    <SelectItem value="january">January (Calendar Year)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600">
                  UK tax year runs from 6 April to 5 April
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="calendar-sync">Calendar Sync</Label>
                  <p className="text-sm text-gray-600">Export to Google/Outlook calendar</p>
                </div>
                <Switch
                  id="calendar-sync"
                  checked={calendarSync}
                  onCheckedChange={setCalendarSync}
                />
              </div>
              
              <div className="pt-2">
                <Button variant="outline" onClick={handleExportCalendar} className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Export Calendar (.ics)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-4 w-4" />
                Contact Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Email Updates</span>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span className="font-medium">SMS Alerts</span>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={handleSaveSettings} className="flex-1">
              Save Settings
            </Button>
            <Button variant="outline">
              Reset to Default
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
