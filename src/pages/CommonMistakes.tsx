
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import StreamlinedNavigation from '@/components/StreamlinedNavigation';
import CommonMistakesAlert from '@/components/CommonMistakesAlert';

const CommonMistakesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              Common Tax Mistakes to Avoid
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Learn from others' mistakes and avoid costly penalties
            </p>
          </div>
        </div>

        <CommonMistakesAlert />
        
        {/* Prevention Tips */}
        <div className="mt-8 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-700">
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">
            💡 Prevention is Better Than Cure
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-amber-800 dark:text-amber-200">
            <div>
              <h4 className="font-semibold mb-2">Set Reminders</h4>
              <ul className="space-y-1 text-sm">
                <li>• Use calendar alerts</li>
                <li>• Set multiple notifications</li>
                <li>• Plan ahead for deadlines</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Keep Records</h4>
              <ul className="space-y-1 text-sm">
                <li>• Maintain digital copies</li>
                <li>• Organize by tax year</li>
                <li>• Back up important documents</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Get Help Early</h4>
              <ul className="space-y-1 text-sm">
                <li>• Contact HMRC when unsure</li>
                <li>• Use online resources</li>
                <li>• Consider professional advice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonMistakesPage;
