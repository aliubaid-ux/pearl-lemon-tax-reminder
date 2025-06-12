
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Bell, Mail, Clock, Save, RefreshCw } from 'lucide-react';

const EmailPreferencesManager: React.FC = () => {
  const { profile, loading, updateProfile } = useUserProfile();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notificationDays, setNotificationDays] = useState<number[]>([7, 1]);
  const [customDays, setCustomDays] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setEmailNotifications(profile.email_notifications || true);
      setNotificationDays(profile.notification_days || [7, 1]);
    }
  }, [profile]);

  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      await updateProfile({
        email_notifications: emailNotifications,
        notification_days: notificationDays
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePresetDays = (days: number[]) => {
    setNotificationDays(days);
  };

  const handleCustomDays = () => {
    const days = customDays
      .split(',')
      .map(d => parseInt(d.trim()))
      .filter(d => !isNaN(d) && d > 0)
      .sort((a, b) => b - a);
    
    if (days.length > 0) {
      setNotificationDays(days);
      setCustomDays('');
    }
  };

  const presetOptions = [
    { label: "1 day before", value: [1] },
    { label: "3 days before", value: [3] },
    { label: "1 week before", value: [7] },
    { label: "1 week + 1 day", value: [7, 1] },
    { label: "2 weeks + 3 days", value: [14, 3] },
    { label: "1 month + 1 week", value: [30, 7] }
  ];

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-blue-600" />
          Email Notification Preferences
        </CardTitle>
        <CardDescription>
          Configure when and how you receive tax deadline reminders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Master Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <div>
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Receive email reminders for upcoming tax deadlines
              </p>
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            disabled={loading}
          />
        </div>

        {/* Current Settings Display */}
        {profile && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900 dark:text-blue-100">Current Settings</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <span className="text-blue-700 dark:text-blue-300">{profile.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge variant={emailNotifications ? "default" : "secondary"}>
                  {emailNotifications ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              {emailNotifications && (
                <div className="flex items-center justify-between">
                  <span>Notify:</span>
                  <span className="text-blue-700 dark:text-blue-300">
                    {notificationDays.length > 0
                      ? `${notificationDays.join(', ')} days before`
                      : 'Not configured'
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notification Timing */}
        {emailNotifications && (
          <div className="space-y-4">
            <Label className="text-base font-medium">Notification Timing</Label>
            
            {/* Preset Options */}
            <div className="grid grid-cols-2 gap-2">
              {presetOptions.map((preset, index) => (
                <Button
                  key={index}
                  variant={
                    JSON.stringify(notificationDays.sort((a, b) => b - a)) === 
                    JSON.stringify(preset.value.sort((a, b) => b - a))
                      ? "default" 
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handlePresetDays(preset.value)}
                  disabled={loading}
                  className="justify-start text-left"
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Custom Days Input */}
            <div className="space-y-2">
              <Label htmlFor="custom-days" className="text-sm">Custom days (comma-separated)</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-days"
                  placeholder="e.g., 14, 7, 3, 1"
                  value={customDays}
                  onChange={(e) => setCustomDays(e.target.value)}
                  disabled={loading}
                />
                <Button 
                  onClick={handleCustomDays}
                  disabled={!customDays.trim() || loading}
                  size="sm"
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Current Selection Display */}
            {notificationDays.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Selected:</span>
                {notificationDays.map((day, index) => (
                  <Badge key={index} variant="outline">
                    {day} day{day > 1 ? 's' : ''} before
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Save Button */}
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={handleSavePreferences}
            disabled={saving || loading}
            className="flex-1"
          >
            {saving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailPreferencesManager;
