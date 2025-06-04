
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Mail, Bell, Settings, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveUserData, loadUserData } from '@/utils/storage';

const EmailReminders = () => {
  const [userData, setUserData] = useState(loadUserData());
  const [email, setEmail] = useState(userData.emailReminders.email || '');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validateEmail(value) || value === '');
  };

  const toggleReminders = (enabled: boolean) => {
    const updatedData = {
      ...userData,
      emailReminders: {
        ...userData.emailReminders,
        enabled,
        email: enabled ? email : userData.emailReminders.email
      }
    };
    setUserData(updatedData);
    saveUserData(updatedData);
    
    toast({
      title: enabled ? "Email Reminders Enabled" : "Email Reminders Disabled",
      description: enabled 
        ? "You'll receive notifications before deadlines" 
        : "Email notifications have been turned off",
    });
  };

  const updateNotificationDays = (days: number[]) => {
    const updatedData = {
      ...userData,
      emailReminders: {
        ...userData.emailReminders,
        daysBeforeNotification: days
      }
    };
    setUserData(updatedData);
    saveUserData(updatedData);
  };

  const saveEmailSettings = () => {
    if (!isValidEmail) return;
    
    const updatedData = {
      ...userData,
      emailReminders: {
        ...userData.emailReminders,
        email
      }
    };
    setUserData(updatedData);
    saveUserData(updatedData);
    
    toast({
      title: "Email Settings Saved",
      description: "Your notification preferences have been updated",
    });
  };

  const presetDays = [
    { label: "1 day", value: [1] },
    { label: "3 days", value: [3] },
    { label: "1 week", value: [7] },
    { label: "1 week + 1 day", value: [7, 1] },
    { label: "2 weeks + 3 days", value: [14, 3] },
    { label: "Custom", value: [] }
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Mail className="h-5 w-5 text-white" />
          </div>
          Email Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-gray-600" />
            <div>
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-gray-600">Get notified before tax deadlines</p>
            </div>
          </div>
          <Switch
            checked={userData.emailReminders.enabled}
            onCheckedChange={toggleReminders}
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={!isValidEmail ? 'border-red-500' : ''}
              disabled={!userData.emailReminders.enabled}
            />
            <Button 
              onClick={saveEmailSettings}
              disabled={!isValidEmail || !email || !userData.emailReminders.enabled}
              size="sm"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
          {!isValidEmail && (
            <p className="text-sm text-red-600">Please enter a valid email address</p>
          )}
        </div>

        {/* Notification Timing */}
        <div className="space-y-3">
          <Label>Notification Timing</Label>
          <div className="grid grid-cols-2 gap-2">
            {presetDays.map((preset, index) => (
              <Button
                key={index}
                variant={
                  JSON.stringify(userData.emailReminders.daysBeforeNotification) === JSON.stringify(preset.value)
                    ? "default" 
                    : "outline"
                }
                size="sm"
                onClick={() => updateNotificationDays(preset.value)}
                disabled={!userData.emailReminders.enabled}
                className="justify-start"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Settings Display */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">Current Settings</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between">
              <span>Status:</span>
              <Badge variant={userData.emailReminders.enabled ? "default" : "secondary"}>
                {userData.emailReminders.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            {userData.emailReminders.enabled && (
              <>
                <div className="flex items-center justify-between">
                  <span>Email:</span>
                  <span className="text-blue-700">{userData.emailReminders.email || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Notify:</span>
                  <span className="text-blue-700">
                    {userData.emailReminders.daysBeforeNotification.length > 0
                      ? `${userData.emailReminders.daysBeforeNotification.join(', ')} days before`
                      : 'Not configured'
                    }
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Info Message */}
        <div className="text-xs text-gray-500 text-center p-3 bg-gray-50 rounded-lg">
          <p>Note: This is a demo feature. In a production app, this would integrate with an email service.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailReminders;
