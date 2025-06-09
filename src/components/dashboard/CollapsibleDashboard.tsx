
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Calculator, 
  FileText,
  LayoutDashboard,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Settings,
  Info
} from 'lucide-react';
import { TaxDeadline } from '@/types/tax';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import MainTabs from '@/components/MainTabs';
import VisualDeadlineDisplay from '@/components/VisualDeadlineDisplay';

type UserType = 'self-employed' | 'company-director' | 'both';

interface CollapsibleDashboardProps {
  deadlines: TaxDeadline[];
  userType: UserType;
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

const CollapsibleDashboard: React.FC<CollapsibleDashboardProps> = ({ 
  deadlines, 
  userType, 
  selectedMonth, 
  onMonthChange 
}) => {
  const navigate = useNavigate();
  const today = new Date();

  // Collapsible state management
  const [openSections, setOpenSections] = useState({
    overview: true,
    urgentDeadlines: true,
    quickActions: false,
    upcomingDeadlines: false,
    calendarView: false,
    allDeadlines: false,
    userSettings: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Calculate key metrics
  const urgentDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 7 && daysUntil >= 0;
  });

  const upcomingDeadlines = deadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil > 7;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const deadlineDate = new Date(dateString);
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil;
  };

  const CollapsibleSection: React.FC<{
    id: keyof typeof openSections;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    priority?: boolean;
    children: React.ReactNode;
  }> = ({ id, title, icon: Icon, badge, priority, children }) => (
    <Card className={`${priority && urgentDeadlines.length > 0 ? "border-red-200 bg-red-50/30" : ""} shadow-lg`}>
      <Collapsible open={openSections[id]} onOpenChange={() => toggleSection(id)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors pb-4">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${priority ? "text-red-600" : "text-blue-600"}`} />
                <span>{title}</span>
                {badge !== undefined && (
                  <Badge variant={priority ? "destructive" : "secondary"} className="px-2 py-1">
                    {badge}
                  </Badge>
                )}
              </div>
              {openSections[id] ? 
                <ChevronDown className="h-5 w-5" /> : 
                <ChevronRight className="h-5 w-5" />
              }
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 pb-6">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Quick Status Overview */}
      <CollapsibleSection
        id="overview"
        title="Dashboard Overview"
        icon={LayoutDashboard}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Urgent (7 days)</p>
              <p className="text-3xl font-bold">{urgentDeadlines.length}</p>
            </div>
            <AlertTriangle className={urgentDeadlines.length > 0 ? "h-8 w-8 text-red-600" : "h-8 w-8 text-gray-400"} />
          </div>

          <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coming Up (30 days)</p>
              <p className="text-3xl font-bold">{upcomingDeadlines.length}</p>
            </div>
            <Clock className="h-8 w-8 text-amber-600" />
          </div>

          <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Profile</p>
              <p className="text-lg font-semibold capitalize">{userType.replace('-', ' ')}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </CollapsibleSection>

      {/* Urgent Deadlines */}
      {urgentDeadlines.length > 0 && (
        <CollapsibleSection
          id="urgentDeadlines"
          title="Urgent Action Required"
          icon={AlertTriangle}
          badge={urgentDeadlines.length}
          priority={true}
        >
          <div className="space-y-4">
            {urgentDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{deadline.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                  {deadline.description && (
                    <p className="text-sm text-gray-500 mt-2">{deadline.description}</p>
                  )}
                </div>
                <Badge variant="destructive" className="px-3 py-1.5">
                  {getDaysUntil(deadline.date)} days
                </Badge>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Quick Actions */}
      <CollapsibleSection
        id="quickActions"
        title="Tax Tools & Calculators"
        icon={Calculator}
        badge={4}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/penalty-calculator')}
            className="h-24 flex flex-col gap-3 text-base font-medium"
          >
            <TrendingUp className="h-6 w-6" />
            <span>Penalty Calculator</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/vat-calculator')}
            className="h-24 flex flex-col gap-3 text-base font-medium"
          >
            <Calculator className="h-6 w-6" />
            <span>VAT Calculator</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/common-tax-issues')}
            className="h-24 flex flex-col gap-3 text-base font-medium"
          >
            <AlertTriangle className="h-6 w-6" />
            <span>Common Issues</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/hmrc-support-guide')}
            className="h-24 flex flex-col gap-3 text-base font-medium"
          >
            <FileText className="h-6 w-6" />
            <span>HMRC Support</span>
          </Button>
        </div>
      </CollapsibleSection>

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <CollapsibleSection
          id="upcomingDeadlines"
          title="Upcoming Deadlines (Next 30 Days)"
          icon={Clock}
          badge={upcomingDeadlines.length}
        >
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between py-4 px-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="space-y-1">
                  <p className="font-medium text-gray-900 dark:text-white text-base">{deadline.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                </div>
                <Badge variant="secondary" className="px-3 py-1">
                  {getDaysUntil(deadline.date)} days
                </Badge>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Calendar View */}
      <CollapsibleSection
        id="calendarView"
        title="Interactive Calendar"
        icon={Calendar}
      >
        <MainTabs
          filteredDeadlines={deadlines}
          upcomingDeadlines={upcomingDeadlines}
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
          userType={userType}
        />
      </CollapsibleSection>

      {/* All Deadlines */}
      <CollapsibleSection
        id="allDeadlines"
        title="All Deadlines (Detailed View)"
        icon={FileText}
        badge={deadlines.length}
      >
        <VisualDeadlineDisplay 
          deadlines={deadlines} 
          userType={userType} 
        />
      </CollapsibleSection>

      {/* User Settings & Profile */}
      <CollapsibleSection
        id="userSettings"
        title="Profile Settings"
        icon={Settings}
      >
        <div className="space-y-6">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-lg mb-3">Current Profile</h4>
            <p className="text-base text-blue-700 dark:text-blue-300 capitalize mb-4">
              {userType.replace('-', ' ')}
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/settings')}
              className="px-4 py-2"
            >
              Change Profile Settings
            </Button>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">Quick Help</h4>
            <div className="space-y-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/common-tax-issues')}
                className="w-full justify-start text-base py-3"
              >
                <Info className="h-5 w-5 mr-3" />
                Common Tax Issues
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/hmrc-support-guide')}
                className="w-full justify-start text-base py-3"
              >
                <FileText className="h-5 w-5 mr-3" />
                HMRC Support Guide
              </Button>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CollapsibleDashboard;
