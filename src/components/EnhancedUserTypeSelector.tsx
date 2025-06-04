
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, User, Users, Check, ArrowRight, Calendar, AlertTriangle } from 'lucide-react';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import VisualDeadlineDisplay from './VisualDeadlineDisplay';
import EnhancedDeadlineCard from './EnhancedDeadlineCard';
import SeasonalTaxTips from './SeasonalTaxTips';
import DeadlineComparison from './DeadlineComparison';
import SmartSuggestions from './SmartSuggestions';
import ModernCard from './ModernCard';
import AnimatedButton from './AnimatedButton';
import ModernBadge from './ModernBadge';

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

  useEffect(() => {
    const newDeadlines = getTaxDeadlines(selectedType);
    setCurrentDeadlines(newDeadlines);
  }, [selectedType]);

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
      deadlineCount: getTaxDeadlines('self-employed').length,
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50'
    },
    {
      id: 'company-director' as UserType,
      title: 'Company Director',
      description: 'Limited company directors and shareholders',
      icon: Building2,
      features: ['Corporation Tax', 'Company House filings', 'Director responsibilities', 'Dividend tax'],
      deadlineCount: getTaxDeadlines('company-director').length,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      id: 'both' as UserType,
      title: 'Both',
      description: 'Self-employed AND company director',
      icon: Users,
      features: ['All self-employed deadlines', 'All company deadlines', 'Complete tax calendar', 'Maximum compliance'],
      deadlineCount: getTaxDeadlines('both').length,
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50'
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
    <div className="space-y-8">
      {/* Profile Selection with Modern Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userTypes.map((type) => (
          <ModernCard
            key={type.id}
            variant={selectedType === type.id ? 'elevated' : 'glass'}
            className={`cursor-pointer group relative overflow-hidden ${
              selectedType === type.id 
                ? `bg-gradient-to-br ${type.bgGradient} border-2 border-white shadow-2xl` 
                : 'hover:shadow-xl'
            }`}
            onClick={() => handleTypeSelection(type.id)}
          >
            {/* Gradient Overlay */}
            {selectedType === type.id && (
              <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-5`} />
            )}
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    selectedType === type.id 
                      ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg` 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  } transition-all duration-200`}>
                    <type.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      selectedType === type.id ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {type.title}
                    </h3>
                    <p className={`text-sm ${
                      selectedType === type.id ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      {type.description}
                    </p>
                  </div>
                </div>
                {selectedType === type.id && (
                  <div className={`p-2 rounded-full bg-gradient-to-r ${type.gradient} text-white shadow-lg`}>
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              <ModernBadge 
                variant={selectedType === type.id ? "success" : "neutral"}
                icon={Calendar}
                className="mb-3"
              >
                {type.deadlineCount} tax deadlines
              </ModernBadge>
              
              <div className="space-y-2">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      selectedType === type.id 
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500' 
                        : 'bg-gray-400'
                    }`} />
                    <span className={selectedType === type.id ? 'text-gray-700' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <AnimatedButton
                variant={selectedType === type.id ? "primary" : "glass"}
                size="sm"
                icon={selectedType === type.id ? Check : ArrowRight}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTypeSelection(type.id);
                }}
                className="w-full mt-4"
              >
                {selectedType === type.id ? 'Selected' : 'Select Profile'}
              </AnimatedButton>
            </CardContent>
          </ModernCard>
        ))}
      </div>

      {/* View Mode Toggle with Modern Design */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="flex justify-center">
          <div className="flex gap-1 p-1 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
            {[
              { mode: 'enhanced', label: 'Enhanced View' },
              { mode: 'visual', label: 'Visual Overview' },
              { mode: 'comparison', label: 'Compare Deadlines' }
            ].map((item) => (
              <AnimatedButton
                key={item.mode}
                variant={viewMode === item.mode ? 'primary' : 'minimal'}
                size="sm"
                onClick={() => setViewMode(item.mode as any)}
                className={`rounded-xl ${
                  viewMode === item.mode 
                    ? 'shadow-md' 
                    : 'hover:bg-gray-50 border-0'
                }`}
              >
                {item.label}
              </AnimatedButton>
            ))}
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      <SmartSuggestions deadlines={currentDeadlines} userType={selectedType} />

      {/* Seasonal Tips */}
      <SeasonalTaxTips />

      {/* Enhanced Deadline Display */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="space-y-6">
          <ModernCard variant="glass" className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Your {selectedType.replace('-', ' ').toUpperCase()} Tax Deadlines
                </h3>
                <p className="text-gray-600">
                  Showing {currentDeadlines.length} deadlines specific to your profile. 
                  {selectedType === 'both' && ' This includes both self-employed and company director obligations.'}
                </p>
              </div>
            </div>
            
            <ModernBadge variant="info" icon={Calendar}>
              Enhanced view includes preparation tips, required documents, and quick wins
            </ModernBadge>
          </ModernCard>

          {viewMode === 'enhanced' && (
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <EnhancedDeadlineCard key={deadline.id} deadline={deadline} showFullDetails />
              ))}
              {upcomingDeadlines.length < currentDeadlines.length && (
                <ModernCard variant="minimal" className="text-center p-6">
                  <p className="text-gray-600 mb-2">
                    Showing next {upcomingDeadlines.length} deadlines
                  </p>
                  <ModernBadge variant="neutral">
                    Total of {currentDeadlines.length} deadlines for your profile
                  </ModernBadge>
                </ModernCard>
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
        <ModernCard variant="minimal" className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-600 text-lg">No tax deadlines found for this profile type</p>
        </ModernCard>
      )}
    </div>
  );
};

export default EnhancedUserTypeSelector;
