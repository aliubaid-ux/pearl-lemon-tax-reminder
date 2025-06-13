
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import AuthForm from './AuthForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  console.log('ProtectedRoute rendering...');
  
  const { user, loading } = useAuth();
  
  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - loading:', loading);

  if (loading) {
    console.log('ProtectedRoute showing loading spinner');
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute showing auth form');
    return <AuthForm />;
  }

  console.log('ProtectedRoute showing protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
