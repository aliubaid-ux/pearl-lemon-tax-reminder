
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, AlertTriangle } from 'lucide-react';
import { getTaxDeadlines } from '@/utils/taxDeadlines';

const QuickDeadlineLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<'self-employed' | 'company-director' | 'both'>('self-employed');

  const allDeadlines = getTaxDeadlines(selectedUserType);
  
  const filteredDeadlines = allDeadlines.filter(deadline =>
    deadline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deadline.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deadline.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDaysUntil = (date: string) => {
    const deadlineDate = new Date(date);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Quick Deadline Lookup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search deadlines (e.g., VAT, Self Assessment, Corporation Tax)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-1">
            {(['self-employed', 'company-director', 'both'] as const).map((type) => (
              <Button
                key={type}
                variant={selectedUserType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedUserType(type)}
              >
                {type === 'self-employed' ? 'Self-Emp' : type === 'company-director' ? 'Company' : 'Both'}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredDeadlines.map((deadline) => {
            const daysUntil = getDaysUntil(deadline.date);
            const isUrgent = daysUntil <= 7 && daysUntil >= 0;
            
            return (
              <div 
                key={deadline.id}
                className={`p-3 rounded-lg border ${
                  isUrgent ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(deadline.date).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isUrgent && <AlertTriangle className="h-4 w-4 text-red-600" />}
                    <Badge variant={isUrgent ? 'destructive' : 'secondary'}>
                      {daysUntil === 0 ? 'Today' : 
                       daysUntil === 1 ? 'Tomorrow' : 
                       daysUntil < 0 ? 'Overdue' : 
                       `${daysUntil} days`}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDeadlines.length === 0 && searchTerm && (
          <p className="text-center text-gray-500 py-4">
            No deadlines found matching "{searchTerm}"
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickDeadlineLookup;
