
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, Bell, FileText, Calculator, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuickActionsCard = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Download Started",
        description: "Your tax year guide is being downloaded.",
      });
    }, 1500);
  };

  const handleExternalLink = (url: string, title: string) => {
    toast({
      title: "Opening External Link",
      description: `Redirecting to ${title}...`,
    });
    // In a real app, you would use window.open(url, '_blank')
  };

  const handleReminders = () => {
    toast({
      title: "Email Reminders",
      description: "Feature coming soon! We'll notify you when it's available.",
    });
  };

  const quickActions = [
    {
      id: 'download-guide',
      title: 'Tax Year Guide',
      description: 'Download comprehensive PDF guide',
      icon: Download,
      action: handleDownload,
      loading: isDownloading,
      variant: 'default' as const,
    },
    {
      id: 'hmrc-website',
      title: 'HMRC Portal',
      description: 'Access official government site',
      icon: ExternalLink,
      action: () => handleExternalLink('https://www.gov.uk/government/organisations/hm-revenue-customs', 'HMRC'),
      variant: 'outline' as const,
    },
    {
      id: 'email-reminders',
      title: 'Email Alerts',
      description: 'Set up deadline notifications',
      icon: Bell,
      action: handleReminders,
      variant: 'outline' as const,
    },
    {
      id: 'tax-calculator',
      title: 'Tax Calculator',
      description: 'Estimate your tax liability',
      icon: Calculator,
      action: () => handleExternalLink('https://www.gov.uk/estimate-income-tax', 'Tax Calculator'),
      variant: 'outline' as const,
    },
    {
      id: 'forms-downloads',
      title: 'Tax Forms',
      description: 'Download official forms',
      icon: FileText,
      action: () => handleExternalLink('https://www.gov.uk/self-assessment-forms-and-helpsheets', 'Tax Forms'),
      variant: 'outline' as const,
    },
    {
      id: 'help-support',
      title: 'Get Help',
      description: 'Contact HMRC support',
      icon: HelpCircle,
      action: () => handleExternalLink('https://www.gov.uk/contact-hmrc', 'HMRC Support'),
      variant: 'outline' as const,
    },
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              className="w-full justify-start h-auto p-4 hover:scale-105 transition-all duration-200"
              onClick={action.action}
              disabled={action.loading}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`p-2 rounded-lg ${
                  action.variant === 'default' 
                    ? 'bg-white/20' 
                    : 'bg-gray-100'
                }`}>
                  <action.icon className={`h-4 w-4 ${
                    action.loading ? 'animate-spin' : ''
                  } ${
                    action.variant === 'default' 
                      ? 'text-white' 
                      : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className={`text-xs opacity-75 ${
                    action.variant === 'default' 
                      ? 'text-white' 
                      : 'text-gray-600'
                  }`}>
                    {action.loading ? 'Processing...' : action.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Need personalized advice?</p>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => handleExternalLink('https://www.gov.uk/find-a-professional-adviser', 'Find an Adviser')}
            >
              Find a Tax Adviser
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
