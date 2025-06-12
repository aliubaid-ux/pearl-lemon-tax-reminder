
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Crown, Check, Loader2 } from 'lucide-react';

const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$7.99',
    priceId: 'price_basic_monthly', // Replace with your actual Stripe price ID
    features: [
      'Basic tax deadline tracking',
      'Email reminders',
      'Standard support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$14.99',
    priceId: 'price_premium_monthly', // Replace with your actual Stripe price ID
    features: [
      'Advanced deadline management',
      'Priority email support',
      'Penalty calculator',
      'VAT calculator',
      'Export features'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$29.99',
    priceId: 'price_enterprise_monthly', // Replace with your actual Stripe price ID
    features: [
      'All Premium features',
      'White-label branding',
      'API access',
      'Dedicated support',
      'Custom integrations'
    ]
  }
];

const SubscriptionManager: React.FC = () => {
  const { subscription, subscriptionLoading, createCheckout, openCustomerPortal, checkSubscription } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleSubscribe = async (priceId: string, planId: string) => {
    setCheckoutLoading(planId);
    try {
      const result = await createCheckout(priceId);
      if (result.url) {
        window.open(result.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setCheckoutLoading(null);
    }
  };

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

  return (
    <div className="space-y-8">
      {/* Current Subscription Status */}
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-600" />
            Subscription Status
          </CardTitle>
          <CardDescription>
            Manage your UK Tax Doctor subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriptionLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Checking subscription status...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Current Plan: {subscription.subscribed ? (
                      <Badge variant="default" className="ml-2">
                        {subscription.subscription_tier || 'Active'}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="ml-2">Free</Badge>
                    )}
                  </p>
                  {subscription.subscribed && subscription.subscription_end && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Renews on {formatDate(subscription.subscription_end)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={checkSubscription}
                    disabled={subscriptionLoading}
                  >
                    {subscriptionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Refresh Status'}
                  </Button>
                  {subscription.subscribed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleManageSubscription}
                      disabled={portalLoading}
                    >
                      {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Manage Subscription'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRICING_PLANS.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl ${
              plan.popular ? 'ring-2 ring-green-500' : ''
            } ${
              subscription.subscription_tier?.toLowerCase() === plan.id ? 'bg-green-50 dark:bg-green-900/20 ring-2 ring-green-400' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-600 text-white">Most Popular</Badge>
              </div>
            )}
            {subscription.subscription_tier?.toLowerCase() === plan.id && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-600 text-white flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Current Plan
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-green-600">
                {plan.price}
                <span className="text-base font-normal text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full"
                variant={subscription.subscription_tier?.toLowerCase() === plan.id ? "outline" : "default"}
                disabled={subscription.subscription_tier?.toLowerCase() === plan.id || checkoutLoading === plan.id}
                onClick={() => handleSubscribe(plan.priceId, plan.id)}
              >
                {checkoutLoading === plan.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : subscription.subscription_tier?.toLowerCase() === plan.id ? (
                  'Current Plan'
                ) : (
                  `Subscribe to ${plan.name}`
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>All plans include a 14-day free trial. Cancel anytime.</p>
        <p className="mt-1">Prices are in GBP and exclude VAT where applicable.</p>
      </div>
    </div>
  );
};

export default SubscriptionManager;
