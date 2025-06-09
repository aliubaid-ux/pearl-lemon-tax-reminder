
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, ArrowRight, ChevronDown, ChevronRight, Info, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import EnhancedUserTypeSelector from '@/components/EnhancedUserTypeSelector';

type UserType = 'self-employed' | 'company-director' | 'both';

interface CollapsibleWelcomeProps {
  onGetStarted: () => void;
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const CollapsibleWelcome: React.FC<CollapsibleWelcomeProps> = ({
  onGetStarted,
  userType,
  onUserTypeChange
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('uk-tax-doctor-welcome-dismissed');
  });
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('uk-tax-doctor-welcome-dismissed', 'true');
  };

  if (!isVisible) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <EnhancedUserTypeSelector
              userType={userType}
              onUserTypeChange={onUserTypeChange}
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsVisible(true)}
                variant="ghost"
                size="sm"
              >
                <Info className="h-4 w-4 mr-2" />
                Show Welcome
              </Button>
              <Button 
                onClick={() => navigate('/common-tax-issues')}
                variant="outline"
                size="sm"
              >
                Need Help?
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Welcome to UK Tax Doctor
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-normal">
                Smart deadline management for UK taxes
              </p>
            </div>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Essential Actions - Always Visible */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Profile</h3>
            <EnhancedUserTypeSelector
              userType={userType}
              onUserTypeChange={onUserTypeChange}
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Start</h3>
            <div className="flex gap-2">
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                size="sm"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Get Started
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/penalty-calculator')}
                size="sm"
              >
                Try Calculator
              </Button>
            </div>
          </div>
        </div>

        {/* Expandable Details Section */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-sm">
              <span className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Learn More About UK Tax Doctor
              </span>
              {showDetails ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">Key Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      ✨ AI-powered reminders
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      📊 Tax calculators
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      📅 Interactive calendar
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      🎯 Personalized deadlines
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">For Your Profile</h4>
                <div className="p-3 bg-white dark:bg-gray-800 rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium capitalize">{userType.replace('-', ' ')}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {userType === 'self-employed' && 'Self Assessment, Class 2 NICs, VAT (if applicable)'}
                    {userType === 'company-director' && 'Corporation Tax, PAYE, VAT, Dividend declarations'}
                    {userType === 'both' && 'Combined deadlines for both self-employed and company director'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2">
                New to UK Tax Requirements?
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                Start with the basics and expand sections as you need more detailed information.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/common-tax-issues')}
                className="text-xs"
              >
                View Beginner Guide
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CollapsibleWelcome;
