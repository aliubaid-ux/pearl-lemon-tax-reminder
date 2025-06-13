
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import AuthForm from './AuthForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute rendering - loading:', loading, 'user:', !!user);

  if (loading) {
    console.log('ProtectedRoute showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute showing AuthForm - no user authenticated');
    return <AuthForm />;
  }

  console.log('ProtectedRoute showing protected content - user authenticated');
  return <>{children}</>;
};

export default ProtectedRoute;
