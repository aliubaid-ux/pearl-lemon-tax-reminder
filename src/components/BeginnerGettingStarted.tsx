
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, ArrowRight, Lightbulb, AlertCircle, Star, BookOpen, Calculator, Calendar, FileText } from 'lucide-react';

interface BeginnerGettingStartedProps {
  userType: string;
  onStepComplete: (step: number) => void;
}

const BeginnerGettingStarted: React.FC<BeginnerGettingStartedProps> = ({ userType, onStepComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const saved = localStorage.getItem('uk-tax-doctor-getting-started-steps');
    return saved ? JSON.parse(saved) : [];
  });

  const steps = [
    {
      id: 1,
      title: "Understanding Your Tax Profile",
      description: "Learn what it means to be " + userType.replace('-', ' '),
      icon: BookOpen,
      content: `Great choice! As a ${userType.replace('-', ' ')}, here's what you need to know:`,
      details: userType === 'self-employed' 
        ? "Self-employed means you work for yourself and are responsible for your own taxes. You'll need to file a Self Assessment each year."
        : userType === 'company-director'
        ? "As a company director, you have additional responsibilities including corporation tax, PAYE, and personal Self Assessment."
        : "You have dual responsibilities - both self-employment obligations AND company director duties.",
      action: "I understand my status",
      color: "blue"
    },
    {
      id: 2,
      title: "Key Deadlines to Remember",
      description: "The most important dates you can't miss",
      icon: Calendar,
      content: "Don't worry - we'll remind you about these!",
      details: "Tax deadlines might seem overwhelming, but they follow a predictable pattern each year. We'll send you reminders and break down exactly what you need to do.",
      action: "Show me my deadlines",
      color: "green"
    },
    {
      id: 3,
      title: "Essential Tax Tools",
      description: "Calculators and helpers to make taxes easy",
      icon: Calculator,
      content: "We've built simple tools to help you:",
      details: "Use our penalty calculator to avoid late fees, VAT calculator for business expenses, and other tools designed specifically for beginners.",
      action: "Explore the tools",
      color: "purple"
    },
    {
      id: 4,
      title: "Building Your Tax Routine",
      description: "Create habits that make tax time stress-free",
      icon: Star,
      content: "Success tip: Little and often beats last-minute panic!",
      details: "We'll help you set up a simple routine - maybe 30 minutes once a month to review your progress and update records.",
      action: "Set up my routine",
      color: "amber"
    }
  ];

  const handleStepComplete = (stepId: number) => {
    const newCompleted = [...completedSteps, stepId];
    setCompletedSteps(newCompleted);
    localStorage.setItem('uk-tax-doctor-getting-started-steps', JSON.stringify(newCompleted));
    onStepComplete(stepId);
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <Card className="mb-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl text-emerald-900 dark:text-emerald-100 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white">
              <Lightbulb className="h-6 w-6" />
            </div>
            Your Getting Started Journey
          </CardTitle>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
            {completedSteps.length} of {steps.length} complete
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-emerald-700 dark:text-emerald-300">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-emerald-100 dark:bg-emerald-900/30" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const Icon = step.icon;
          
          return (
            <div 
              key={step.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'bg-white/80 dark:bg-gray-800/80 border-green-200 dark:border-green-700'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  isCompleted ? 'bg-green-100 dark:bg-green-900/30' : `bg-${step.color}-100 dark:bg-${step.color}-900/30`
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Icon className={`h-5 w-5 text-${step.color}-600 dark:text-${step.color}-400`} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold ${isCompleted ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'}`}>
                      Step {step.id}: {step.title}
                    </h3>
                    {isCompleted && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                        ✓ Done
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{step.description}</p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                    <p className="text-blue-900 dark:text-blue-100 font-medium mb-1">{step.content}</p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">{step.details}</p>
                  </div>
                  
                  {!isCompleted && (
                    <Button 
                      onClick={() => handleStepComplete(step.id)}
                      size="sm"
                      className={`bg-${step.color}-600 hover:bg-${step.color}-700 text-white`}
                    >
                      {step.action}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {completedSteps.length === steps.length && (
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-green-200 dark:border-green-700">
            <div className="mb-4">
              <div className="inline-flex p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white">
                <Star className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
              🎉 Congratulations! You're Ready!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              You've completed your getting started journey. You now have the knowledge and tools to manage your taxes confidently!
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
              <FileText className="h-4 w-4 mr-2" />
              View My Complete Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BeginnerGettingStarted;
