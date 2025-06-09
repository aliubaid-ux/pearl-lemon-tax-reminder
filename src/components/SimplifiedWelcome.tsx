
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, ArrowRight } from 'lucide-react';
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
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <EnhancedUserTypeSelector
              userType={userType}
              onUserTypeChange={onUserTypeChange}
            />
            <Button 
              onClick={() => navigate('/common-tax-issues')}
              variant="outline"
              size="sm"
            >
              Need Help?
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-700">
      <CardContent className="p-6 relative">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Welcome to UK Tax Doctor
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Smart deadline management for UK taxes
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <EnhancedUserTypeSelector
                userType={userType}
                onUserTypeChange={onUserTypeChange}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                ✨ AI reminders
              </Badge>
              <Badge variant="secondary" className="text-xs">
                📊 Calculators
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
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
      </CardContent>
    </Card>
  );
};

export default SimplifiedWelcome;
