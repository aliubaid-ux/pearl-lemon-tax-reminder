
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accessibility, Eye, Volume2, Keyboard, MousePointer } from 'lucide-react';
import { saveUserData, loadUserData } from '@/utils/storage';

const AccessibilityFeatures = () => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReaderAnnouncements: true,
    keyboardNavigation: true,
    focusIndicators: true
  });

  useEffect(() => {
    const userData = loadUserData();
    if (userData.preferences) {
      setSettings(prev => ({ ...prev, ...userData.preferences }));
    }
  }, []);

  const updateSetting = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Apply settings to DOM
    if (key === 'highContrast') {
      document.documentElement.classList.toggle('high-contrast', value);
    }
    if (key === 'largeText') {
      document.documentElement.classList.toggle('large-text', value);
    }
    if (key === 'reducedMotion') {
      document.documentElement.classList.toggle('reduced-motion', value);
    }
    
    // Save to storage
    saveUserData({ preferences: newSettings });
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <Accessibility className="h-5 w-5 text-white" />
          </div>
          Accessibility Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Visual Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visual
          </h4>
          
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex flex-col gap-1">
                <span>High Contrast</span>
                <span className="text-sm text-gray-600">Increase contrast for better visibility</span>
              </Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(value) => updateSetting('highContrast', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="large-text" className="flex flex-col gap-1">
                <span>Large Text</span>
                <span className="text-sm text-gray-600">Increase font size for readability</span>
              </Label>
              <Switch
                id="large-text"
                checked={settings.largeText}
                onCheckedChange={(value) => updateSetting('largeText', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex flex-col gap-1">
                <span>Reduced Motion</span>
                <span className="text-sm text-gray-600">Minimize animations and transitions</span>
              </Label>
              <Switch
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={(value) => updateSetting('reducedMotion', value)}
              />
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Audio
          </h4>
          
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="screen-reader" className="flex flex-col gap-1">
                <span>Screen Reader Announcements</span>
                <span className="text-sm text-gray-600">Announce important changes</span>
              </Label>
              <Switch
                id="screen-reader"
                checked={settings.screenReaderAnnouncements}
                onCheckedChange={(value) => updateSetting('screenReaderAnnouncements', value)}
              />
            </div>
          </div>
        </div>

        {/* Navigation Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Keyboard className="h-4 w-4" />
            Navigation
          </h4>
          
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="keyboard-nav" className="flex flex-col gap-1">
                <span>Enhanced Keyboard Navigation</span>
                <span className="text-sm text-gray-600">Improved keyboard shortcuts and focus</span>
              </Label>
              <Switch
                id="keyboard-nav"
                checked={settings.keyboardNavigation}
                onCheckedChange={(value) => updateSetting('keyboardNavigation', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="focus-indicators" className="flex flex-col gap-1">
                <span>Enhanced Focus Indicators</span>
                <span className="text-sm text-gray-600">Clearer visual focus indicators</span>
              </Label>
              <Switch
                id="focus-indicators"
                checked={settings.focusIndicators}
                onCheckedChange={(value) => updateSetting('focusIndicators', value)}
              />
            </div>
          </div>
        </div>

        {/* Test Announcement */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => announceToScreenReader('Accessibility test announcement')}
            className="w-full"
          >
            Test Screen Reader Announcement
          </Button>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium mb-2 flex items-center gap-2">
            <MousePointer className="h-4 w-4" />
            Keyboard Shortcuts
          </h5>
          <div className="text-sm space-y-1 text-blue-800">
            <p><kbd className="bg-white px-1 rounded">Ctrl+P</kbd> - Print calendar</p>
            <p><kbd className="bg-white px-1 rounded">Ctrl+F</kbd> - Focus search</p>
            <p><kbd className="bg-white px-1 rounded">?</kbd> - Show help</p>
            <p><kbd className="bg-white px-1 rounded">Tab</kbd> - Navigate elements</p>
            <p><kbd className="bg-white px-1 rounded">Enter</kbd> - Activate element</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilityFeatures;
