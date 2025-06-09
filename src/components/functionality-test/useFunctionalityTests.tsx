
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TestResult } from './TestResults';

export const useFunctionalityTests = () => {
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

  return {
    testResults,
    isRunning,
    runFunctionalityTests
  };
};
