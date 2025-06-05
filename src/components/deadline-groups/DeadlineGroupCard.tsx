
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TaxDeadline } from '@/types/tax';

interface DeadlineGroupCardProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  deadlines: TaxDeadline[];
  isOpen: boolean;
  onToggle: () => void;
  isCategory?: boolean;
}

const DeadlineGroupCard: React.FC<DeadlineGroupCardProps> = ({
  id,
  title,
  icon: Icon,
  color,
  deadlines,
  isOpen,
  onToggle,
  isCategory = false
}) => {
  const getColorClasses = (color: string, isOpen: boolean) => {
    const colors = {
      red: {
        bg: isOpen ? 'bg-red-50' : 'bg-white',
        border: 'border-red-200',
        text: 'text-red-900',
        icon: 'text-red-600'
      },
      amber: {
        bg: isOpen ? 'bg-amber-50' : 'bg-white',
        border: 'border-amber-200',
        text: 'text-amber-900',
        icon: 'text-amber-600'
      },
      blue: {
        bg: isOpen ? 'bg-blue-50' : 'bg-white',
        border: 'border-blue-200',
        text: 'text-blue-900',
        icon: 'text-blue-600'
      },
      green: {
        bg: isOpen ? 'bg-green-50' : 'bg-white',
        border: 'border-green-200',
        text: 'text-green-900',
        icon: 'text-green-600'
      }
    };
    return colors[color as keyof typeof colors];
  };

  const colorClasses = getColorClasses(color, isOpen);

  return (
    <Card className={`${colorClasses.bg} ${colorClasses.border}`}>
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-opacity-80 transition-colors pb-3">
            <CardTitle className={`flex items-center justify-between ${colorClasses.text}`}>
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${colorClasses.icon}`} />
                <span>{title}</span>
                <Badge variant="secondary" className="bg-white">
                  {isCategory ? Object.keys(groupByCategory(deadlines)).length : deadlines.length}
                </Badge>
              </div>
              {isOpen ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {isCategory ? (
              <CategoryGroupContent deadlines={deadlines} />
            ) : (
              <TimeGroupContent deadlines={deadlines} />
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

const groupByCategory = (deadlines: TaxDeadline[]) => {
  const categoryGroups: { [key: string]: TaxDeadline[] } = {};
  deadlines.forEach(deadline => {
    if (!categoryGroups[deadline.category]) {
      categoryGroups[deadline.category] = [];
    }
    categoryGroups[deadline.category].push(deadline);
  });
  return categoryGroups;
};

const CategoryGroupContent: React.FC<{ deadlines: TaxDeadline[] }> = ({ deadlines }) => (
  <div className="space-y-3">
    {Object.entries(groupByCategory(deadlines))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, categoryDeadlines]) => (
        <div key={category} className="space-y-2">
          <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide">
            {category}
          </h4>
          {categoryDeadlines
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((deadline) => (
              <DeadlineItem key={deadline.id} deadline={deadline} />
            ))}
          {categoryDeadlines.length > 5 && (
            <p className="text-xs text-gray-500 italic">
              +{categoryDeadlines.length - 5} more deadlines in this category
            </p>
          )}
        </div>
      ))}
  </div>
);

const TimeGroupContent: React.FC<{ deadlines: TaxDeadline[] }> = ({ deadlines }) => (
  <div className="space-y-2">
    {deadlines
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((deadline) => (
        <DeadlineItem key={deadline.id} deadline={deadline} showCategory />
      ))}
    {deadlines.length === 0 && (
      <p className="text-sm text-gray-500 italic text-center py-4">
        No deadlines in this period
      </p>
    )}
  </div>
);

const DeadlineItem: React.FC<{ deadline: TaxDeadline; showCategory?: boolean }> = ({ 
  deadline, 
  showCategory = false 
}) => (
  <div className="flex items-center justify-between p-2 bg-white rounded border">
    <div>
      <p className="font-medium text-gray-900 text-sm">{deadline.title}</p>
      <p className="text-xs text-gray-600">
        {new Date(deadline.date).toLocaleDateString('en-GB')}
        {showCategory && ` • ${deadline.category}`}
      </p>
      {deadline.description && (
        <p className="text-xs text-gray-500 mt-1">{deadline.description}</p>
      )}
    </div>
    <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
      {deadline.priority}
    </Badge>
  </div>
);

export default DeadlineGroupCard;
