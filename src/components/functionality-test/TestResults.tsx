
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

export interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  message: string;
}

interface TestResultsProps {
  results: TestResult[];
}

const TestResults: React.FC<TestResultsProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Test Results:</h3>
      {results.map((result, index) => (
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
  );
};

export default TestResults;
