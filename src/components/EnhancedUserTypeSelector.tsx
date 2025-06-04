
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, User, Users, Check } from 'lucide-react';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import VisualDeadlineDisplay from './VisualDeadlineDisplay';

type UserType = 'self-employed' | 'company-director' | 'both';

interface EnhancedUserTypeSelectorProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const EnhancedUserTypeSelector: React.FC<EnhancedUserTypeSelectorProps> = ({
  userType,
  onUserTypeChange
}) => {
  const [selectedType, setSelectedType] = useState<UserType>(userType);
  const [showDeadlines, setShowDeadlines] = useState(false);

  const handleTypeSelection = (type: UserType) => {
    setSelectedType(type);
    setShowDeadlines(true);
    onUserTypeChange(type);
  };

  const userTypes = [
    {
      id: 'self-employed' as UserType,
      title: 'Self-Employed',
      description: 'Freelancers, consultants, sole traders',
      icon: User,
      features: ['Self Assessment', 'Class 2 & 4 NI', 'Business expenses', 'VAT (if applicable)'],
      deadlineCount: getTaxDeadlines('self-employed').length
    },
    {
      id: 'company-director' as UserType,
      title: 'Company Director',
      description: 'Limited company directors and shareholders',
      icon: Building2,
      features: ['Corporation Tax', 'Company House filings', 'Director responsibilities', 'Dividend tax'],
      deadlineCount: getTaxDeadlines('company-director').length
    },
    {
      id: 'both' as UserType,
      title: 'Both',
      description: 'Self-employed AND company director',
      icon: Users,
      features: ['All self-employed deadlines', 'All company deadlines', 'Complete tax calendar', 'Maximum compliance'],
      deadlineCount: getTaxDeadlines('both').length
    }
  ];

  const selectedDeadlines = getTaxDeadlines(selectedType);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedType === type.id 
                ? 'ring-2 ring-green-500 bg-green-50 border-green-200' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => handleTypeSelection(type.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <type.icon className={`h-5 w-5 ${selectedType === type.id ? 'text-green-600' : 'text-gray-600'}`} />
                  <span className={selectedType === type.id ? 'text-green-900' : 'text-gray-900'}>
                    {type.title}
                  </span>
                </div>
                {selectedType === type.id && (
                  <Check className="h-5 w-5 text-green-600" />
                )}
              </CardTitle>
              <p className={`text-sm ${selectedType === type.id ? 'text-green-700' : 'text-gray-600'}`}>
                {type.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge 
                variant={selectedType === type.id ? "default" : "secondary"}
                className={selectedType === type.id ? 'bg-green-600' : ''}
              >
                {type.deadlineCount} tax deadlines
              </Badge>
              
              <ul className="space-y-1">
                {type.features.map((feature, index) => (
                  <li key={index} className={`text-xs flex items-center gap-1 ${
                    selectedType === type.id ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    <span className="w-1 h-1 bg-current rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  selectedType === type.id 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : ''
                }`}
                variant={selectedType === type.id ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTypeSelection(type.id);
                }}
              >
                {selectedType === type.id ? 'Selected' : 'Select Profile'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visual Deadline Display */}
      {showDeadlines && (
        <VisualDeadlineDisplay 
          deadlines={selectedDeadlines} 
          userType={selectedType}
        />
      )}
    </div>
  );
};

export default EnhancedUserTypeSelector;
