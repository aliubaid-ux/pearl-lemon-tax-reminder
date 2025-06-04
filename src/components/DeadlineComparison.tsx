
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GitCompare, Calendar, DollarSign, AlertTriangle, Clock, Users } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';

interface DeadlineComparisonProps {
  deadlines: TaxDeadline[];
}

const DeadlineComparison: React.FC<DeadlineComparisonProps> = ({ deadlines }) => {
  const [selectedDeadlines, setSelectedDeadlines] = useState<string[]>([]);
  const [comparisonDeadlines, setComparisonDeadlines] = useState<TaxDeadline[]>([]);

  const handleDeadlineSelect = (deadlineId: string) => {
    if (selectedDeadlines.includes(deadlineId)) {
      const updated = selectedDeadlines.filter(id => id !== deadlineId);
      setSelectedDeadlines(updated);
      setComparisonDeadlines(deadlines.filter(d => updated.includes(d.id)));
    } else if (selectedDeadlines.length < 3) {
      const updated = [...selectedDeadlines, deadlineId];
      setSelectedDeadlines(updated);
      setComparisonDeadlines(deadlines.filter(d => updated.includes(d.id)));
    }
  };

  const clearComparison = () => {
    setSelectedDeadlines([]);
    setComparisonDeadlines([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const deadlineDate = new Date(dateString);
    const today = new Date();
    return Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-purple-600" />
          Deadline Comparison Tool
          {selectedDeadlines.length > 0 && (
            <Badge variant="outline">{selectedDeadlines.length} selected</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Select onValueChange={handleDeadlineSelect}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select deadline to compare..." />
            </SelectTrigger>
            <SelectContent>
              {deadlines
                .filter(d => !selectedDeadlines.includes(d.id))
                .map((deadline) => (
                  <SelectItem key={deadline.id} value={deadline.id}>
                    {deadline.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          
          {selectedDeadlines.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearComparison}>
              Clear All
            </Button>
          )}
        </div>

        {comparisonDeadlines.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <GitCompare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>Select up to 3 deadlines to compare side-by-side</p>
            <p className="text-sm">Compare dates, priorities, penalties, and requirements</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{deadline.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(deadline.priority)}>
                        {deadline.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {deadline.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{formatDate(deadline.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span>{getDaysUntil(deadline.date)} days until due</span>
                    </div>

                    {deadline.estimatedTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>{deadline.estimatedTime}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>{deadline.userTypes.join(', ')}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-600 mb-2">{deadline.description}</p>
                    
                    {deadline.latePenalty && (
                      <div className="p-2 bg-red-50 rounded border border-red-200">
                        <div className="flex items-center gap-1 mb-1">
                          <AlertTriangle className="h-3 w-3 text-red-600" />
                          <span className="text-xs font-medium text-red-700">Late Penalty</span>
                        </div>
                        <p className="text-xs text-red-600">{deadline.latePenalty}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    {deadline.requiredDocuments && deadline.requiredDocuments.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-gray-700 mb-1 block">
                          Required Documents ({deadline.requiredDocuments.length}):
                        </span>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {deadline.requiredDocuments.slice(0, 3).map((doc, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                              {doc}
                            </li>
                          ))}
                          {deadline.requiredDocuments.length > 3 && (
                            <li className="text-xs text-gray-500 italic">
                              +{deadline.requiredDocuments.length - 3} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {deadline.quickWins && deadline.quickWins.length > 0 && (
                    <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                      <span className="text-xs font-medium text-yellow-700 mb-1 block">
                        Quick Wins:
                      </span>
                      <ul className="text-xs text-yellow-600 space-y-1">
                        {deadline.quickWins.slice(0, 2).map((win, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="w-1 h-1 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></span>
                            {win}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeadlineSelect(deadline.id)}
                  >
                    Remove from comparison
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {comparisonDeadlines.length > 1 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Comparison Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Most Urgent:</span>
                <p className="text-blue-600">
                  {comparisonDeadlines
                    .sort((a, b) => getDaysUntil(a.date) - getDaysUntil(b.date))[0]
                    .title}
                </p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Highest Priority:</span>
                <p className="text-blue-600">
                  {comparisonDeadlines
                    .filter(d => d.priority === 'high').length > 0
                    ? `${comparisonDeadlines.filter(d => d.priority === 'high').length} high priority`
                    : 'No high priority'}
                </p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Total Documents:</span>
                <p className="text-blue-600">
                  {comparisonDeadlines.reduce((acc, d) => acc + (d.requiredDocuments?.length || 0), 0)} required
                </p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Quick Wins:</span>
                <p className="text-blue-600">
                  {comparisonDeadlines.reduce((acc, d) => acc + (d.quickWins?.length || 0), 0)} available
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeadlineComparison;
