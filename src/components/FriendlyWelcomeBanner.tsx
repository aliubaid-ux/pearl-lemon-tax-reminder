
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, CheckCircle, X, BookOpen, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FriendlyWelcomeBannerProps {
  userName?: string;
  onGetStarted: () => void;
}

const FriendlyWelcomeBanner: React.FC<FriendlyWelcomeBannerProps> = ({ 
  userName = "there", 
  onGetStarted 
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('uk-tax-doctor-welcome-dismissed');
  });
  const { toast } = useToast();

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('uk-tax-doctor-welcome-dismissed', 'true');
    toast({
      title: "Welcome banner hidden",
      description: "You can always find help in our user guide!",
    });
  };

  if (!isVisible) return null;

  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-blue-200 dark:border-blue-700 shadow-lg overflow-hidden">
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white">
            <Heart className="h-5 w-5" />
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
            New to taxes? We've got you! 
          </Badge>
        </div>
        <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          Hey {userName}! Welcome to UK Tax Doctor 👋
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-lg text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            🌟 <strong>Don't worry - you're in safe hands!</strong> Taxes might seem scary, but we're here to make them simple and stress-free.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Whether this is your first time dealing with taxes or you just want some extra support, our AI-powered assistant will guide you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">Plain English</p>
              <p className="text-xs text-green-700 dark:text-green-300">No confusing jargon</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Step-by-step</p>
              <p className="text-xs text-blue-700 dark:text-blue-300">Easy to follow guides</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="font-medium text-purple-900 dark:text-purple-100">Always accurate</p>
              <p className="text-xs text-purple-700 dark:text-purple-300">HMRC-compliant advice</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Get Started - I'll Guide You!
          </Button>
          <Button 
            variant="outline"
            onClick={() => document.getElementById('help-center')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
          >
            <Users className="h-4 w-4 mr-2" />
            Explore Help Center
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendlyWelcomeBanner;
