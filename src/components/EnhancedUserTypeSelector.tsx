
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
    <div className="space-y-12">
      {/* Enhanced Profile Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {userTypes.map((type) => (
          <Card
            key={type.id}
            className={`group relative overflow-hidden transition-all duration-300 cursor-pointer border-2 min-h-[400px] ${
              selectedType === type.id 
                ? `bg-gradient-to-br ${type.bgGradient} border-2 border-blue-400 shadow-2xl transform scale-105` 
                : 'hover:shadow-xl hover:scale-102 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
            onClick={() => handleTypeSelection(type.id)}
          >
            {/* Selection Indicator */}
            {selectedType === type.id && (
              <div className="absolute top-6 right-6 z-20">
                <div className={`p-3 rounded-full bg-gradient-to-r ${type.gradient} text-white shadow-xl`}>
                  <Check className="h-5 w-5" />
                </div>
              </div>
            )}
            
            <CardHeader className="pb-6 relative z-10 pt-8">
              <CardTitle className="flex items-center gap-4">
                <div className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedType === type.id 
                    ? `bg-gradient-to-r ${type.gradient} text-white shadow-lg scale-110` 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 group-hover:scale-105'
                }`}>
                  <type.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-xl transition-colors duration-200 ${
                    selectedType === type.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}>
                    {type.title}
                  </h3>
                  <p className={`text-base transition-colors duration-200 mt-1 ${
                    selectedType === type.id ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                  }`}>
                    {type.description}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6 relative z-10 px-6 pb-8">
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <Badge 
                  variant={selectedType === type.id ? "default" : "secondary"}
                  className={`transition-all duration-300 px-4 py-2 text-base ${
                    selectedType === type.id 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {type.deadlineCount} deadlines
                </Badge>
                {selectedType === type.id && (
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 px-3 py-1">
                    Active
                  </Badge>
                )}
              </div>
              
              {/* Feature List */}
              <div className="space-y-4">
                {type.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 text-base transition-all duration-200`}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                      selectedType === type.id 
                        ? `bg-gradient-to-r ${type.gradient} shadow-md` 
                        : 'bg-gray-400 group-hover:bg-gray-500'
                    }`} />
                    <span className={`transition-colors duration-200 ${
                      selectedType === type.id ? 'text-gray-700 dark:text-gray-200 font-medium' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => handleTypeSelection(type.id)}
                  className={`w-full py-4 px-6 rounded-xl transition-all duration-300 font-medium text-lg border-2 ${
                    selectedType === type.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-transparent hover:shadow-2xl transform scale-105' 
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-lg hover:scale-102'
                  }`}
                >
                  {selectedType === type.id ? (
                    <span className="flex items-center justify-center gap-3">
                      <Check className="h-5 w-5" />
                      ✓ Active Profile
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      Select Profile
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Mode Toggle */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="flex justify-center">
          <div className="flex gap-2 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-xl">
            {[
              { mode: 'enhanced', label: 'Enhanced View', icon: Check },
              { mode: 'visual', label: 'Visual Overview', icon: Calendar },
              { mode: 'comparison', label: 'Compare Deadlines', icon: ArrowRight }
            ].map((item) => (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode as any)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  viewMode === item.mode 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:scale-102'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      <SmartSuggestions deadlines={currentDeadlines} userType={selectedType} />

      {/* Seasonal Tips */}
      <SeasonalTaxTips />

      {/* Deadline Display */}
      {showDeadlines && currentDeadlines.length > 0 && (
        <div className="space-y-8">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white shadow-lg">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white text-2xl mb-2">
                  Your {selectedType.replace('-', ' ').toUpperCase()} Tax Calendar
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Showing {currentDeadlines.length} personalized deadlines with intelligent recommendations.
                  {selectedType === 'both' && ' This includes both self-employed and company director obligations.'}
                </p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 px-4 py-2 text-base">
                Live Updates
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 px-4 py-2">
                <Calendar className="h-4 w-4 mr-2" />
                Enhanced view includes preparation tips and required documents
              </Badge>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 px-4 py-2">
                Smart notifications enabled
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 px-4 py-2">
                AI-powered insights
              </Badge>
            </div>
          </Card>

          {/* Content Display */}
          <div className="space-y-8">
            {viewMode === 'enhanced' && (
              <div className="space-y-6">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={deadline.id} className="transform transition-all duration-300 hover:scale-102">
                    <EnhancedDeadlineCard deadline={deadline} showFullDetails />
                  </div>
                ))}
                {upcomingDeadlines.length < currentDeadlines.length && (
                  <Card className="text-center p-10 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 text-xl">
                        Showing next {upcomingDeadlines.length} critical deadlines
                      </p>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-6 py-3 text-lg">
                        Total of {currentDeadlines.length} deadlines in your complete calendar
                      </Badge>
                      <p className="text-gray-500 dark:text-gray-400 text-base">
                        Export your complete calendar to see all deadlines for the year
                      </p>
                    </div>
                  </Card>
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
        </div>
      )}

      {/* Empty State */}
      {currentDeadlines.length === 0 && showDeadlines && (
        <Card className="text-center py-20 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div className="text-gray-400 mb-8">
              <Calendar className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-gray-600 dark:text-gray-300 text-2xl font-semibold">No tax deadlines found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-lg">
              This profile type doesn't have any active deadlines. Try selecting a different profile or check back later.
            </p>
            <button
              onClick={() => handleTypeSelection('self-employed')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg font-medium"
            >
              Try Self-Employed Profile
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EnhancedUserTypeSelector;
