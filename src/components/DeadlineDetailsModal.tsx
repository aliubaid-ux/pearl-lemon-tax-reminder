
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, AlertTriangle, CheckCircle2, 
  FileText, ExternalLink, Bell, Star, Link as LinkIcon,
  Calculator, BookOpen, HelpCircle
} from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import DeadlineNotes from '@/components/DeadlineNotes';
import { useToast } from '@/hooks/use-toast';
import { getDeadlineProgress, setDeadlineProgress } from '@/utils/storage';

interface DeadlineDetailsModalProps {
  deadline: TaxDeadline | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeadlineDetailsModal: React.FC<DeadlineDetailsModalProps> = ({
  deadline,
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(deadline ? getDeadlineProgress(deadline.id) : 0);

  if (!deadline) return null;

  const deadlineDate = new Date(deadline.date);
  const today = new Date();
  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
    setDeadlineProgress(deadline.id, newProgress);
    toast({
      title: "Progress Updated",
      description: `${deadline.title} is now ${newProgress}% complete`,
    });
  };

  const getUrgencyStatus = () => {
    if (daysUntil <= 0) return { text: 'Overdue', color: 'bg-red-600' };
    if (daysUntil <= 7) return { text: 'Urgent', color: 'bg-red-500' };
    if (daysUntil <= 30) return { text: 'Soon', color: 'bg-amber-500' };
    return { text: 'Upcoming', color: 'bg-green-500' };
  };

  const urgencyStatus = getUrgencyStatus();

  const dependencies = [
    'Self Assessment registration',
    'Gather financial records',
    'Complete expense calculations'
  ];

  const smartSuggestions = [
    'Start gathering receipts and invoices now',
    'Consider using accounting software for better tracking',
    'Set up monthly reminders for ongoing compliance',
    'Book an appointment with your accountant if needed'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Calendar className="h-6 w-6" />
            {deadline.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Time Remaining</span>
              </div>
              <div className={`text-2xl font-bold ${daysUntil <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                {daysUntil > 0 ? `${daysUntil} days` : 'Overdue'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Progress</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{progress}%</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Status</span>
              </div>
              <Badge className={`${urgencyStatus.color} text-white`}>
                {urgencyStatus.text}
              </Badge>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Completion Progress</h3>
              <span className="text-sm text-gray-600">{progress}% complete</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex gap-2">
              {[0, 25, 50, 75, 100].map((value) => (
                <Button
                  key={value}
                  variant={progress === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleProgressUpdate(value)}
                >
                  {value}%
                </Button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
              <TabsTrigger value="suggestions">AI Tips</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Deadline Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{deadlineDate.toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{deadline.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                          {deadline.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {deadline.preparationStart && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Preparation Period</h4>
                      <p className="text-sm text-gray-600">
                        Started: {new Date(deadline.preparationStart).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {deadline.description}
                    </p>
                  </div>

                  {deadline.preparationTips && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Preparation Tips</h4>
                      <p className="text-sm text-blue-700 leading-relaxed">
                        {deadline.preparationTips}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {deadline.latePenalty && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-900">Late Penalties</h4>
                  </div>
                  <p className="text-sm text-red-700 leading-relaxed">
                    {deadline.latePenalty}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="dependencies" className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Prerequisites</h4>
                <div className="space-y-2">
                  {dependencies.map((dep, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <LinkIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{dep}</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="suggestions" className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Smart Suggestions</h4>
                <div className="space-y-3">
                  {smartSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Star className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm text-blue-900">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <DeadlineNotes deadline={deadline} />
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">HMRC Guidance</div>
                      <div className="text-xs text-gray-600">Official government guidance</div>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center gap-3">
                    <Calculator className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Tax Calculator</div>
                      <div className="text-xs text-gray-600">Calculate amounts and penalties</div>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Help Documentation</div>
                      <div className="text-xs text-gray-600">Step-by-step guides</div>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Get Support</div>
                      <div className="text-xs text-gray-600">Contact HMRC or advisor</div>
                    </div>
                  </div>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Close
            </Button>
            <Button className="flex-1">
              <Bell className="h-4 w-4 mr-2" />
              Set Reminder
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              HMRC Portal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeadlineDetailsModal;
