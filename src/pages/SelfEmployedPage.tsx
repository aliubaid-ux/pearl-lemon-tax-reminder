
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { Users, Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DeadlineCard from '@/components/DeadlineCard';
import SearchFilterBar from '@/components/SearchFilterBar';
import TaxYearSelector from '@/components/TaxYearSelector';

const SelfEmployedPage = () => {
  const [currentTaxYear, setCurrentTaxYear] = useState(new Date().getFullYear());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeadlines, setFilteredDeadlines] = useState(getTaxDeadlines('self-employed'));
  const { toast } = useToast();

  const deadlines = getTaxDeadlines('self-employed');

  const upcomingDeadlines = filteredDeadlines
    .filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const today = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(today.getMonth() + 3);
      return deadlineDate >= today && deadlineDate <= threeMonthsFromNow;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const urgentDeadlines = upcomingDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  });

  useEffect(() => {
    toast({
      title: "Self-Employed Profile Loaded",
      description: "Showing deadlines specific to self-employed taxpayers.",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Self-Employed</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Tax calendar for freelancers, consultants & sole traders</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your personalized tax calendar showing self-assessment deadlines, VAT thresholds, and Class 2/4 National Insurance contributions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{deadlines.length}</div>
              <div className="text-gray-600 dark:text-gray-300">Total Deadlines</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">{upcomingDeadlines.length}</div>
              <div className="text-gray-600 dark:text-gray-300">Next 3 Months</div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{urgentDeadlines.length}</div>
              <div className="text-gray-600 dark:text-gray-300">Urgent (30 days)</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="mb-8">
          <TaxYearSelector
            currentTaxYear={currentTaxYear}
            onTaxYearChange={setCurrentTaxYear}
          />
        </div>

        <div className="mb-8">
          <SearchFilterBar
            deadlines={deadlines}
            onFilteredDeadlines={setFilteredDeadlines}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Upcoming Deadlines */}
        {urgentDeadlines.length > 0 && (
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-800 dark:text-red-200">
                <AlertTriangle className="h-6 w-6" />
                Urgent Deadlines (Next 30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {urgentDeadlines.map((deadline) => (
                  <DeadlineCard key={deadline.id} deadline={deadline} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Deadlines */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blue-600" />
              All Self-Employed Tax Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredDeadlines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDeadlines.map((deadline) => (
                  <DeadlineCard key={deadline.id} deadline={deadline} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No deadlines found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SelfEmployedPage;
