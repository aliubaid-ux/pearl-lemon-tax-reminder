
import React from 'react';
import SharedHeader from '@/components/SharedHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfileSettings from '@/components/settings/UserProfileSettings';
import EmailPreferencesManager from '@/components/email-reminders/EmailPreferencesManager';
import SubscriptionStatusDashboard from '@/components/subscription/SubscriptionStatusDashboard';
import { User, Mail, Crown } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SharedHeader 
        title="Settings"
        subtitle="Manage your account preferences and subscription"
      />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Subscription
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <UserProfileSettings />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <EmailPreferencesManager />
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <SubscriptionStatusDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
