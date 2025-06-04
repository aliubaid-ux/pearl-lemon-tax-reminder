
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TaxYearToggleProps {
  currentTaxYear: string;
  onTaxYearChange: (taxYear: string) => void;
}

const TaxYearToggle: React.FC<TaxYearToggleProps> = ({
  currentTaxYear,
  onTaxYearChange
}) => {
  const getCurrentTaxYear = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const isAfterApril5 = now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() >= 6);
    return isAfterApril5 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;
  };

  const [selectedYear, setSelectedYear] = useState(currentTaxYear || getCurrentTaxYear());

  const generateTaxYears = () => {
    const current = getCurrentTaxYear();
    const currentStartYear = parseInt(current.split('-')[0]);
    const years = [];
    
    // Generate 3 years back and 2 years forward
    for (let i = -3; i <= 2; i++) {
      const startYear = currentStartYear + i;
      years.push(`${startYear}-${startYear + 1}`);
    }
    
    return years;
  };

  const taxYears = generateTaxYears();
  const currentIndex = taxYears.indexOf(selectedYear);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newYear = taxYears[currentIndex - 1];
      setSelectedYear(newYear);
      onTaxYearChange(newYear);
    }
  };

  const goToNext = () => {
    if (currentIndex < taxYears.length - 1) {
      const newYear = taxYears[currentIndex + 1];
      setSelectedYear(newYear);
      onTaxYearChange(newYear);
    }
  };

  const goToCurrent = () => {
    const current = getCurrentTaxYear();
    setSelectedYear(current);
    onTaxYearChange(current);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">Tax Year:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Badge 
              variant="default" 
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={goToCurrent}
            >
              {selectedYear}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentIndex >= taxYears.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          Click badge to return to current tax year
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxYearToggle;
