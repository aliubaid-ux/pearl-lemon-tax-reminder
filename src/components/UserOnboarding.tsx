
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle, Users, Calendar, Settings, 
  Bell, Download, Star, X, Play 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface UserOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: React.ReactNode;
  completable: boolean;
}

const UserOnboarding: React.FC<UserOnboardingProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [tourMode, setTourMode] = useState<'guided' | 'quick'>('guided');

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to UK Tax Calendar Pro',
      description: 'Your comprehensive tax deadline management solution',
      icon: Star,
      completable: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Pro Experience!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Get ready to master your UK tax obligations with our comprehensive deadline management platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Smart Calendar</h3>
              <p className="text-sm text-gray-600">Personalized deadline tracking</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Bell className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Smart Alerts</h3>
              <p className="text-sm text-gray-600">Never miss a deadline again</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Integration</h3>
              <p className="text-sm text-gray-600">Sync with your existing tools</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={() => setTourMode('quick')}
              className={tourMode === 'quick' ? 'bg-blue-50 border-blue-300' : ''}
            >
              <Play className="h-4 w-4 mr-2" />
              Quick Tour (2 min)
            </Button>
            <Button 
              onClick={() => setTourMode('guided')}
              className={tourMode === 'guided' ? 'bg-blue-500 text-white' : ''}
            >
              <Users className="h-4 w-4 mr-2" />
              Guided Setup (5 min)
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'profile-setup',
      title: 'Set Up Your Tax Profile',
      description: 'Tell us about your tax situation for personalized recommendations',
      icon: Users,
      completable: true,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Choose Your Profile</h2>
            <p className="text-gray-600">This helps us show you the most relevant deadlines</p>
          </div>
          
          <div className="grid gap-4">
            <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50 cursor-pointer hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Self-Employed</h3>
                  <p className="text-sm text-gray-600">Freelancer, contractor, or sole trader</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Company Director</h3>
                  <p className="text-sm text-gray-600">Director of a limited company</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Both</h3>
                  <p className="text-sm text-gray-600">Self-employed and company director</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              💡 <strong>Tip:</strong> You can change this anytime in Settings. Your calendar will automatically update to show relevant deadlines.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'calendar-overview',
      title: 'Your Smart Calendar',
      description: 'Learn how to navigate and use your personalized tax calendar',
      icon: Calendar,
      completable: true,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Calendar className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Navigate Your Calendar</h2>
            <p className="text-gray-600">Your deadlines are organized by priority and category</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-gray-900">High Priority</h3>
                <p className="text-sm text-gray-600">Critical deadlines with penalties</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Medium Priority</h3>
                <p className="text-sm text-gray-600">Important but flexible deadlines</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Low Priority</h3>
                <p className="text-sm text-gray-600">Optional or informational dates</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">🗓️ Calendar Features</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Click any deadline for detailed information</li>
              <li>• Use month navigation to plan ahead</li>
              <li>• Export to your preferred calendar app</li>
              <li>• Set custom reminders for each deadline</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Smart Notifications',
      description: 'Set up alerts so you never miss important deadlines',
      icon: Bell,
      completable: true,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Bell className="h-12 w-12 text-amber-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Never Miss a Deadline</h2>
            <p className="text-gray-600">Configure smart notifications for peace of mind</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email Reminders</h3>
                  <p className="text-sm text-gray-600">Weekly digest of upcoming deadlines</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-semibold text-gray-900">Browser Notifications</h3>
                  <p className="text-sm text-gray-600">Real-time alerts for urgent deadlines</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">⚡ Recommendation</h4>
            <p className="text-sm text-amber-800">
              Enable email reminders to stay informed without being overwhelmed. 
              You can fine-tune notification timing in Settings.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'tools-overview',
      title: 'Professional Tools',
      description: 'Discover powerful calculators and resources',
      icon: Settings,
      completable: true,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Settings className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Professional Tools</h2>
            <p className="text-gray-600">Access powerful calculators and resources</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">Penalty Calculator</h3>
              <p className="text-sm text-gray-600">Calculate costs of late submissions</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900 mb-2">VAT Threshold Monitor</h3>
              <p className="text-sm text-gray-600">Track your VAT registration needs</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Employment Status</h3>
              <p className="text-sm text-gray-600">Determine your tax classification</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">Trading Allowance</h3>
              <p className="text-sm text-gray-600">Optimize your tax allowances</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">🛠️ Pro Tip</h4>
            <p className="text-sm text-purple-800">
              All tools are easily accessible from the main navigation. 
              Use them throughout the year to stay compliant and optimize your tax position.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'completion',
      title: 'You\'re All Set!',
      description: 'Start managing your tax deadlines like a pro',
      icon: CheckCircle,
      completable: true,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              You're now ready to manage your UK tax obligations like a professional.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">🎉 What you've accomplished:</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Set up your personalized tax profile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Learned to navigate your smart calendar
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Configured smart notifications
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Discovered professional tools
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">View Dashboard</h3>
              <p className="text-sm text-gray-600">See your personalized deadlines</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <Settings className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Explore Tools</h3>
              <p className="text-sm text-gray-600">Try our professional calculators</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStepData.completable) {
        setCompletedSteps(prev => [...prev, currentStepData.id]);
      }
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <currentStepData.icon className="h-6 w-6 text-blue-600" />
              <div>
                <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                <p className="text-sm text-gray-600">{currentStepData.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {currentStep + 1} of {steps.length}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent className="p-6">
          {currentStepData.content}
        </CardContent>

        <div className="border-t p-6">
          <div className="flex justify-between">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
              <Button variant="ghost" onClick={handleSkip}>
                Skip Tour
              </Button>
            </div>
            
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserOnboarding;
