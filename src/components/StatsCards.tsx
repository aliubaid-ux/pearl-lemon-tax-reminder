
import React from 'react';
import { AlertTriangle, Calendar, Users, Building2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  urgentDeadlines: any[];
  upcomingDeadlines: any[];
  userType: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  urgentDeadlines,
  upcomingDeadlines,
  userType
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-slide-up">
      <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-xl hover-lift">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Urgent</CardTitle>
          <AlertTriangle className="h-6 w-6 ml-auto" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{urgentDeadlines.length}</div>
          <p className="text-sm opacity-90">Next 30 days</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-xl hover-lift">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
          <Calendar className="h-6 w-6 ml-auto" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{upcomingDeadlines.length}</div>
          <p className="text-sm opacity-90">Next 3 months</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover-lift">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Profile</CardTitle>
          {userType === 'company-director' ? 
            <Building2 className="h-6 w-6 ml-auto" /> : 
            <Users className="h-6 w-6 ml-auto" />
          }
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold capitalize">
            {userType === 'both' ? 'Combined' : userType.replace('-', ' ')}
          </div>
          <p className="text-sm opacity-90">Active profile</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-xl hover-lift">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Period</CardTitle>
          <Clock className="h-6 w-6 ml-auto" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {new Date().toLocaleDateString('en-GB', { month: 'long' })}
          </div>
          <p className="text-sm opacity-90">{new Date().getFullYear()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
