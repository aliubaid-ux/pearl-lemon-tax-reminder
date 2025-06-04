
import React from 'react';
import { Calendar, AlertTriangle, PlayCircle, Keyboard } from 'lucide-react';
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
    <section className="text-center mb-12 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border shadow-xl hover-lift">
        <div className="flex items-center justify-between mb-6">
          <MobileNavigation 
            urgentCount={urgentDeadlines.length} 
            onQuickAction={onQuickAction}
          />
          <div className="flex items-center gap-4">
            <div className="p-4 pearl-gradient rounded-2xl shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                UK Tax Calendar
              </h1>
              <p className="text-lg text-gray-600">
                Never miss a tax deadline again
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShowShortcuts}
              className="hidden lg:flex items-center gap-2"
            >
              <Keyboard className="h-4 w-4" />
              Shortcuts
            </Button>
          </div>
        </div>
        
        {urgentDeadlines.length > 0 && (
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg animate-pulse mb-4">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">
              {urgentDeadlines.length} urgent deadline{urgentDeadlines.length > 1 ? 's' : ''} approaching
            </span>
          </div>
        )}

        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Get started by selecting your profile below, then view your personalized tax calendar.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={onGetStarted} className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            Get Started
          </Button>
          <Button variant="outline" onClick={onToggleAdvanced}>
            {showAdvanced ? 'Simple View' : 'Advanced Features'}
          </Button>
          
          <div className="hidden lg:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onPrint}
              className="flex items-center gap-2"
            >
              Print
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onShare}
              className="flex items-center gap-2"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
