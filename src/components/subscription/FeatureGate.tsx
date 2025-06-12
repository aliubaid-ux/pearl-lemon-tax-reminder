
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Crown, Lock, Zap, Star } from 'lucide-react';

interface FeatureGateProps {
  feature: string;
  requiredTier?: 'Basic' | 'Premium' | 'Enterprise';
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgrade?: boolean;
}

const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  requiredTier = 'Basic', 
  children, 
  fallback,
  showUpgrade = true
}) => {
  const { subscription, subscriptionLoading } = useAuth();
  const navigate = useNavigate();

  const tierLevels = {
    'Basic': 1,
    'Premium': 2,
    'Enterprise': 3
  };

  const tierIcons = {
    'Basic': Crown,
    'Premium': Zap,
    'Enterprise': Star
  };

  const tierColors = {
    'Basic': 'text-yellow-600',
    'Premium': 'text-purple-600',
    'Enterprise': 'text-blue-600'
  };

  const userTierLevel = subscription.subscription_tier 
    ? tierLevels[subscription.subscription_tier as keyof typeof tierLevels] || 0
    : 0;
  
  const requiredTierLevel = tierLevels[requiredTier];
  const hasAccess = subscription.subscribed && userTierLevel >= requiredTierLevel;

  // Show loading state
  if (subscriptionLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-gray-500">Checking subscription...</div>
      </div>
    );
  }

  // User has access - show the feature
  if (hasAccess) {
    return <>{children}</>;
  }

  // Custom fallback provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Don't show upgrade prompt if disabled
  if (!showUpgrade) {
    return null;
  }

  const TierIcon = tierIcons[requiredTier];
  const tierColor = tierColors[requiredTier];

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full">
            <TierIcon className={`h-8 w-8 ${tierColor}`} />
          </div>
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <Lock className="h-5 w-5" />
          {requiredTier} Feature
        </CardTitle>
        <CardDescription className="text-center">
          <strong>{feature}</strong> requires a {requiredTier} subscription or higher
        </CardDescription>
        {subscription.subscribed && (
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
            Your current plan: {subscription.subscription_tier || 'Basic'}
          </p>
        )}
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Upgrade to unlock this feature and many more premium capabilities.
        </div>
        <Button 
          onClick={() => navigate('/subscription')}
          className="w-full"
          size="lg"
        >
          <TierIcon className="h-4 w-4 mr-2" />
          {subscription.subscribed ? `Upgrade to ${requiredTier}` : `Get ${requiredTier} Plan`}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureGate;
