
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpAndSupport: React.FC = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      title: 'Late Submission Templates',
      onClick: () => navigate('/penalty-calculator')
    },
    {
      title: 'HMRC Guidance',
      onClick: () => navigate('/hmrc-support-guide')
    },
    {
      title: 'HMRC Support Contact',
      onClick: () => navigate('/hmrc-support-guide')
    },
    {
      title: 'Documentation Checklist',
      onClick: () => navigate('/common-tax-issues')
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-4 w-4" />
          Need Help?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {supportOptions.map((option) => (
          <Button 
            key={option.title}
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={option.onClick}
          >
            {option.title}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default HelpAndSupport;
