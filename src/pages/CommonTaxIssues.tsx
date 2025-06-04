
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Calculator, FileCheck, CreditCard, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import CommonMistakesAlert from '@/components/CommonMistakesAlert';
import RegistrationTracker from '@/components/RegistrationTracker';
import TradingAllowanceCalculator from '@/components/TradingAllowanceCalculator';
import HMRCSupportGuide from '@/components/HMRCSupportGuide';
import PaymentsOnAccountGuide from '@/components/PaymentsOnAccountGuide';

const CommonTaxIssues: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <StreamlinedNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Common Tax Issues & Solutions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Quick solutions to the most frequently reported HMRC challenges
            </p>
          </div>
        </div>

        <Tabs defaultValue="mistakes" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl mx-auto bg-white dark:bg-gray-800">
            <TabsTrigger value="mistakes" className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Common Mistakes</span>
              <span className="sm:hidden">Mistakes</span>
            </TabsTrigger>
            <TabsTrigger value="registration" className="flex items-center gap-2 text-sm">
              <FileCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Registration</span>
              <span className="sm:hidden">Register</span>
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2 text-sm">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Trading</span>
              <span className="sm:hidden">Trading</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
              <span className="sm:hidden">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2 text-sm">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
              <span className="sm:hidden">Help</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mistakes" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Most Common Tax Mistakes</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Based on real taxpayer experiences - avoid these costly errors
              </p>
            </div>
            <CommonMistakesAlert />
          </TabsContent>
          
          <TabsContent value="registration" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Registration Tracker</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Don't miss the October 5th deadline - track your obligations
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <RegistrationTracker />
            </div>
          </TabsContent>
          
          <TabsContent value="trading" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Trading Allowance Calculator</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Understand the £1,000 allowance and optimize your tax position
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <TradingAllowanceCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payments on Account</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Understand and plan for advance payments to avoid surprises
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <PaymentsOnAccountGuide />
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">HMRC Support Guide</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Get effective help when you need it most
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <HMRCSupportGuide />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommonTaxIssues;
