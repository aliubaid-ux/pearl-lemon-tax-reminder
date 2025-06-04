
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, UserCog, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';

type UserType = 'self-employed' | 'company-director' | 'both';

interface UserTypeSelectorProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, onUserTypeChange }) => {
  const userTypes = [
    {
      type: 'self-employed' as UserType,
      icon: Users,
      title: 'Self-Employed',
      description: 'I work for myself',
      examples: 'Freelancer, consultant, sole trader',
      color: 'from-blue-500 to-blue-600',
      popular: true,
      nextSteps: 'You\'ll see self-assessment deadlines, VAT thresholds, and Class 2/4 NI contributions.'
    },
    {
      type: 'company-director' as UserType,
      icon: Building2,
      title: 'Company Director',
      description: 'I run a limited company',
      examples: 'Limited company, contractor through company',
      color: 'from-green-500 to-green-600',
      popular: false,
      nextSteps: 'You\'ll see corporation tax, PAYE, and company filing deadlines.'
    },
    {
      type: 'both' as UserType,
      icon: UserCog,
      title: 'Both',
      description: 'I do both',
      examples: 'Self-employed + company director',
      color: 'from-purple-500 to-purple-600',
      popular: false,
      nextSteps: 'You\'ll see all deadlines for both self-employed and company director activities.'
    }
  ];

  const selectedOption = userTypes.find(option => option.type === userType);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {userTypes.map((option) => {
            const isSelected = userType === option.type;
            const Icon = option.icon;
            
            return (
              <div key={option.type} className="relative">
                {option.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Most Common
                    </span>
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  className={`h-auto p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 w-full ${
                    isSelected 
                      ? 'bg-gradient-to-br ' + option.color + ' text-white shadow-lg transform scale-105 border-2 border-transparent' 
                      : 'hover:shadow-md border-2 border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => onUserTypeChange(option.type)}
                >
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    isSelected 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isSelected ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="text-center space-y-1">
                    <div className={`font-semibold ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}>
                      {option.title}
                    </div>
                    <div className={`text-sm ${
                      isSelected ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {option.description}
                    </div>
                    <div className={`text-xs ${
                      isSelected ? 'text-white/75' : 'text-gray-500'
                    }`}>
                      {option.examples}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="flex items-center gap-1 text-white/90">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs">Selected</span>
                    </div>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
        
        {selectedOption && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 mb-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                  Perfect! You've selected: {selectedOption.title}
                </p>
                <p className="text-green-700 dark:text-green-200">
                  {selectedOption.nextSteps}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Not sure which one?</p>
              <p className="text-blue-700 dark:text-blue-200">
                Start with "Self-Employed" if you work for yourself. You can always change this later in the advanced settings.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTypeSelector;
