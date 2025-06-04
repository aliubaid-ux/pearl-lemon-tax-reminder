
import React, { Component, ErrorInfo, ReactNode } from 'react';
import ModernCard from './ModernCard';
import AnimatedButton from './AnimatedButton';
import ModernBadge from './ModernBadge';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
          <ModernCard variant="elevated" className="max-w-md w-full">
            <div className="p-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl text-white">
                  <AlertTriangle className="h-8 w-8" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  Something went wrong
                </h2>
                <p className="text-gray-600">
                  We apologize for the inconvenience. An unexpected error occurred.
                </p>
                <ModernBadge variant="error" className="mx-auto">
                  Error detected
                </ModernBadge>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-4 bg-red-50 rounded-lg text-left">
                  <p className="text-xs text-red-600 font-mono break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <AnimatedButton
                  variant="primary"
                  icon={RefreshCw}
                  onClick={this.handleReset}
                  className="w-full"
                >
                  Try Again
                </AnimatedButton>
                
                <div className="flex gap-2">
                  <AnimatedButton
                    variant="glass"
                    icon={RefreshCw}
                    onClick={this.handleReload}
                    className="flex-1"
                  >
                    Reload Page
                  </AnimatedButton>
                  
                  <AnimatedButton
                    variant="glass"
                    icon={Home}
                    onClick={this.handleGoHome}
                    className="flex-1"
                  >
                    Go Home
                  </AnimatedButton>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                If this problem persists, please contact support.
              </p>
            </div>
          </ModernCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
