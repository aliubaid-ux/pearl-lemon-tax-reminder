
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Calendar, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomeHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('uk-tax-doctor-welcome-dismissed');
  });
  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('uk-tax-doctor-welcome-dismissed', 'true');
  };

  const handleGetStarted = () => {
    navigate('/common-tax-issues');
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-blue-200 dark:border-blue-700">
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome to UK Tax Doctor
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Never miss a tax deadline again with our smart calendar system
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">All UK Tax Types</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Self Assessment, VAT, Corporation Tax & more</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Smart Reminders</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Personalized alerts before deadlines</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg">
              <Shield className="h-8 w-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Penalty Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Know the cost of late submissions</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/penalty-calculator')}
            >
              Try Penalty Calculator
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeHero;
