
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer, Search, Filter } from 'lucide-react';

const QuickFeatureTest: React.FC = () => {
  return (
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
  );
};

export default QuickFeatureTest;
