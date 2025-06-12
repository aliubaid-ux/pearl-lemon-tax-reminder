
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { ThemeProvider } from '@/components/ThemeProvider';
import ErrorBoundary from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ImprovedIndex from '@/pages/ImprovedIndex';
import PenaltyCalculatorPage from '@/pages/PenaltyCalculatorPage';
import VATCalculatorPage from '@/pages/VATCalculatorPage';
import EmploymentStatusPage from '@/pages/EmploymentStatusPage';
import TradingAllowancePage from '@/pages/TradingAllowancePage';
import CommonTaxIssues from '@/pages/CommonTaxIssues';
import SettingsPage from '@/pages/SettingsPage';
import NotFound from '@/pages/NotFound';
import HMRCSupportGuidePage from '@/pages/HMRCSupportGuide';
import CommonMistakesPage from '@/pages/CommonMistakes';
import RegistrationTrackerPage from '@/pages/RegistrationTracker';
import PaymentsOnAccountGuidePage from '@/pages/PaymentsOnAccountGuide';
import AuthPage from '@/pages/AuthPage';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  // Set document title for the new branding
  React.useEffect(() => {
    document.title = 'UK Tax Doctor - AI-Powered Tax Deadline Management';
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Routes>
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <ImprovedIndex />
                    </ProtectedRoute>
                  } />
                  <Route path="/penalty-calculator" element={
                    <ProtectedRoute>
                      <PenaltyCalculatorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/vat-calculator" element={
                    <ProtectedRoute>
                      <VATCalculatorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/employment-status" element={
                    <ProtectedRoute>
                      <EmploymentStatusPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/trading-allowance" element={
                    <ProtectedRoute>
                      <TradingAllowancePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/common-tax-issues" element={
                    <ProtectedRoute>
                      <CommonTaxIssues />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/hmrc-support-guide" element={
                    <ProtectedRoute>
                      <HMRCSupportGuidePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/common-mistakes" element={
                    <ProtectedRoute>
                      <CommonMistakesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/registration-tracker" element={
                    <ProtectedRoute>
                      <RegistrationTrackerPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/payments-on-account" element={
                    <ProtectedRoute>
                      <PaymentsOnAccountGuidePage />
                    </ProtectedRoute>
                  } />
                  {/* Legacy route redirects - these now work */}
                  <Route path="/hmrc-guidance" element={
                    <ProtectedRoute>
                      <HMRCSupportGuidePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/late-submission-templates" element={
                    <ProtectedRoute>
                      <PenaltyCalculatorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/documentation-checklist" element={
                    <ProtectedRoute>
                      <CommonTaxIssues />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
