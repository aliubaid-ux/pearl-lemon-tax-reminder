
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveUserData, loadUserData } from '@/utils/storage';
import EmailReminderToggle from './email-reminders/EmailReminderToggle';
import EmailInput from './email-reminders/EmailInput';
import NotificationTiming from './email-reminders/NotificationTiming';
import CurrentSettings from './email-reminders/CurrentSettings';

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
        <EmailReminderToggle
          enabled={userData.emailReminders.enabled}
          onToggle={toggleReminders}
        />

        <EmailInput
          email={email}
          isValidEmail={isValidEmail}
          enabled={userData.emailReminders.enabled}
          onEmailChange={handleEmailChange}
          onSave={saveEmailSettings}
        />

        <NotificationTiming
          currentDays={userData.emailReminders.daysBeforeNotification}
          enabled={userData.emailReminders.enabled}
          onUpdateDays={updateNotificationDays}
        />

        <CurrentSettings
          enabled={userData.emailReminders.enabled}
          email={userData.emailReminders.email}
          daysBeforeNotification={userData.emailReminders.daysBeforeNotification}
        />

        <div className="text-xs text-gray-500 text-center p-3 bg-gray-50 rounded-lg">
          <p>Note: This is a demo feature. In a production app, this would integrate with an email service.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailReminders;
