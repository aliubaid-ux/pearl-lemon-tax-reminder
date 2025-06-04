
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Clock, Info } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { cn } from '@/lib/utils';

interface DeadlineCardProps {
  deadline: TaxDeadline;
}

const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline }) => {
  const deadlineDate = new Date(deadline.date);
  const today = new Date();
  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const getUrgencyColor = (days: number) => {
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

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900">{deadline.title}</h4>
          <Badge className={cn(getUrgencyColor(daysUntil), "text-white")}>
            {getUrgencyText(daysUntil)}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{deadlineDate.toLocaleDateString('en-GB', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          
          {daysUntil > 0 && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{daysUntil} days remaining</span>
            </div>
          )}
          
          <p className="text-xs mt-2">{deadline.description}</p>
          
          {deadline.latePenalty && (
            <div className="mt-3 p-2 bg-red-50 rounded-lg">
              <div className="flex items-center gap-1 text-red-700">
                <AlertTriangle className="h-3 w-3" />
                <span className="text-xs font-medium">Late Penalty</span>
              </div>
              <p className="text-xs text-red-600 mt-1">{deadline.latePenalty}</p>
            </div>
          )}
          
          {deadline.preparationTips && (
            <div className="mt-3 p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-1 text-blue-700">
                <Info className="h-3 w-3" />
                <span className="text-xs font-medium">Preparation Tips</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">{deadline.preparationTips}</p>
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <Button size="sm" variant="outline" className="w-full">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeadlineCard;
