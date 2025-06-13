
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SubscriptionInfo {
  subscribed: boolean;
  subscription_tier?: string | null;
  subscription_end?: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  subscription: SubscriptionInfo;
  subscriptionLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithMicrosoft: () => Promise<{ error: any }>;
  signInWithApple: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { full_name?: string }) => Promise<{ error: any }>;
  checkSubscription: () => Promise<void>;
  createCheckout: (priceId: string) => Promise<{ url?: string; error?: string }>;
  openCustomerPortal: () => Promise<{ url?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionInfo>({ subscribed: false });
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const { toast } = useToast();

  console.log('AuthProvider rendering - loading:', loading, 'user:', !!user, 'session:', !!session);

  const checkSubscription = async () => {
    if (!session) return;
    
    setSubscriptionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      
      setSubscription({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier,
        subscription_end: data.subscription_end,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({ subscribed: false });
    } finally {
      setSubscriptionLoading(false);
    }
  };

  const createCheckout = async (priceId: string) => {
    if (!session) return { error: 'Not authenticated' };

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return { url: data.url };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Checkout failed';
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: errorMessage
      });
      return { error: errorMessage };
    }
  };

  const openCustomerPortal = async () => {
    if (!session) return { error: 'Not authenticated' };

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return { url: data.url };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Portal access failed';
      toast({
        variant: "destructive",
        title: "Portal access failed",
        description: errorMessage
      });
      return { error: errorMessage };
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state change listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, 'session:', !!session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Check subscription when user signs in
        if (event === 'SIGNED_IN' && session) {
          setTimeout(() => {
            checkSubscription();
          }, 100);
        }
        
        // Clear subscription when user signs out
        if (event === 'SIGNED_OUT') {
          setSubscription({ subscribed: false });
        }
      }
    );

    // THEN check for existing session
    console.log('AuthProvider: Checking for existing session');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', !!session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Check subscription for existing session
      if (session) {
        setTimeout(() => {
          checkSubscription();
        }, 100);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    console.log('Sign up attempt with redirect URL:', redirectUrl);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      console.error('Sign up error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message
      });
    } else {
      console.log('Sign up successful');
      toast({
        title: "Check your email",
        description: "Please check your email for a confirmation link to complete your registration."
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Sign in attempt for email:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Sign in error:', error);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message
      });
    } else {
      console.log('Sign in successful');
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      });
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    const redirectUrl = `${window.location.origin}/`;
    
    console.log('Google sign in attempt with redirect URL:', redirectUrl);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      console.error('Google sign in error:', error);
      toast({
        variant: "destructive",
        title: "Google sign in failed",
        description: error.message
      });
    }

    return { error };
  };

  const signInWithMicrosoft = async () => {
    const redirectUrl = `${window.location.origin}/`;
    
    console.log('Microsoft sign in attempt with redirect URL:', redirectUrl);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      console.error('Microsoft sign in error:', error);
      toast({
        variant: "destructive",
        title: "Microsoft sign in failed",
        description: error.message
      });
    }

    return { error };
  };

  const signInWithApple = async () => {
    const redirectUrl = `${window.location.origin}/`;
    
    console.log('Apple sign in attempt with redirect URL:', redirectUrl);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: redirectUrl
      }
    });

    if (error) {
      console.error('Apple sign in error:', error);
      toast({
        variant: "destructive",
        title: "Apple sign in failed",
        description: error.message
      });
    }

    return { error };
  };

  const signOut = async () => {
    console.log('Sign out attempt');
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    });
  };

  const updateProfile = async (data: { full_name?: string }) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: error.message
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    }

    return { error };
  };

  const value = {
    user,
    session,
    loading,
    subscription,
    subscriptionLoading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithMicrosoft,
    signInWithApple,
    signOut,
    updateProfile,
    checkSubscription,
    createCheckout,
    openCustomerPortal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
