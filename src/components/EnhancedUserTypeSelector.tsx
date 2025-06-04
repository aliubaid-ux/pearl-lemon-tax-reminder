
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, User, Users, Check } from 'lucide-react';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import VisualDeadlineDisplay from './VisualDeadlineDisplay';
import EnhancedDeadlineCard from './EnhancedDeadlineCard';
import SeasonalTaxTips from './SeasonalTaxTips';
import DeadlineComparison from './DeadlineComparison';
import SmartSuggestions from './SmartSuggestions';

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
  const [showDeadlines, setShowDeadlines] = useState(true);
  const [currentDeadlines, setCurrentDeadlines] = useState(getTaxDeadlines(userType));
  const [viewMode, setViewMode] = useState<'enhanced' | 'visual' | 'comparison'>('enhanced');

  // Update deadlines when user type changes
  useEffect(() => {
    const newDeadlines = getTaxDeadlines(selectedType);
    setCurrentDeadlines(newDeadlines);
    console.log(`Deadlines updated for ${selectedType}:`, newDeadlines.length);
  }, [selectedType]);

  const handleTypeSelection = (type: UserType) => {
    console.log('User selected type:', type);
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

  const upcomingDeadlines = currentDeadlines
    .filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const today = new Date();
      const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 90 && daysUntil > 0;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

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

      {/* View Mode Toggle */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="flex justify-center gap-2">
          <Button
            variant={viewMode === 'enhanced' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('enhanced')}
          >
            Enhanced View
          </Button>
          <Button
            variant={viewMode === 'visual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('visual')}
          >
            Visual Overview
          </Button>
          <Button
            variant={viewMode === 'comparison' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('comparison')}
          >
            Compare Deadlines
          </Button>
        </div>
      )}

      {/* Smart Suggestions */}
      <SmartSuggestions deadlines={currentDeadlines} userType={selectedType} />

      {/* Seasonal Tips */}
      <SeasonalTaxTips />

      {/* Enhanced Deadline Display */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="mt-6">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">
              Your {selectedType.replace('-', ' ').toUpperCase()} Tax Deadlines
            </h3>
            <p className="text-sm text-blue-700">
              Showing {currentDeadlines.length} deadlines specific to your profile. 
              {selectedType === 'both' && ' This includes both self-employed and company director obligations.'}
              {' '}Enhanced view includes preparation tips, required documents, and quick wins.
            </p>
          </div>

          {viewMode === 'enhanced' && (
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <EnhancedDeadlineCard key={deadline.id} deadline={deadline} showFullDetails />
              ))}
              {upcomingDeadlines.length < currentDeadlines.length && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Showing next {upcomingDeadlines.length} deadlines. 
                    Total of {currentDeadlines.length} deadlines for your profile.
                  </p>
                </div>
              )}
            </div>
          )}

          {viewMode === 'visual' && (
            <VisualDeadlineDisplay 
              deadlines={currentDeadlines} 
              userType={selectedType}
            />
          )}

          {viewMode === 'comparison' && (
            <DeadlineComparison deadlines={currentDeadlines} />
          )}
        </div>
      )}

      {currentDeadlines.length === 0 && showDeadlines && (
        <div className="text-center py-8">
          <p className="text-gray-600">No tax deadlines found for this profile type.</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedUserTypeSelector;
