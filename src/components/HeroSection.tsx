
import React from 'react';
import { Calendar, AlertTriangle, PlayCircle, Download, Settings, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileNavigation from '@/components/MobileNavigation';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeroSectionProps {
  urgentDeadlines: any[];
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  onGetStarted: () => void;
  onShowShortcuts: () => void;
  onQuickAction: (action: string) => void;
  onPrint: () => void;
  onShare: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  urgentDeadlines,
  showAdvanced,
  onToggleAdvanced,
  onGetStarted,
  onShowShortcuts,
  onQuickAction,
  onPrint,
  onShare
}) => {
  return (
    <section className="text-center mb-8 animate-fade-in">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 border shadow-xl hover-lift">
        <div className="flex items-center justify-between mb-4">
          <MobileNavigation 
            urgentCount={urgentDeadlines.length} 
            onQuickAction={onQuickAction}
          />
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              PL Tax Reminder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Never miss a deadline again
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onQuickAction('export')}
              className="hidden lg:flex items-center gap-2 border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
              title="Export your calendar data"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onQuickAction('settings')}
              className="hidden lg:flex items-center gap-2 border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
              title="Advanced settings and tools"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {urgentDeadlines.length > 0 && (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg animate-pulse mb-4">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">
              {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''} approaching
            </span>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-4 text-sm">
          Get started by selecting your profile below, then view your personalized tax calendar.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button 
            onClick={onGetStarted} 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <PlayCircle className="h-4 w-4" />
            Get Started
          </Button>
          <Button 
            variant="outline" 
            onClick={onToggleAdvanced}
            className="border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
            title={showAdvanced ? "Switch to simple view with just the essentials" : "Access advanced features like calculators and detailed tools"}
          >
            {showAdvanced ? 'Simple View' : 'Advanced Features'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
