
import React from 'react';
import EmailReminders from '@/components/EmailReminders';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import DeadlineTemplates from '@/components/DeadlineTemplates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Settings className="h-8 w-8" />
            Settings & Preferences
          </h1>
          <p className="text-lg text-gray-600">
            Customize your tax calendar experience and manage your preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EmailReminders />
          <AccessibilityFeatures />
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Data Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // This will be implemented when export functionality is needed
                  console.log('Export calendar data');
                }}
              >
                Export Calendar Data
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // This will be implemented when print functionality is needed
                  console.log('Print calendar');
                }}
              >
                Print Calendar
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-200 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                onClick={() => {
                  localStorage.removeItem('uk-tax-calendar-data');
                  window.location.reload();
                }}
              >
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
