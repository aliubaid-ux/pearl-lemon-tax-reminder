
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Calendar, AlertTriangle, Clock, DollarSign } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  date: string;
  category: string;
  priority: string;
  description?: string;
}

interface SmartDeadlineGroupsProps {
  deadlines: Deadline[];
}

const SmartDeadlineGroups: React.FC<SmartDeadlineGroupsProps> = ({ deadlines }) => {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(['urgent']));

  const toggleGroup = (groupId: string) => {
    const newOpenGroups = new Set(openGroups);
    if (newOpenGroups.has(groupId)) {
      newOpenGroups.delete(groupId);
    } else {
      newOpenGroups.add(groupId);
    }
    setOpenGroups(newOpenGroups);
  };

  const today = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 7);
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(today.getMonth() + 3);

  const groups = [
    {
      id: 'urgent',
      title: 'Urgent (Next 7 Days)',
      icon: AlertTriangle,
      color: 'red',
      deadlines: deadlines.filter(d => {
        const date = new Date(d.date);
        return date >= today && date <= oneWeekFromNow;
      })
    },
    {
      id: 'thisMonth',
      title: 'This Month',
      icon: Clock,
      color: 'amber',
      deadlines: deadlines.filter(d => {
        const date = new Date(d.date);
        return date > oneWeekFromNow && date <= oneMonthFromNow;
      })
    },
    {
      id: 'quarterly',
      title: 'Next 3 Months',
      icon: Calendar,
      color: 'blue',
      deadlines: deadlines.filter(d => {
        const date = new Date(d.date);
        return date > oneMonthFromNow && date <= threeMonthsFromNow;
      })
    },
    {
      id: 'byCategory',
      title: 'By Category',
      icon: DollarSign,
      color: 'green',
      deadlines: deadlines,
      isCategory: true
    }
  ];

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

  const groupByCategory = (deadlines: Deadline[]) => {
    const categoryGroups: { [key: string]: Deadline[] } = {};
    deadlines.forEach(deadline => {
      if (!categoryGroups[deadline.category]) {
        categoryGroups[deadline.category] = [];
      }
      categoryGroups[deadline.category].push(deadline);
    });
    return categoryGroups;
  };

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const isOpen = openGroups.has(group.id);
        const colorClasses = getColorClasses(group.color, isOpen);
        
        return (
          <Card key={group.id} className={`${colorClasses.bg} ${colorClasses.border}`}>
            <Collapsible open={isOpen} onOpenChange={() => toggleGroup(group.id)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-opacity-80 transition-colors pb-3">
                  <CardTitle className={`flex items-center justify-between ${colorClasses.text}`}>
                    <div className="flex items-center gap-2">
                      <group.icon className={`h-5 w-5 ${colorClasses.icon}`} />
                      <span>{group.title}</span>
                      <Badge variant="secondary" className="bg-white">
                        {group.isCategory ? Object.keys(groupByCategory(group.deadlines)).length : group.deadlines.length}
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
                  {group.isCategory ? (
                    <div className="space-y-3">
                      {Object.entries(groupByCategory(group.deadlines))
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
                                <div key={deadline.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                  <div>
                                    <p className="font-medium text-gray-900 text-sm">{deadline.title}</p>
                                    <p className="text-xs text-gray-600">
                                      {new Date(deadline.date).toLocaleDateString('en-GB')}
                                    </p>
                                  </div>
                                  <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                                    {deadline.priority}
                                  </Badge>
                                </div>
                              ))}
                            {categoryDeadlines.length > 5 && (
                              <p className="text-xs text-gray-500 italic">
                                +{categoryDeadlines.length - 5} more deadlines in this category
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {group.deadlines
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((deadline) => (
                          <div key={deadline.id} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{deadline.title}</p>
                              <p className="text-xs text-gray-600">
                                {new Date(deadline.date).toLocaleDateString('en-GB')} • {deadline.category}
                              </p>
                              {deadline.description && (
                                <p className="text-xs text-gray-500 mt-1">{deadline.description}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}>
                                {deadline.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      {group.deadlines.length === 0 && (
                        <p className="text-sm text-gray-500 italic text-center py-4">
                          No deadlines in this period
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};

export default SmartDeadlineGroups;
