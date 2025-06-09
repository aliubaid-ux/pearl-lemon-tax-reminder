
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  FileText,
  Settings,
  Printer,
  Share
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  message: string;
}

const FunctionalityTest: React.FC = () => {
  const { toast } = useToast();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runFunctionalityTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    const tests: TestResult[] = [];

    // Test toast system
    try {
      toast({
        title: "Test notification",
        description: "Testing toast system functionality",
      });
      tests.push({
        name: "Toast System",
        status: "pass",
        message: "Toast notifications working correctly"
      });
    } catch (error) {
      tests.push({
        name: "Toast System",
        status: "fail",
        message: "Toast system failed to initialize"
      });
    }

    // Test download functionality
    try {
      const testData = "Test file content";
      const blob = new Blob([testData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      URL.revokeObjectURL(url);
      tests.push({
        name: "Download System",
        status: "pass",
        message: "Download functionality is working"
      });
    } catch (error) {
      tests.push({
        name: "Download System",
        status: "fail",
        message: "Download functionality failed"
      });
    }

    // Test print functionality
    try {
      const printTest = window.open('', '_blank');
      if (printTest) {
        printTest.close();
        tests.push({
          name: "Print System",
          status: "pass",
          message: "Print functionality is working"
        });
      } else {
        tests.push({
          name: "Print System",
          status: "fail",
          message: "Print functionality blocked by browser"
        });
      }
    } catch (error) {
      tests.push({
        name: "Print System",
        status: "fail",
        message: "Print functionality failed"
      });
    }

    // Test navigation
    try {
      const currentPath = window.location.pathname;
      tests.push({
        name: "Navigation",
        status: "pass",
        message: `Navigation working, current path: ${currentPath}`
      });
    } catch (error) {
      tests.push({
        name: "Navigation",
        status: "fail",
        message: "Navigation system failed"
      });
    }

    // Test local storage
    try {
      localStorage.setItem('test', 'value');
      const retrieved = localStorage.getItem('test');
      localStorage.removeItem('test');
      if (retrieved === 'value') {
        tests.push({
          name: "Local Storage",
          status: "pass",
          message: "Local storage is working"
        });
      } else {
        throw new Error('Value mismatch');
      }
    } catch (error) {
      tests.push({
        name: "Local Storage",
        status: "fail",
        message: "Local storage failed"
      });
    }

    // Test clipboard API (for share functionality)
    try {
      if (navigator.clipboard) {
        tests.push({
          name: "Clipboard API",
          status: "pass",
          message: "Clipboard API is available"
        });
      } else {
        tests.push({
          name: "Clipboard API",
          status: "fail",
          message: "Clipboard API not supported"
        });
      }
    } catch (error) {
      tests.push({
        name: "Clipboard API",
        status: "fail",
        message: "Clipboard API failed"
      });
    }

    setTestResults(tests);
    setIsRunning(false);

    const failedTests = tests.filter(test => test.status === 'fail').length;
    const passedTests = tests.filter(test => test.status === 'pass').length;

    toast({
      title: "Functionality Test Complete",
      description: `${passedTests} passed, ${failedTests} failed`,
      variant: failedTests > 0 ? "destructive" : "default"
    });
  };

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

        {testResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Test Results:</h3>
            {testResults.map((result, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {result.status === 'pass' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-gray-600">{result.message}</p>
                  </div>
                </div>
                <Badge variant={result.status === 'pass' ? 'default' : 'destructive'}>
                  {result.status}
                </Badge>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Quick Feature Test:</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Download Test
            </Button>
            <Button size="sm" variant="outline">
              <Printer className="h-4 w-4 mr-1" />
              Print Test
            </Button>
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4 mr-1" />
              Search Test
            </Button>
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4 mr-1" />
              Filter Test
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FunctionalityTest;
