
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, Mail, MessageCircle, Clock, AlertTriangle, FileText, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HMRCSupportGuide: React.FC = () => {
  const { toast } = useToast();

  const handleExternalLink = (url: string, title: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toast({
      title: "Opening External Link",
      description: `Redirecting to ${title}...`,
    });
  };

  const contactMethods = [
    {
      title: "Self Assessment Helpline",
      phone: "0300 200 3310",
      hours: "8am to 8pm, Monday to Friday",
      description: "For help with Self Assessment queries and returns",
      icon: Phone
    },
    {
      title: "Corporation Tax Helpline",
      phone: "0300 200 3410",
      hours: "8am to 8pm, Monday to Friday",
      description: "For limited company tax queries",
      icon: Phone
    },
    {
      title: "VAT Helpline",
      phone: "0300 200 3700",
      hours: "8am to 6pm, Monday to Friday",
      description: "For VAT registration and return queries",
      icon: Phone
    },
    {
      title: "Webchat Service",
      phone: "Available online",
      hours: "8am to 6pm, Monday to Friday",
      description: "Live chat support for general tax queries",
      icon: MessageCircle
    }
  ];

  const onlineServices = [
    {
      title: "HMRC Personal Tax Account",
      description: "Manage your personal tax affairs online",
      url: "https://www.gov.uk/personal-tax-account"
    },
    {
      title: "HMRC Business Tax Account",
      description: "Manage your business tax affairs online",
      url: "https://www.gov.uk/business-tax-account"
    },
    {
      title: "Self Assessment Online",
      description: "Submit your Self Assessment return",
      url: "https://www.gov.uk/log-in-file-self-assessment-tax-return"
    },
    {
      title: "VAT Online Services",
      description: "Submit VAT returns and manage your VAT account",
      url: "https://www.gov.uk/vat-online-services-vat-account"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HMRC Support Guide</h1>
        <p className="text-gray-600">Get help with your tax obligations through official HMRC channels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact HMRC
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactMethods.map((contact, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <contact.icon className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{contact.title}</h4>
                    <p className="text-blue-600 font-medium">{contact.phone}</p>
                    <p className="text-sm text-gray-600 mb-1">{contact.hours}</p>
                    <p className="text-sm text-gray-700">{contact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Online Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Online Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {onlineServices.map((service, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-auto p-4 justify-start"
                onClick={() => handleExternalLink(service.url, service.title)}
              >
                <div className="text-left">
                  <div className="font-medium text-gray-900">{service.title}</div>
                  <div className="text-sm text-gray-600">{service.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Emergency Support */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Emergency & Urgent Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Payment Problems</h4>
                <p className="text-sm text-red-800 mb-3">If you can't pay your tax bill on time</p>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleExternalLink('https://www.gov.uk/difficulties-paying-hmrc', 'Payment Support')}
                >
                  Get Help
                </Button>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2">Late Filing</h4>
                <p className="text-sm text-amber-800 mb-3">Appeal penalties or get deadline extensions</p>
                <Button 
                  size="sm" 
                  className="bg-amber-600 hover:bg-amber-700"
                  onClick={() => handleExternalLink('https://www.gov.uk/tax-appeals', 'Appeal Process')}
                >
                  Appeal
                </Button>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Technical Issues</h4>
                <p className="text-sm text-blue-800 mb-3">Problems with HMRC online services</p>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleExternalLink('https://www.gov.uk/government/organisations/hm-revenue-customs/contact/online-services-helpdesk', 'Technical Support')}
                >
                  Report Issue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Guidance & Manuals</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleExternalLink('https://www.gov.uk/government/collections/hmrc-manuals', 'HMRC Manuals')}
                >
                  HMRC Manuals
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleExternalLink('https://www.gov.uk/topic/business-tax', 'Business Tax Guidance')}
                >
                  Business Tax Guidance
                </Button>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Professional Support</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleExternalLink('https://www.icaew.com/membership/find-a-chartered-accountant', 'Find Accountant')}
                >
                  Find a Chartered Accountant
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => handleExternalLink('https://www.gov.uk/tax-help', 'Free Tax Help')}
                >
                  Free Tax Help Schemes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HMRCSupportGuide;
