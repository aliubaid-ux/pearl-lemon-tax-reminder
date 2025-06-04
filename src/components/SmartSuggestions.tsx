
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, CheckCircle2, Clock, AlertTriangle, 
  TrendingUp, Calendar, FileText, X 
} from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SmartSuggestionsProps {
  deadlines: TaxDeadline[];
  userType: string;
}

interface Suggestion {
  id: string;
  type: 'preparation' | 'optimization' | 'warning' | 'reminder';
  title: string;
  description: string;
  actionText: string;
  deadline?: TaxDeadline;
  priority: 'high' | 'medium' | 'low';
  dismissible: boolean;
  action?: () => void;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ deadlines, userType }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = JSON.parse(localStorage.getItem('dismissed-suggestions') || '[]');
    setDismissedSuggestions(dismissed);
    generateSuggestions();
  }, [deadlines, userType]);

  const generateSuggestions = () => {
    const newSuggestions: Suggestion[] = [];
    const today = new Date();

    // Check for upcoming deadlines needing preparation
    deadlines.forEach(deadline => {
      const deadlineDate = new Date(deadline.date);
      const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntil <= 30 && daysUntil > 0) {
        newSuggestions.push({
          id: `prep-${deadline.id}`,
          type: 'preparation',
          title: `Prepare for ${deadline.title}`,
          description: `Start gathering documents and information for this deadline in ${daysUntil} days.`,
          actionText: 'View Details',
          deadline,
          priority: daysUntil <= 7 ? 'high' : 'medium',
          dismissible: true,
          action: () => {
            toast({
              title: "Deadline Details",
              description: `${deadline.title} - ${deadline.description || 'No additional details available'}`,
            });
          }
        });
      }

      if (daysUntil <= 7 && daysUntil > 0) {
        newSuggestions.push({
          id: `urgent-${deadline.id}`,
          type: 'warning',
          title: 'Urgent Action Required',
          description: `${deadline.title} is due in ${daysUntil} days. Complete this immediately to avoid penalties.`,
          actionText: 'Take Action',
          deadline,
          priority: 'high',
          dismissible: false,
          action: () => {
            window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank');
          }
        });
      }
    });

    // Add optimization suggestions based on user type
    if (userType === 'self-employed') {
      newSuggestions.push({
        id: 'quarterly-reviews',
        type: 'optimization',
        title: 'Set Up Quarterly Reviews',
        description: 'Review your finances quarterly to stay ahead of deadlines and optimize your tax position.',
        actionText: 'Learn More',
        priority: 'medium',
        dismissible: true,
        action: () => navigate('/common-tax-issues')
      });

      newSuggestions.push({
        id: 'expense-tracking',
        type: 'optimization',
        title: 'Improve Expense Tracking',
        description: 'Use accounting software to automatically track business expenses and maximize deductions.',
        actionText: 'Explore Tools',
        priority: 'low',
        dismissible: true,
        action: () => navigate('/trading-allowance')
      });
    }

    if (userType === 'company-director') {
      newSuggestions.push({
        id: 'dividend-planning',
        type: 'optimization',
        title: 'Optimize Dividend Planning',
        description: 'Plan your dividend payments to minimize tax liability while meeting Corporation Tax deadlines.',
        actionText: 'Get Guidance',
        priority: 'medium',
        dismissible: true,
        action: () => navigate('/hmrc-support-guide')
      });
    }

    // Filter out dismissed suggestions
    const filteredSuggestions = newSuggestions.filter(
      suggestion => !dismissedSuggestions.includes(suggestion.id)
    );

    setSuggestions(filteredSuggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }));
  };

  const dismissSuggestion = (suggestionId: string) => {
    const newDismissed = [...dismissedSuggestions, suggestionId];
    setDismissedSuggestions(newDismissed);
    localStorage.setItem('dismissed-suggestions', JSON.stringify(newDismissed));
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    
    toast({
      title: "Suggestion Dismissed",
      description: "You can re-enable suggestions in settings.",
    });
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'preparation': return Calendar;
      case 'optimization': return TrendingUp;
      case 'warning': return AlertTriangle;
      case 'reminder': return Clock;
      default: return Lightbulb;
    }
  };

  const getSuggestionColor = (type: string, priority: string) => {
    if (type === 'warning') return 'border-red-200 bg-red-50';
    if (priority === 'high') return 'border-amber-200 bg-amber-50';
    return 'border-blue-200 bg-blue-50';
  };

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">All caught up! No suggestions at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Smart Suggestions
          <Badge variant="secondary">{suggestions.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => {
          const Icon = getSuggestionIcon(suggestion.type);
          
          return (
            <div
              key={suggestion.id}
              className={`p-4 rounded-lg border ${getSuggestionColor(suggestion.type, suggestion.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                      <Badge
                        variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={suggestion.action}
                      >
                        {suggestion.actionText}
                      </Button>
                      {suggestion.deadline && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            toast({
                              title: "Deadline Information",
                              description: `${suggestion.deadline?.title} - Due: ${new Date(suggestion.deadline?.date).toLocaleDateString('en-GB')}`,
                            });
                          }}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Deadline
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {suggestion.dismissible && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissSuggestion(suggestion.id)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
