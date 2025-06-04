
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
      {/* Enhanced Profile Selection with Loading States and Micro-interactions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userTypes.map((type) => (
          <ModernCard
            key={type.id}
            variant={selectedType === type.id ? 'elevated' : 'glass'}
            className={`group relative overflow-hidden transition-all duration-300 ${
              selectedType === type.id 
                ? `bg-gradient-to-br ${type.bgGradient} border-2 border-white shadow-2xl transform scale-105` 
                : 'hover:shadow-xl hover:scale-102'
            }`}
            onClick={() => handleTypeSelection(type.id)}
          >
            {/* Animated Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} transition-opacity duration-300 ${
              selectedType === type.id ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'
            }`} />
            
            {/* Selection Indicator */}
            {selectedType === type.id && (
              <div className="absolute top-4 right-4 z-20">
                <div className={`p-2 rounded-full bg-gradient-to-r ${type.gradient} text-white shadow-lg animate-scale-in`}>
                  <Check className="h-4 w-4" />
                </div>
              </div>
            )}
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-3">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  selectedType === type.id 
                    ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg scale-110` 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:scale-105'
                }`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg transition-colors duration-200 ${
                    selectedType === type.id ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {type.title}
                  </h3>
                  <p className={`text-sm transition-colors duration-200 ${
                    selectedType === type.id ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                  }`}>
                    {type.description}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 relative z-10">
              {/* Enhanced Badge with Animation */}
              <div className="flex items-center justify-between mb-4">
                <ModernBadge 
                  variant={selectedType === type.id ? "success" : "neutral"}
                  icon={Calendar}
                  pulse={selectedType === type.id}
                  className="transition-all duration-300"
                >
                  {type.deadlineCount} deadlines
                </ModernBadge>
                {selectedType === type.id && (
                  <ModernBadge variant="info" size="sm" className="animate-fade-in">
                    Active
                  </ModernBadge>
                )}
              </div>
              
              {/* Feature List with Enhanced Styling */}
              <div className="space-y-3">
                {type.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 text-sm transition-all duration-200 ${
                      selectedType === type.id ? 'animate-fade-in' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedType === type.id 
                        ? `bg-gradient-to-r ${type.gradient} shadow-md` 
                        : 'bg-gray-400 group-hover:bg-gray-500'
                    }`} />
                    <span className={`transition-colors duration-200 ${
                      selectedType === type.id ? 'text-gray-700 font-medium' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Enhanced Action Button */}
              <AnimatedButton
                variant={selectedType === type.id ? "primary" : "glass"}
                size="sm"
                icon={selectedType === type.id ? Check : ArrowRight}
                onClick={() => handleTypeSelection(type.id)}
                className={`w-full mt-6 transition-all duration-300 ${
                  selectedType === type.id 
                    ? 'shadow-lg transform scale-105' 
                    : 'hover:shadow-md hover:transform hover:scale-102'
                }`}
              >
                {selectedType === type.id ? '✓ Active Profile' : 'Select Profile'}
              </AnimatedButton>
            </CardContent>
          </ModernCard>
        ))}
      </div>

      {/* Enhanced View Mode Toggle with Better UX */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="flex justify-center">
          <div className="flex gap-1 p-2 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl">
            {[
              { mode: 'enhanced', label: 'Enhanced View', icon: Check },
              { mode: 'visual', label: 'Visual Overview', icon: Calendar },
              { mode: 'comparison', label: 'Compare Deadlines', icon: ArrowRight }
            ].map((item) => (
              <AnimatedButton
                key={item.mode}
                variant={viewMode === item.mode ? 'primary' : 'minimal'}
                size="sm"
                icon={item.icon}
                onClick={() => setViewMode(item.mode as any)}
                className={`rounded-xl transition-all duration-300 ${
                  viewMode === item.mode 
                    ? 'shadow-lg transform scale-105' 
                    : 'hover:bg-gray-50 border-0 hover:scale-102'
                }`}
              >
                {item.label}
              </AnimatedButton>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Smart Suggestions */}
      <SmartSuggestions deadlines={currentDeadlines} userType={selectedType} />

      {/* Enhanced Seasonal Tips */}
      <SeasonalTaxTips />

      {/* Enhanced Deadline Display with Loading States */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="space-y-6">
          <ModernCard variant="glass" className="p-6 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white shadow-lg">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-xl mb-1">
                  Your {selectedType.replace('-', ' ').toUpperCase()} Tax Calendar
                </h3>
                <p className="text-gray-600 text-base">
                  Showing {currentDeadlines.length} personalized deadlines with intelligent recommendations.
                  {selectedType === 'both' && ' This includes both self-employed and company director obligations.'}
                </p>
              </div>
              <ModernBadge variant="success" size="lg" className="animate-pulse">
                Live Updates
              </ModernBadge>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <ModernBadge variant="info" icon={Calendar}>
                Enhanced view includes preparation tips and required documents
              </ModernBadge>
              <ModernBadge variant="warning">
                Smart notifications enabled
              </ModernBadge>
              <ModernBadge variant="success">
                AI-powered insights
              </ModernBadge>
            </div>
          </ModernCard>

          {/* Enhanced Content Display */}
          <div className="space-y-6">
            {viewMode === 'enhanced' && (
              <div className="space-y-4 animate-fade-in">
                {upcomingDeadlines.map((deadline, index) => (
                  <div 
                    key={deadline.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <EnhancedDeadlineCard deadline={deadline} showFullDetails />
                  </div>
                ))}
                {upcomingDeadlines.length < currentDeadlines.length && (
                  <ModernCard variant="minimal" className="text-center p-8 animate-fade-in">
                    <div className="space-y-3">
                      <p className="text-gray-600 text-lg">
                        Showing next {upcomingDeadlines.length} critical deadlines
                      </p>
                      <ModernBadge variant="neutral" size="lg">
                        Total of {currentDeadlines.length} deadlines in your complete calendar
                      </ModernBadge>
                      <p className="text-sm text-gray-500">
                        Export your complete calendar to see all deadlines for the year
                      </p>
                    </div>
                  </ModernCard>
                )}
              </div>
            )}

            {viewMode === 'visual' && (
              <div className="animate-fade-in">
                <VisualDeadlineDisplay 
                  deadlines={currentDeadlines} 
                  userType={selectedType}
                />
              </div>
            )}

            {viewMode === 'comparison' && (
              <div className="animate-fade-in">
                <DeadlineComparison deadlines={currentDeadlines} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {currentDeadlines.length === 0 && showDeadlines && (
        <ModernCard variant="minimal" className="text-center py-16 animate-fade-in">
          <div className="space-y-4">
            <div className="text-gray-400 mb-6">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-gray-600 text-xl font-semibold">No tax deadlines found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              This profile type doesn't have any active deadlines. Try selecting a different profile or check back later.
            </p>
            <AnimatedButton variant="glass" onClick={() => handleTypeSelection('self-employed')}>
              Try Self-Employed Profile
            </AnimatedButton>
          </div>
        </ModernCard>
      )}
    </div>
  );
};

export default EnhancedUserTypeSelector;
