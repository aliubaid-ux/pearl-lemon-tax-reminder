
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';

interface UpcomingDeadlinesProps {
  deadlines: TaxDeadline[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ deadlines }) => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  const upcomingDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    return deadlineDate >= today && deadlineDate <= thirtyDaysFromNow;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcomingDeadlines.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Urgent Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingDeadlines.slice(0, 3).map(deadline => {
          const daysUntil = Math.ceil((new Date(deadline.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          return (
            <div key={deadline.id} className="p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{deadline.title}</span>
                <Badge variant="outline" className="text-xs">
                  {daysUntil} days
                </Badge>
              </div>
              <p className="text-xs text-gray-600">{deadline.description}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlines;
