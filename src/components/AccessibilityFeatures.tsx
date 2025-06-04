
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accessibility, Eye, Volume2, Keyboard, MousePointer } from 'lucide-react';
import { saveUserData, loadUserData } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

const AccessibilityFeatures = () => {
  const { toast } = useToast();
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
      setSettings(prev => ({
        ...prev,
        highContrast: userData.preferences?.highContrast || false,
        largeText: userData.preferences?.largeText || false,
        reducedMotion: userData.preferences?.reducedMotion || false,
        screenReaderAnnouncements: userData.preferences?.screenReaderAnnouncements !== undefined ? userData.preferences.screenReaderAnnouncements : true,
        keyboardNavigation: userData.preferences?.keyboardNavigation !== undefined ? userData.preferences.keyboardNavigation : true,
        focusIndicators: userData.preferences?.focusIndicators !== undefined ? userData.preferences.focusIndicators : true
      }));
      
      // Apply settings to DOM on load
      if (userData.preferences?.highContrast) {
        document.documentElement.classList.add('high-contrast');
      }
      if (userData.preferences?.largeText) {
        document.documentElement.classList.add('large-text');
      }
      if (userData.preferences?.reducedMotion) {
        document.documentElement.classList.add('reduced-motion');
      }
    }
  }, []);

  const updateSetting = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Apply settings to DOM immediately
    if (key === 'highContrast') {
      document.documentElement.classList.toggle('high-contrast', value);
    }
    if (key === 'largeText') {
      document.documentElement.classList.toggle('large-text', value);
    }
    if (key === 'reducedMotion') {
      document.documentElement.classList.toggle('reduced-motion', value);
    }
    
    // Save to storage - merge with existing user data
    const userData = loadUserData();
    saveUserData({ 
      ...userData,
      preferences: { 
        ...userData.preferences,
        [key]: value
      } 
    });

    // Show success notification
    toast({
      title: 'Accessibility Setting Updated',
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const announceToScreenReader = (message: string) => {
    if (!settings.screenReaderAnnouncements) return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only absolute -left-10000px w-1 h-1 overflow-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      try {
        document.body.removeChild(announcement);
      } catch (error) {
        console.log('Announcement element already removed');
      }
    }, 1000);
    
    toast({
      title: 'Test Announcement',
      description: 'Screen reader announcement has been triggered.',
    });
  };

  const resetAllSettings = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReaderAnnouncements: true,
      keyboardNavigation: true,
      focusIndicators: true
    };
    
    setSettings(defaultSettings);
    
    // Remove all accessibility classes
    document.documentElement.classList.remove('high-contrast', 'large-text', 'reduced-motion');
    
    // Save to storage
    const userData = loadUserData();
    saveUserData({ 
      ...userData,
      preferences: { 
        ...userData.preferences,
        ...defaultSettings
      } 
    });

    toast({
      title: 'Settings Reset',
      description: 'All accessibility settings have been reset to defaults.',
    });
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-lg">
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
          <h4 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Eye className="h-4 w-4" />
            Visual
          </h4>
          
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex flex-col gap-1">
                <span className="text-gray-900 dark:text-white">High Contrast</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Increase contrast for better visibility</span>
              </Label>
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(value) => updateSetting('highContrast', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="large-text" className="flex flex-col gap-1">
                <span className="text-gray-900 dark:text-white">Large Text</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Increase font size for readability</span>
              </Label>
              <Switch
                id="large-text"
                checked={settings.largeText}
                onCheckedChange={(value) => updateSetting('largeText', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex flex-col gap-1">
                <span className="text-gray-900 dark:text-white">Reduced Motion</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Minimize animations and transitions</span>
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
          <h4 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Volume2 className="h-4 w-4" />
            Audio
          </h4>
          
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="screen-reader" className="flex flex-col gap-1">
                <span className="text-gray-900 dark:text-white">Screen Reader Announcements</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Announce important changes</span>
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
          <h4 className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Keyboard className="h-4 w-4" />
            Navigation
          </h4>
          
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="keyboard-nav" className="flex flex-col gap-1">
                <span className="text-gray-900 dark:text-white">Enhanced Keyboard Navigation</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Improved keyboard shortcuts and focus</span>
              </Label>
              <Switch
                id="keyboard-nav"
                checked={settings.keyboardNavigation}
                onCheckedChange={(value) => updateSetting('keyboardNavigation', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="focus-indicators" className="flex flex-col gap-1">
                <span className="text-gray-900 dark:text-white">Enhanced Focus Indicators</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Clearer visual focus indicators</span>
              </Label>
              <Switch
                id="focus-indicators"
                checked={settings.focusIndicators}
                onCheckedChange={(value) => updateSetting('focusIndicators', value)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t space-y-3">
          <Button
            variant="outline"
            onClick={() => announceToScreenReader('Accessibility test announcement - all systems working correctly')}
            className="w-full justify-start"
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Test Screen Reader Announcement
          </Button>
          
          <Button
            variant="outline"
            onClick={resetAllSettings}
            className="w-full justify-start text-amber-600 hover:text-amber-700 border-amber-200 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-900/20"
          >
            <MousePointer className="h-4 w-4 mr-2" />
            Reset All Settings
          </Button>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h5 className="font-medium mb-2 flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <MousePointer className="h-4 w-4" />
            Keyboard Shortcuts
          </h5>
          <div className="text-sm space-y-1 text-blue-800 dark:text-blue-200">
            <p><kbd className="bg-white dark:bg-gray-700 px-1 rounded text-xs">Ctrl+P</kbd> - Print calendar</p>
            <p><kbd className="bg-white dark:bg-gray-700 px-1 rounded text-xs">Ctrl+F</kbd> - Focus search</p>
            <p><kbd className="bg-white dark:bg-gray-700 px-1 rounded text-xs">?</kbd> - Show help</p>
            <p><kbd className="bg-white dark:bg-gray-700 px-1 rounded text-xs">Tab</kbd> - Navigate elements</p>
            <p><kbd className="bg-white dark:bg-gray-700 px-1 rounded text-xs">Enter</kbd> - Activate element</p>
            <p><kbd className="bg-white dark:bg-gray-700 px-1 rounded text-xs">Esc</kbd> - Close modals</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilityFeatures;
