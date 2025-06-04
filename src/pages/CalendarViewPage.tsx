
import React, { useState } from 'react';
import { getTaxDeadlines } from '@/utils/taxDeadlines';
import { loadUserData } from '@/utils/storage';
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CalendarViewPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedProfile, setSelectedProfile] = useState<string>('all');
  const userData = loadUserData();

  const getAllDeadlines = () => {
    if (selectedProfile === 'all') {
      return getTaxDeadlines('both');
    }
    return getTaxDeadlines(selectedProfile as any);
  };

  const deadlines = getAllDeadlines();

  const getDeadlineTypeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'self-assessment':
        return 'bg-blue-500 text-white';
      case 'corporation-tax':
        return 'bg-green-500 text-white';
      case 'vat':
        return 'bg-purple-500 text-white';
      case 'payroll':
        return 'bg-orange-500 text-white';
      case 'national-insurance':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20';
      case 'low':
        return 'border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getMonthDeadlines = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    return deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate >= monthStart && deadlineDate <= monthEnd;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDeadlinesForDay = (day: number) => {
    if (!day) return [];
    
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate.toDateString() === targetDate.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthDeadlines = getMonthDeadlines();
  const days = getDaysInMonth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Tax Calendar</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Visual deadline calendar with color-coded categories</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white min-w-[200px] text-center">
              {currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="outline" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-gray-600" />
            <Select value={selectedProfile} onValueChange={setSelectedProfile}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deadlines</SelectItem>
                <SelectItem value="self-employed">Self-Employed Only</SelectItem>
                <SelectItem value="company-director">Company Director Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Legend */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Deadline Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Self Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Corporation Tax</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">VAT</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">Payroll</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">National Insurance</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-300 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    const dayDeadlines = day ? getDeadlinesForDay(day) : [];
                    const isToday = day && 
                      new Date().toDateString() === 
                      new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] p-2 border rounded-lg transition-colors ${
                          day 
                            ? `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                                isToday ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                              }`
                            : 'bg-gray-100 dark:bg-gray-900'
                        }`}
                      >
                        {day && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${
                              isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                            }`}>
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayDeadlines.slice(0, 2).map((deadline, idx) => (
                                <div
                                  key={idx}
                                  className={`text-xs p-1 rounded text-white truncate ${getDeadlineTypeColor(deadline.category)}`}
                                  title={deadline.title}
                                >
                                  {deadline.title}
                                </div>
                              ))}
                              {dayDeadlines.length > 2 && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  +{dayDeadlines.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Month Deadlines List */}
          <div>
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  This Month's Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {monthDeadlines.length > 0 ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {monthDeadlines.map((deadline) => (
                      <div
                        key={deadline.id}
                        className={`p-3 rounded-lg ${getPriorityColor(deadline.priority)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {deadline.title}
                          </h4>
                          <Badge className={`text-xs ${getDeadlineTypeColor(deadline.category)}`}>
                            {deadline.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                          {new Date(deadline.date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                        </p>
                        {deadline.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {deadline.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No deadlines this month</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarViewPage;
