
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
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
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
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700">
      <CardContent className="p-8 relative">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome to UK Tax Doctor
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Smart deadline management for UK taxes
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <EnhancedUserTypeSelector
                userType={userType}
                onUserTypeChange={onUserTypeChange}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                ✨ AI-powered reminders
              </Badge>
              <Badge variant="secondary" className="text-sm">
                📊 Penalty calculator
              </Badge>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Get Started
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/penalty-calculator')}
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
