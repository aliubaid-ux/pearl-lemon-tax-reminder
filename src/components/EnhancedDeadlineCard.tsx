
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { 
  Calendar, AlertTriangle, Clock, Info, ExternalLink, CheckCircle2,
  FileText, BookOpen, DollarSign, Users, Timer, Link as LinkIcon,
  Lightbulb, Star, ArrowRight, HelpCircle
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TaxDeadline } from '@/types/tax';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getDeadlineProgress, setDeadlineProgress } from '@/utils/storage';
import DeadlineDetailsModal from '@/components/DeadlineDetailsModal';

interface EnhancedDeadlineCardProps {
  deadline: TaxDeadline;
  showFullDetails?: boolean;
}

const EnhancedDeadlineCard: React.FC<EnhancedDeadlineCardProps> = ({ 
  deadline, 
  showFullDetails = false 
}) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(getDeadlineProgress(deadline.id));
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
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

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
    setDeadlineProgress(deadline.id, newProgress);
    toast({
      title: "Progress Updated",
      description: `${deadline.title} is now ${newProgress}% complete`,
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

  const openHMRCLink = () => {
    if (deadline.hmrcLink) {
      window.open(deadline.hmrcLink, '_blank');
    } else {
      window.open('https://www.gov.uk/government/organisations/hm-revenue-customs/services-information', '_blank');
    }
  };

  return (
    <TooltipProvider>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <Card className={cn("border-l-4 transition-all duration-200 hover:shadow-md", getPriorityColor(deadline.priority))}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{deadline.title}</h4>
                  {deadline.estimatedTime && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="text-xs">
                          <Timer className="h-3 w-3 mr-1" />
                          {deadline.estimatedTime}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Estimated time to complete</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge 
                    className={cn(getUrgencyColor(daysUntil), "text-white text-xs")}
                  >
                    {getUrgencyText(daysUntil)}
                  </Badge>
                  {progress === 100 && (
                    <Badge variant="default" className="bg-green-600 text-white text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  )}
                  {deadline.quickWins && deadline.quickWins.length > 0 && (
                    <Badge variant="outline" className="text-xs bg-yellow-50 border-yellow-200">
                      <Star className="h-3 w-3 mr-1" />
                      Quick Wins
                    </Badge>
                  )}
                </div>
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
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Progress</span>
                <span className="text-xs font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex gap-1 mt-1">
                {[25, 50, 75, 100].map((value) => (
                  <Button
                    key={value}
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => handleProgressUpdate(value)}
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">{formatDate(deadline.date)}</span>
                {daysUntil > 0 && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span>{daysUntil} day{daysUntil !== 1 ? 's' : ''} remaining</span>
                  </>
                )}
              </div>
              
              <p className="text-xs leading-relaxed">{deadline.description}</p>
              
              {/* Quick Wins Section */}
              {deadline.quickWins && deadline.quickWins.length > 0 && (
                <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-1 text-yellow-700 mb-1">
                    <Star className="h-3 w-3" />
                    <span className="text-xs font-medium">Quick Wins</span>
                  </div>
                  <ul className="text-xs text-yellow-600 space-y-1">
                    {deadline.quickWins.slice(0, 2).map((win, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="w-1 h-1 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        {win}
                      </li>
                    ))}
                  </ul>
                  {deadline.quickWins.length > 2 && (
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-yellow-700">
                        +{deadline.quickWins.length - 2} more tips
                      </Button>
                    </CollapsibleTrigger>
                  )}
                </div>
              )}

              {/* Preparation Period */}
              {deadline.preparationStart && (
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-1 text-blue-700 mb-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs font-medium">Preparation Period</span>
                  </div>
                  <p className="text-xs text-blue-600">
                    Started: {formatDate(deadline.preparationStart)}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setIsDetailsOpen(true)}
              >
                <Info className="h-3 w-3 mr-1" />
                Full Details
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={openHMRCLink}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                HMRC
              </Button>
              
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  More
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-3 space-y-3">
              {/* Required Documents */}
              {deadline.requiredDocuments && deadline.requiredDocuments.length > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-1 text-gray-700 mb-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Required Documents</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {deadline.requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dependencies */}
              {deadline.dependencies && deadline.dependencies.length > 0 && (
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-1 text-purple-700 mb-2">
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Dependencies</span>
                  </div>
                  <ul className="text-xs text-purple-600 space-y-1">
                    {deadline.dependencies.map((dep, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3" />
                        Complete: {dep}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Deadlines */}
              {deadline.relatedDeadlines && deadline.relatedDeadlines.length > 0 && (
                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center gap-1 text-indigo-700 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Related Deadlines</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {deadline.relatedDeadlines.map((related, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {related}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* All Quick Wins */}
              {deadline.quickWins && deadline.quickWins.length > 2 && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-1 text-yellow-700 mb-2">
                    <Star className="h-4 w-4" />
                    <span className="text-sm font-medium">All Quick Wins</span>
                  </div>
                  <ul className="text-xs text-yellow-600 space-y-1">
                    {deadline.quickWins.slice(2).map((win, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="w-1 h-1 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        {win}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preparation Tips */}
              {deadline.preparationTips && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-1 text-blue-700 mb-2">
                    <Lightbulb className="h-4 w-4" />
                    <span className="text-sm font-medium">Preparation Tips</span>
                  </div>
                  <p className="text-xs text-blue-600 leading-relaxed">{deadline.preparationTips}</p>
                </div>
              )}

              {/* Late Penalties */}
              {deadline.latePenalty && (
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-1 text-red-700 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Late Penalties</span>
                  </div>
                  <p className="text-xs text-red-600 leading-relaxed">{deadline.latePenalty}</p>
                </div>
              )}

              {/* Late Submission Guidance */}
              {deadline.lateSubmissionGuidance && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-1 text-amber-700 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Late Submission Guidance</span>
                  </div>
                  <p className="text-xs text-amber-600 leading-relaxed">{deadline.lateSubmissionGuidance}</p>
                </div>
              )}
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>

      <DeadlineDetailsModal
        deadline={deadline}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </TooltipProvider>
  );
};

export default EnhancedDeadlineCard;
