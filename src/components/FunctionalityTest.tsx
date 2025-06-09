
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import TestResults from './functionality-test/TestResults';
import QuickFeatureTest from './functionality-test/QuickFeatureTest';
import { useFunctionalityTests } from './functionality-test/useFunctionalityTests';

const FunctionalityTest: React.FC = () => {
  const { testResults, isRunning, runFunctionalityTests } = useFunctionalityTests();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Application Functionality Test
        </CardTitle>
        <p className="text-sm text-gray-600">
          Test all core features to ensure they're working properly
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runFunctionalityTests}
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? 'Running Tests...' : 'Run Functionality Tests'}
        </Button>

        <TestResults results={testResults} />
        <QuickFeatureTest />
      </CardContent>
    </Card>
  );
};

export default FunctionalityTest;
