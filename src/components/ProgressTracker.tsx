
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, AlertTriangle, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Deadline {
  id: string;
  title: string;
  date: string;
  category: string;
  priority: string;
}

interface ProgressTrackerProps {
  deadlines: Deadline[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ deadlines }) => {
  const [completedDeadlines, setCompletedDeadlines] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('completed-deadlines') || '[]'))
  );
  const { toast } = useToast();

  const toggleDeadlineCompletion = (deadlineId: string, title: string) => {
    const newCompleted = new Set(completedDeadlines);
    
    if (newCompleted.has(deadlineId)) {
      newCompleted.delete(deadlineId);
      toast({
        title: "Deadline unmarked",
        description: `${title} marked as incomplete`,
      });
    } else {
      newCompleted.add(deadlineId);
      toast({
        title: "Deadline completed! 🎉",
        description: `${title} marked as complete`,
      });
    }
    
    setCompletedDeadlines(newCompleted);
    localStorage.setItem('completed-deadlines', JSON.stringify(Array.from(newCompleted)));
  };

  const upcomingDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    return deadlineDate >= today;
  }).slice(0, 10);

  const completedCount = upcomingDeadlines.filter(d => completedDeadlines.has(d.id)).length;
  const totalCount = upcomingDeadlines.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const urgentDeadlines = upcomingDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const daysDiff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 14 && !completedDeadlines.has(deadline.id);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Deadline Progress Tracker
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Upcoming Deadlines Complete</span>
            <span className="font-medium">{completedCount}/{totalCount}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {urgentDeadlines.length > 0 && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-900">Urgent Deadlines</span>
              <Badge variant="destructive">{urgentDeadlines.length}</Badge>
            </div>
            <div className="space-y-2">
              {urgentDeadlines.slice(0, 3).map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-900">{deadline.title}</p>
                    <p className="text-xs text-red-700">
                      {new Date(deadline.date).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDeadlineCompletion(deadline.id, deadline.title)}
                    className="border-red-300 hover:bg-red-50"
                  >
                    <Circle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Next 10 Deadlines</h4>
          {upcomingDeadlines.map((deadline) => {
            const isCompleted = completedDeadlines.has(deadline.id);
            const deadlineDate = new Date(deadline.date);
            const today = new Date();
            const daysDiff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div 
                key={deadline.id}
                className={`flex items-center justify-between p-2 rounded border ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isCompleted ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                    {deadline.title}
                  </p>
                  <p className={`text-xs ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                    {deadlineDate.toLocaleDateString('en-GB')} • {daysDiff} days
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleDeadlineCompletion(deadline.id, deadline.title)}
                  className={isCompleted ? 'text-green-600' : 'text-gray-400'}
                >
                  {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
