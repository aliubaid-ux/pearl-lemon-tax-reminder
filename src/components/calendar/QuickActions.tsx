
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Calendar, CreditCard, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Registration Deadlines',
      icon: Calendar,
      onClick: () => navigate('/registration-tracker')
    },
    {
      title: 'Trading Allowance Calculator',
      icon: Calculator,
      onClick: () => navigate('/trading-allowance')
    },
    {
      title: 'Payments on Account Guide',
      icon: CreditCard,
      onClick: () => navigate('/payments-on-account')
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <HelpCircle className="h-4 w-4" />
          Key Tax Issues
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button 
            key={action.title}
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-between"
            onClick={action.onClick}
          >
            <span>{action.title}</span>
            <action.icon className="h-3 w-3" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
