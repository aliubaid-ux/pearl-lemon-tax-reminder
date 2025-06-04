
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
    <div className="mb-16">
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-blue-200 dark:border-blue-700 shadow-2xl overflow-hidden relative">
        <div className="absolute top-6 right-6 z-10">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 h-10 w-10 rounded-full shadow-md bg-white/80 backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <CardHeader className="pb-8 pt-12 px-8 lg:px-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white shadow-lg">
              <Heart className="h-8 w-8" />
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200 px-6 py-3 text-base font-medium">
              New to taxes? We've got you! 
            </Badge>
          </div>
          <CardTitle className="text-4xl lg:text-5xl text-gray-900 dark:text-white flex items-center gap-4 leading-tight mb-6">
            <Sparkles className="h-10 w-10 text-yellow-500 flex-shrink-0" />
            Hey {userName}! Welcome to UK Tax Doctor 👋
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-10 pb-12 px-8 lg:px-12">
          <div className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl">
            <p className="mb-8 leading-relaxed">
              🌟 <strong>Don't worry - you're in safe hands!</strong> Taxes might seem scary, but we're here to make them simple and stress-free.
            </p>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether this is your first time dealing with taxes or you just want some extra support, our AI-powered assistant will guide you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 py-6">
            <div className="flex items-center gap-5 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100 text-xl">Plain English</p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">No confusing jargon</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100 text-xl">Step-by-step</p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">Easy to follow guides</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-purple-900 dark:text-purple-100 text-xl">Always accurate</p>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">HMRC-compliant advice</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-8">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-14"
            >
              <Sparkles className="h-6 w-6 mr-4" />
              Get Started - I'll Guide You!
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('help-center')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20 px-8 py-4 text-xl font-medium h-14 hover:shadow-lg transition-all duration-300"
            >
              <Users className="h-6 w-6 mr-4" />
              Explore Help Center
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendlyWelcomeBanner;
