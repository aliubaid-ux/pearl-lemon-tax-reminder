
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertTriangle, Users, Calculator, FileText, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Registration {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'completed' | 'pending' | 'overdue';
  category: string;
  priority: 'high' | 'medium' | 'low';
  requirements: string[];
  estimatedTime: string;
}

const RegistrationTracker: React.FC = () => {
  const [userType, setUserType] = useState<'self-employed' | 'company-director'>('self-employed');
  const { toast } = useToast();

  const registrations: Registration[] = [
    {
      id: 'self-assessment',
      title: 'Self Assessment Registration',
      description: 'Register for Self Assessment with HMRC',
      deadline: 'By October 5th (first year)',
      status: 'pending',
      category: 'tax',
      priority: 'high',
      requirements: ['National Insurance number', 'Personal details', 'Business start date'],
      estimatedTime: '15 minutes'
    },
    {
      id: 'vat-registration',
      title: 'VAT Registration',
      description: 'Register for VAT when turnover exceeds £85,000',
      deadline: 'Within 30 days of threshold',
      status: 'pending',
      category: 'vat',
      priority: 'high',
      requirements: ['Business details', 'Turnover figures', 'Bank account details'],
      estimatedTime: '30 minutes'
    },
    {
      id: 'class2-ni',
      title: 'Class 2 National Insurance',
      description: 'Register for Class 2 NI contributions',
      deadline: 'Automatic with Self Assessment',
      status: 'completed',
      category: 'ni',
      priority: 'medium',
      requirements: ['Self Assessment registration', 'Profit figures'],
      estimatedTime: '5 minutes'
    },
    {
      id: 'corporation-tax',
      title: 'Corporation Tax Registration',
      description: 'Register your company for Corporation Tax',
      deadline: 'Within 3 months of starting business',
      status: 'pending',
      category: 'tax',
      priority: 'high',
      requirements: ['Company registration number', 'Business details', 'Accounting period'],
      estimatedTime: '20 minutes'
    },
    {
      id: 'paye-scheme',
      title: 'PAYE Scheme Registration',
      description: 'Register for PAYE when employing staff',
      deadline: 'Before first payday',
      status: 'pending',
      category: 'payroll',
      priority: 'high',
      requirements: ['Employee details', 'Salary information', 'Bank account'],
      estimatedTime: '25 minutes'
    },
    {
      id: 'cis-registration',
      title: 'CIS Registration',
      description: 'Register for Construction Industry Scheme',
      deadline: 'Before operating in construction',
      status: 'pending',
      category: 'cis',
      priority: 'medium',
      requirements: ['Business details', 'Insurance certificates', 'Bank verification'],
      estimatedTime: '45 minutes'
    }
  ];

  const getRelevantRegistrations = () => {
    if (userType === 'self-employed') {
      return registrations.filter(r => ['self-assessment', 'vat-registration', 'class2-ni', 'cis-registration'].includes(r.id));
    }
    return registrations.filter(r => ['corporation-tax', 'vat-registration', 'paye-scheme', 'cis-registration'].includes(r.id));
  };

  const relevantRegistrations = getRelevantRegistrations();
  const completedCount = relevantRegistrations.filter(r => r.status === 'completed').length;
  const completionPercentage = (completedCount / relevantRegistrations.length) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-amber-600" />;
      case 'overdue': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartRegistration = (registrationId: string) => {
    toast({
      title: "Starting Registration",
      description: "Redirecting to HMRC registration portal...",
    });
  };

  const toggleStatus = (registrationId: string) => {
    toast({
      title: "Status Updated",
      description: "Registration status has been updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Tracker</h1>
        <p className="text-gray-600">Track your HMRC registration requirements and deadlines</p>
      </div>

      {/* User Type Selector */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Button
              variant={userType === 'self-employed' ? 'default' : 'outline'}
              onClick={() => setUserType('self-employed')}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Self-Employed
            </Button>
            <Button
              variant={userType === 'company-director' ? 'default' : 'outline'}
              onClick={() => setUserType('company-director')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Company Director
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Registration Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {completedCount} of {relevantRegistrations.length} registrations completed
              </span>
              <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Registrations List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {relevantRegistrations.map((registration) => (
          <Card key={registration.id} className="h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getStatusIcon(registration.status)}
                  {registration.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(registration.status)}>
                    {registration.status}
                  </Badge>
                  <Badge className={getPriorityColor(registration.priority)}>
                    {registration.priority}
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600">{registration.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {registration.deadline}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {registration.estimatedTime}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Requirements:</h4>
                <ul className="text-sm space-y-1">
                  {registration.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                {registration.status !== 'completed' ? (
                  <Button 
                    className="flex-1"
                    onClick={() => handleStartRegistration(registration.id)}
                  >
                    Start Registration
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => toggleStatus(registration.id)}
                  >
                    Mark as Pending
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => toggleStatus(registration.id)}
                >
                  {registration.status === 'completed' ? 'Undo' : 'Mark Complete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">HMRC Helplines</h4>
              <p className="text-sm text-blue-800">Get phone support for registration queries</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Online Guidance</h4>
              <p className="text-sm text-green-800">Step-by-step guides for each registration type</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Professional Help</h4>
              <p className="text-sm text-purple-800">Consider hiring an accountant for complex cases</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationTracker;
