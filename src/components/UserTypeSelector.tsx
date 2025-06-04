
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, UserCog } from 'lucide-react';

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
      description: 'Sole trader, freelancer, contractor',
      details: 'Self Assessment, Income Tax, NI contributions',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'company-director' as UserType,
      icon: Building2,
      title: 'Company Director',
      description: 'Limited company director',
      details: 'Corporation Tax, PAYE, VAT returns',
      color: 'from-green-500 to-green-600'
    },
    {
      type: 'both' as UserType,
      icon: UserCog,
      title: 'Both Profiles',
      description: 'Self-employed + Director',
      details: 'All tax obligations and deadlines',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Select Your Tax Profile
          </h3>
          <p className="text-gray-600">
            Choose your profile to see relevant deadlines and requirements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userTypes.map((option) => {
            const isSelected = userType === option.type;
            const Icon = option.icon;
            
            return (
              <Button
                key={option.type}
                variant="ghost"
                className={`h-auto p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'bg-gradient-to-br ' + option.color + ' text-white shadow-lg transform scale-105' 
                    : 'hover:shadow-md border-2 border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => onUserTypeChange(option.type)}
              >
                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                  isSelected 
                    ? 'bg-white/20 shadow-lg' 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <Icon className={`h-8 w-8 ${
                    isSelected ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className="text-center space-y-2">
                  <div className={`font-semibold text-lg ${
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
                    {option.details}
                  </div>
                </div>
                
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Button>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Note:</strong> You can change your profile at any time. 
            Selecting "Both Profiles" will show all applicable deadlines and requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTypeSelector;
