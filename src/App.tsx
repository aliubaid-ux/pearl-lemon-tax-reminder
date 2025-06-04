
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundary from '@/components/ErrorBoundary';
import Index from '@/pages/Index';
import PenaltyCalculatorPage from '@/pages/PenaltyCalculatorPage';
import VATCalculatorPage from '@/pages/VATCalculatorPage';
import EmploymentStatusPage from '@/pages/EmploymentStatusPage';
import TradingAllowancePage from '@/pages/TradingAllowancePage';
import CommonTaxIssues from '@/pages/CommonTaxIssues';
import SettingsPage from '@/pages/SettingsPage';
import NotFound from '@/pages/NotFound';
import HMRCSupportGuide from '@/pages/HMRCSupportGuide';
import CommonMistakes from '@/pages/CommonMistakes';
import RegistrationTracker from '@/pages/RegistrationTracker';
import PaymentsOnAccountGuide from '@/pages/PaymentsOnAccountGuide';
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
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/penalty-calculator" element={<PenaltyCalculatorPage />} />
              <Route path="/vat-calculator" element={<VATCalculatorPage />} />
              <Route path="/employment-status" element={<EmploymentStatusPage />} />
              <Route path="/trading-allowance" element={<TradingAllowancePage />} />
              <Route path="/common-tax-issues" element={<CommonTaxIssues />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/hmrc-support-guide" element={<HMRCSupportGuide />} />
              <Route path="/common-mistakes" element={<CommonMistakes />} />
              <Route path="/registration-tracker" element={<RegistrationTracker />} />
              <Route path="/payments-on-account" element={<PaymentsOnAccountGuide />} />
              {/* Legacy route redirects for components that should be pages */}
              <Route path="/late-submission-templates" element={<PenaltyCalculatorPage />} />
              <Route path="/hmrc-guidance" element={<HMRCSupportGuide />} />
              <Route path="/documentation-checklist" element={<CommonTaxIssues />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
