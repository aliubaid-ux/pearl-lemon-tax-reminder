
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Crown, Calendar, CreditCard, RefreshCw, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubscriptionStatusDashboard: React.FC = () => {
  const { subscription, subscriptionLoading, checkSubscription, openCustomerPortal } = useAuth();
  const navigate = useNavigate();
  const [portalLoading, setPortalLoading] = React.useState(false);

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const result = await openCustomerPortal();
      if (result.url) {
        window.open(result.url, '_blank');
      }
    } catch (error) {
      console.error('Portal error:', error);
    } finally {
      setPortalLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTierColor = (tier?: string) => {
    switch (tier?.toLowerCase()) {
      case 'basic': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'enterprise': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-yellow-600" />
          Subscription Status
        </CardTitle>
        <CardDescription>
          Your current plan and subscription details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {subscriptionLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Checking subscription...</span>
          </div>
        ) : (
          <>
            {/* Current Plan */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <div>
                <h3 className="font-semibold text-lg">Current Plan</h3>
                <Badge className={getTierColor(subscription.subscription_tier)}>
                  {subscription.subscribed ? (subscription.subscription_tier || 'Active') : 'Free'}
                </Badge>
              </div>
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>

            {/* Plan Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Status</span>
                </div>
                <Badge variant={subscription.subscribed ? "default" : "secondary"}>
                  {subscription.subscribed ? "Active Subscription" : "Free Account"}
                </Badge>
              </div>

              {/* Renewal Date */}
              {subscription.subscribed && subscription.subscription_end && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Next Billing</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {formatDate(subscription.subscription_end)}
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Plan Features
              </h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {subscription.subscribed ? (
                  <>
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Advanced deadline management
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Priority support
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Premium calculators
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Export and sharing features
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      Basic tax deadline tracking
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      Standard support
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={checkSubscription}
                disabled={subscriptionLoading}
                className="flex-1"
              >
                {subscriptionLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span className="ml-2">Refresh Status</span>
              </Button>

              {subscription.subscribed ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                  className="flex-1"
                >
                  {portalLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Settings className="h-4 w-4" />
                  )}
                  <span className="ml-2">Manage Subscription</span>
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/subscription')}
                  className="flex-1"
                  size="sm"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatusDashboard;
