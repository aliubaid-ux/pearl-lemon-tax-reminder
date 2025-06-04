
import React from 'react';
import { Calendar, AlertTriangle, PlayCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <TooltipProvider>
      <section className="text-center mb-8 animate-fade-in">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-6 border shadow-xl hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  PL Tax Reminder
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Never miss a deadline again
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onShowShortcuts}
                    className="border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View keyboard shortcuts</p>
                </TooltipContent>
              </Tooltip>
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
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={onToggleAdvanced}
                  className="border-green-200 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                >
                  {showAdvanced ? 'Simple View' : 'Advanced Features'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showAdvanced ? "Switch to simple view with just the essentials" : "Access advanced features like calculators and detailed tools"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default HeroSection;
