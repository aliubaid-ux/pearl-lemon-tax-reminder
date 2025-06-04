
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SharedHeader from '@/components/SharedHeader';
import CommonMistakesAlert from '@/components/CommonMistakesAlert';
import RegistrationTracker from '@/components/RegistrationTracker';
import TradingAllowanceCalculator from '@/components/TradingAllowanceCalculator';
import HMRCSupportGuide from '@/components/HMRCSupportGuide';
import PaymentsOnAccountGuide from '@/components/PaymentsOnAccountGuide';

const CommonTaxIssues: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <SharedHeader 
        title="Common Tax Issues & Solutions"
        subtitle="Tools and guidance for the most frequently reported HMRC challenges"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Calendar
          </Button>
        </div>

        <Tabs defaultValue="mistakes" className="space-y-6">
          <TabsList className="grid grid-cols-5 mb-4 w-full max-w-4xl bg-white dark:bg-gray-800">
            <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="trading">Trading Allowance</TabsTrigger>
            <TabsTrigger value="payments">Payments on Account</TabsTrigger>
            <TabsTrigger value="support">HMRC Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mistakes">
            <p className="text-gray-700 dark:text-gray-300 mb-5 max-w-4xl">
              Based on real taxpayer experiences and forum posts, these are the most common mistakes
              that lead to unexpected penalties and stress.
            </p>
            <CommonMistakesAlert />
          </TabsContent>
          
          <TabsContent value="registration">
            <p className="text-gray-700 dark:text-gray-300 mb-5 max-w-4xl">
              Many businesses miss the October 5th registration deadline because they're unaware of it.
              Use this calculator to track your registration obligations.
            </p>
            <div className="max-w-3xl">
              <RegistrationTracker />
            </div>
          </TabsContent>
          
          <TabsContent value="trading">
            <p className="text-gray-700 dark:text-gray-300 mb-5 max-w-4xl">
              There's widespread confusion about the £1,000 trading allowance. Use this calculator to determine 
              your filing obligations and optimize your allowances.
            </p>
            <div className="max-w-3xl">
              <TradingAllowanceCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="payments">
            <p className="text-gray-700 dark:text-gray-300 mb-5 max-w-4xl">
              Payments on account catch many first-time Self Assessment filers by surprise, leading to 
              unexpected financial pressure. Use this guide to understand and plan for them.
            </p>
            <div className="max-w-3xl">
              <PaymentsOnAccountGuide />
            </div>
          </TabsContent>
          
          <TabsContent value="support">
            <p className="text-gray-700 dark:text-gray-300 mb-5 max-w-4xl">
              Navigating HMRC support can be challenging with long wait times and inconsistent responses.
              Use these strategies to get effective help when you need it.
            </p>
            <div className="max-w-3xl">
              <HMRCSupportGuide />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 max-w-2xl">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Why These Tools Exist</h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            These tools were created based on real user experiences and common forum complaints. 
            They aim to address the specific pain points and challenges taxpayers face when dealing with 
            HMRC and tax obligations. If you have suggestions for additional tools or improvements, 
            please let us know.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommonTaxIssues;
