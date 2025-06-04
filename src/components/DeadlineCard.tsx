
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Clock, Info, ExternalLink } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TaxDeadline } from '@/types/tax';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DeadlineCardProps {
  deadline: TaxDeadline;
}

const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline }) => {
  const { toast } = useToast();
  const deadlineDate = new Date(deadline.date);
  const today = new Date();
  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const getUrgencyColor = (days: number) => {
    if (days <= 0) return 'bg-red-600';
    if (days <= 7) return 'bg-red-500';
    if (days <= 30) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getUrgencyText = (days: number) => {
    if (days <= 0) return 'Overdue';
    if (days <= 7) return 'Urgent';
    if (days <= 30) return 'Soon';
    return 'Upcoming';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-amber-500 bg-amber-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const handleViewDetails = () => {
    toast({
      title: "More Information",
      description: "Detailed guidance coming soon. Visit HMRC website for official information.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Collapsible>
      <Card className={cn("border-l-4 transition-all duration-200 hover:shadow-md", getPriorityColor(deadline.priority))}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{deadline.title}</h4>
              <Badge 
                className={cn(getUrgencyColor(daysUntil), "text-white text-xs")}
              >
                {getUrgencyText(daysUntil)}
              </Badge>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant="outline" className="text-xs">
                {deadline.category.replace('-', ' ').toUpperCase()}
              </Badge>
              {deadline.priority === 'high' && (
                <Badge variant="destructive" className="text-xs">
                  High Priority
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{formatDate(deadline.date)}</span>
            </div>
            
            {daysUntil > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>
                  {daysUntil} day{daysUntil !== 1 ? 's' : ''} remaining
                </span>
              </div>
            )}
            
            <p className="text-xs leading-relaxed">{deadline.description}</p>
            
            {deadline.preparationStart && (
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-1 text-blue-700 mb-1">
                  <Info className="h-3 w-3" />
                  <span className="text-xs font-medium">Preparation Period</span>
                </div>
                <p className="text-xs text-blue-600">
                  Started: {formatDate(deadline.preparationStart)}
                </p>
              </div>
            )}
          </div>
          
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mt-3 hover:bg-gray-100">
              <span className="text-xs">View Details</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-3 space-y-3">
            {deadline.latePenalty && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-1 text-red-700 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Late Penalties</span>
                </div>
                <p className="text-xs text-red-600 leading-relaxed">{deadline.latePenalty}</p>
              </div>
            )}
            
            {deadline.preparationTips && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-1 text-blue-700 mb-2">
                  <Info className="h-4 w-4" />
                  <span className="text-sm font-medium">Preparation Tips</span>
                </div>
                <p className="text-xs text-blue-600 leading-relaxed">{deadline.preparationTips}</p>
              </div>
            )}

            {deadline.lateSubmissionGuidance && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-1 text-amber-700 mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Late Submission Guidance</span>
                </div>
                <p className="text-xs text-amber-600 leading-relaxed">{deadline.lateSubmissionGuidance}</p>
              </div>
            )}
            
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1" onClick={handleViewDetails}>
                <ExternalLink className="h-3 w-3 mr-1" />
                HMRC Guide
              </Button>
              <Button size="sm" className="flex-1">
                Set Reminder
              </Button>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Card>
    </Collapsible>
  );
};

export default DeadlineCard;
