
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
    <div className="mb-16">
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-700 shadow-2xl">
        <CardHeader className="pb-8 pt-10 px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
            <CardTitle className="text-3xl lg:text-4xl text-emerald-900 dark:text-emerald-100 flex items-center gap-5">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white shadow-lg">
                <Lightbulb className="h-8 w-8" />
              </div>
              Your Getting Started Journey
            </CardTitle>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 px-6 py-3 text-lg font-medium">
              {completedSteps.length} of {steps.length} complete
            </Badge>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between text-xl text-emerald-700 dark:text-emerald-300 font-medium">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-4 bg-emerald-100 dark:bg-emerald-900/30" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-10 pb-12 px-8 lg:px-12">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const Icon = step.icon;
            
            return (
              <div 
                key={step.id}
                className={`p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
                  isCompleted 
                    ? 'bg-white/90 dark:bg-gray-800/90 border-green-200 dark:border-green-700 shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-600 hover:scale-102'
                }`}
              >
                <div className="flex items-start gap-8">
                  <div className={`p-5 rounded-xl shadow-md flex-shrink-0 ${
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30' : `bg-${step.color}-100 dark:bg-${step.color}-900/30`
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    ) : (
                      <Icon className={`h-8 w-8 text-${step.color}-600 dark:text-${step.color}-400`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                      <h3 className={`text-2xl font-bold ${isCompleted ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'}`}>
                        Step {step.id}: {step.title}
                      </h3>
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 px-4 py-2 text-base w-fit">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">{step.description}</p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-6 border border-blue-100 dark:border-blue-800">
                      <p className="text-blue-900 dark:text-blue-100 font-semibold mb-3 text-lg">{step.content}</p>
                      <p className="text-blue-700 dark:text-blue-300 leading-relaxed">{step.details}</p>
                    </div>
                    
                    {!isCompleted && (
                      <Button 
                        onClick={() => handleStepComplete(step.id)}
                        size="lg"
                        className={`bg-gradient-to-r from-${step.color}-600 to-${step.color}-700 hover:from-${step.color}-700 hover:to-${step.color}-800 text-white px-8 py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg h-14`}
                      >
                        {step.action}
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {completedSteps.length === steps.length && (
            <div className="text-center p-10 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-200 dark:border-green-700 shadow-xl">
              <div className="mb-8">
                <div className="inline-flex p-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white shadow-xl">
                  <Star className="h-10 w-10" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-green-900 dark:text-green-100 mb-6">
                🎉 Congratulations! You're Ready!
              </h3>
              <p className="text-green-700 dark:text-green-300 mb-8 text-xl leading-relaxed max-w-3xl mx-auto">
                You've completed your getting started journey. You now have the knowledge and tools to manage your taxes confidently!
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-5 text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-16"
              >
                <FileText className="h-6 w-6 mr-4" />
                View My Complete Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BeginnerGettingStarted;
