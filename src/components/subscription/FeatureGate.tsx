
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock } from 'lucide-react';

interface FeatureGateProps {
  feature: string;
  requiredTier?: 'Basic' | 'Premium' | 'Enterprise';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  requiredTier = 'Basic', 
  children, 
  fallback 
}) => {
  const { subscription } = useAuth();
  const navigate = useNavigate();

  const tierLevels = {
    'Basic': 1,
    'Premium': 2,
    'Enterprise': 3
  };

  const userTierLevel = subscription.subscription_tier 
    ? tierLevels[subscription.subscription_tier as keyof typeof tierLevels] || 0
    : 0;
  
  const requiredTierLevel = tierLevels[requiredTier];

  const hasAccess = subscription.subscribed && userTierLevel >= requiredTierLevel;

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <Crown className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <Lock className="h-5 w-5" />
          Premium Feature
        </CardTitle>
        <CardDescription>
          {feature} requires a {requiredTier} subscription or higher
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button 
          onClick={() => navigate('/subscription')}
          className="w-full"
        >
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to {requiredTier}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureGate;
