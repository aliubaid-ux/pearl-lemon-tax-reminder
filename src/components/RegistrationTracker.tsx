
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const RegistrationTracker: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState<'not-started' | 'checking' | 'registered'>('not-started');

  const calculateDeadlines = (startDateStr: string) => {
    if (!startDateStr) return null;
    
    const start = new Date(startDateStr);
    const taxYearEnd = new Date(start.getFullYear() + (start.getMonth() >= 3 ? 1 : 0), 3, 5); // April 5th
    const registrationDeadline = new Date(taxYearEnd.getFullYear(), 9, 5); // October 5th
    const today = new Date();
    
    const daysUntilRegistration = Math.ceil((registrationDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isOverdue = daysUntilRegistration < 0;
    
    return {
      taxYearEnd: taxYearEnd.toLocaleDateString('en-GB'),
      registrationDeadline: registrationDeadline.toLocaleDateString('en-GB'),
      daysUntilRegistration,
      isOverdue,
      urgency: isOverdue ? 'overdue' : daysUntilRegistration <= 30 ? 'urgent' : daysUntilRegistration <= 90 ? 'soon' : 'plenty-time'
    };
  };

  const deadlines = calculateDeadlines(startDate);

  const getUrgencyColor = (urgency: string | undefined) => {
    switch (urgency) {
      case 'overdue': return 'bg-red-100 text-red-800 border-red-300';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'soon': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'plenty-time': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUrgencyIcon = (urgency: string | undefined) => {
    switch (urgency) {
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'urgent': return <Clock className="h-4 w-4" />;
      case 'soon': return <Calendar className="h-4 w-4" />;
      case 'plenty-time': return <CheckCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Self-Assessment Registration Tracker
        </CardTitle>
        <p className="text-sm text-gray-600">
          Check your registration deadline and status
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-date">When did you start self-employment?</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Registration Status</Label>
            <div className="flex gap-2 mt-1">
              <Button
                variant={registrationStatus === 'not-started' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRegistrationStatus('not-started')}
              >
                Not Started
              </Button>
              <Button
                variant={registrationStatus === 'checking' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRegistrationStatus('checking')}
              >
                Checking
              </Button>
              <Button
                variant={registrationStatus === 'registered' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRegistrationStatus('registered')}
              >
                Registered
              </Button>
            </div>
          </div>
        </div>

        {deadlines && (
          <div className={`p-4 rounded-lg border-2 ${getUrgencyColor(deadlines.urgency)}`}>
            <div className="flex items-center gap-2 mb-3">
              {getUrgencyIcon(deadlines.urgency)}
              <h3 className="font-semibold">
                {deadlines.urgency === 'overdue' ? 'OVERDUE!' : 
                 deadlines.urgency === 'urgent' ? 'URGENT' :
                 deadlines.urgency === 'soon' ? 'Coming Soon' : 'On Track'}
              </h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tax Year End:</span>
                <strong>{deadlines.taxYearEnd}</strong>
              </div>
              <div className="flex justify-between">
                <span>Registration Deadline:</span>
                <strong>{deadlines.registrationDeadline}</strong>
              </div>
              <div className="flex justify-between">
                <span>Days {deadlines.isOverdue ? 'overdue' : 'remaining'}:</span>
                <strong>{Math.abs(deadlines.daysUntilRegistration)}</strong>
              </div>
            </div>
          </div>
        )}

        {registrationStatus === 'not-started' && deadlines && (
          <Alert className={deadlines.urgency === 'overdue' ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {deadlines.isOverdue ? (
                <span className="text-red-800">
                  <strong>Action Required:</strong> You're past the registration deadline. Register immediately at gov.uk to minimize penalties (£100 penalty may apply).
                </span>
              ) : (
                <span className="text-yellow-800">
                  <strong>Action Needed:</strong> You need to register for Self Assessment by {deadlines.registrationDeadline}. Don't wait!
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Key Registration Facts</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Must register by October 5th following tax year you started</li>
            <li>• Required even if you earn less than £1,000 (in some cases)</li>
            <li>• Late registration carries £100 penalty</li>
            <li>• You remain responsible even if using an accountant</li>
          </ul>
        </div>

        <Button className="w-full" asChild>
          <a href="https://www.gov.uk/register-for-self-assessment" target="_blank" rel="noopener noreferrer">
            Register for Self Assessment (gov.uk)
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistrationTracker;
