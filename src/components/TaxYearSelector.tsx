
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TaxYearSelectorProps {
  currentTaxYear: number;
  onTaxYearChange: (year: number) => void;
}

const TaxYearSelector: React.FC<TaxYearSelectorProps> = ({
  currentTaxYear,
  onTaxYearChange
}) => {
  const currentCalendarYear = new Date().getFullYear();
  const isCurrentTaxYear = currentTaxYear === currentCalendarYear;
  
  const getTaxYearPeriod = (year: number) => {
    return `${year}-${year + 1}`;
  };

  const getTaxYearDescription = (year: number) => {
    if (year === currentCalendarYear) {
      return 'Current tax year';
    } else if (year < currentCalendarYear) {
      return 'Previous tax year';
    } else {
      return 'Future tax year';
    }
  };

  const canNavigateBack = currentTaxYear > currentCalendarYear - 3;
  const canNavigateForward = currentTaxYear < currentCalendarYear + 2;

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Tax Year {getTaxYearPeriod(currentTaxYear)}
                </h3>
                {isCurrentTaxYear && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                {getTaxYearDescription(currentTaxYear)}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        UK tax year runs from 6 April to 5 April the following year
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTaxYearChange(currentTaxYear - 1)}
              disabled={!canNavigateBack}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="text-center min-w-[80px]">
              <span className="text-sm font-medium text-gray-700">
                {currentTaxYear}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTaxYearChange(currentTaxYear + 1)}
              disabled={!canNavigateForward}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Tax Year Information */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-900">Tax Year Start:</span>
              <span className="text-blue-700 ml-2">6 April {currentTaxYear}</span>
            </div>
            <div>
              <span className="font-medium text-blue-900">Tax Year End:</span>
              <span className="text-blue-700 ml-2">5 April {currentTaxYear + 1}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxYearSelector;
