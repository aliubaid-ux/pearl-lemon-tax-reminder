
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, X, Lightbulb, BookOpen, ExternalLink, MessageCircle, ArrowRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ContextualHelpSystemProps {
  currentSection: string;
  userType: string;
}

const ContextualHelpSystem: React.FC<ContextualHelpSystemProps> = ({ 
  currentSection, 
  userType 
}) => {
  const [activeHelpCard, setActiveHelpCard] = useState<string | null>(null);
  const [showSmartTips, setShowSmartTips] = useState(true);

  const helpContent = {
    'user-type-selection': {
      title: 'Choosing Your Tax Profile',
      content: 'Your tax profile determines which deadlines and obligations apply to you. Don\'t worry if you\'re not sure - you can always change this later.',
      tips: [
        'Self-employed: You work for yourself and invoice clients directly',
        'Company director: You run a limited company and pay yourself a salary/dividends',
        'Both: You have a company AND do some self-employed work on the side'
      ],
      relatedHelp: ['What\'s the difference between self-employed and company director?', 'Can I change my profile later?']
    },
    'deadlines': {
      title: 'Understanding Tax Deadlines',
      content: 'Tax deadlines are fixed dates when you must file returns or pay taxes. Missing them results in penalties, but with proper planning, they\'re easy to meet.',
      tips: [
        'Set reminders 2-4 weeks before each deadline',
        'Gather documents early - don\'t wait until the last minute',
        'If you can\'t meet a deadline, contact HMRC immediately'
      ],
      relatedHelp: ['What happens if I miss a deadline?', 'How to request an extension']
    },
    'calendar-integration': {
      title: 'Adding Deadlines to Your Calendar',
      content: 'Integrating tax deadlines with your personal calendar ensures you never forget important dates. All major calendar apps support this feature.',
      tips: [
        'Choose the calendar you check most often',
        'Set multiple reminders: 1 month, 1 week, and 1 day before',
        'Include preparation time, not just the deadline itself'
      ],
      relatedHelp: ['Which calendar app works best?', 'How to set up reminders']
    }
  };

  const smartTips = {
    'self-employed': [
      'Track expenses throughout the year - don\'t wait until tax time!',
      'Save 20-30% of your income for taxes in a separate account',
      'Keep receipts for everything business-related, including travel'
    ],
    'company-director': [
      'Remember: you have both company AND personal tax obligations',
      'Pay yourself efficiently with a mix of salary and dividends',
      'Keep detailed records of company expenses and director\'s loans'
    ],
    'both': [
      'Separate your self-employed and company income carefully',
      'You might need to file multiple tax returns',
      'Consider the tax efficiency of each type of income'
    ]
  };

  const currentHelp = helpContent[currentSection as keyof typeof helpContent];
  const currentTips = smartTips[userType as keyof typeof smartTips] || [];

  useEffect(() => {
    // Show contextual help automatically when section changes
    if (currentSection && currentHelp) {
      setActiveHelpCard(currentSection);
      // Auto-hide after 10 seconds unless user interacts
      const timer = setTimeout(() => {
        setActiveHelpCard(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, currentHelp]);

  if (!currentHelp) return null;

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        {/* Smart Tips Card */}
        {showSmartTips && currentTips.length > 0 && (
          <Card className="mb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <h4 className="font-medium text-green-900 dark:text-green-100 text-sm">
                    Smart Tips for {userType.replace('-', ' ')}
                  </h4>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowSmartTips(false)}
                  className="h-6 w-6 p-0 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <ul className="space-y-1">
                {currentTips.slice(0, 2).map((tip, index) => (
                  <li key={index} className="text-xs text-green-700 dark:text-green-300 flex items-start gap-1">
                    <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Main Contextual Help Card */}
        {activeHelpCard && (
          <Card className="bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                    {currentHelp.title}
                  </h4>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setActiveHelpCard(null)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {currentHelp.content}
              </p>
              
              <div className="space-y-2 mb-3">
                {currentHelp.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs">
                    <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                      {index + 1}
                    </Badge>
                    <span className="text-gray-600 dark:text-gray-400">{tip}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Learn More
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open detailed guide</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Ask AI
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get personalized help</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {currentHelp.relatedHelp.length > 0 && (
                <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Related questions:</p>
                  {currentHelp.relatedHelp.map((question, index) => (
                    <button 
                      key={index}
                      className="block text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mb-1 text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Help Trigger Button (when no help card is active) */}
        {!activeHelpCard && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setActiveHelpCard(currentSection)}
                className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get help with this section</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ContextualHelpSystem;
