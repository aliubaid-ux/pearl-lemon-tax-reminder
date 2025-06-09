
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnhancedUserTypeSelector from '@/components/EnhancedUserTypeSelector';

type UserType = 'self-employed' | 'company-director' | 'both';

interface SimplifiedWelcomeProps {
  onGetStarted: () => void;
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const SimplifiedWelcome: React.FC<SimplifiedWelcomeProps> = ({
  onGetStarted,
  userType,
  onUserTypeChange
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('uk-tax-doctor-welcome-dismissed');
  });
  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('uk-tax-doctor-welcome-dismissed', 'true');
  };

  if (!isVisible) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <EnhancedUserTypeSelector
                userType={userType}
                onUserTypeChange={onUserTypeChange}
              />
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsVisible(true)}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <Info className="h-4 w-4" />
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
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-700 shadow-xl">
      <CardContent className="p-8 relative">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="max-w-4xl space-y-8">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white shadow-lg">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome to UK Tax Doctor
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Your intelligent companion for UK tax deadline management, compliance, and planning
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Your Profile
              </h3>
              <EnhancedUserTypeSelector
                userType={userType}
                onUserTypeChange={onUserTypeChange}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Key Features
              </h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                  ✨ AI-powered reminders
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                  📊 Tax calculators
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                  📅 Interactive calendar
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                  🎯 Personalized deadlines
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 text-lg font-medium"
              size="lg"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Get Started
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/penalty-calculator')}
              size="lg"
              className="px-6 py-3"
            >
              Try Calculator
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate('/common-tax-issues')}
              size="lg"
              className="px-6 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplifiedWelcome;
