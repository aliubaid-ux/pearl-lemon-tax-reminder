
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
    overview: true,  // Start with overview open
    urgentDeadlines: true,  // Always show urgent by default
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
    <Card className={`${priority && urgentDeadlines.length > 0 ? "border-red-200 bg-red-50/30" : ""}`}>
      <Collapsible open={openSections[id]} onOpenChange={() => toggleSection(id)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${priority ? "text-red-600" : "text-blue-600"}`} />
                <span>{title}</span>
                {badge !== undefined && (
                  <Badge variant={priority ? "destructive" : "secondary"}>
                    {badge}
                  </Badge>
                )}
              </div>
              {openSections[id] ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Quick Status Overview - Always Visible */}
      <CollapsibleSection
        id="overview"
        title="Dashboard Overview"
        icon={LayoutDashboard}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Urgent (7 days)</p>
              <p className="text-xl font-bold">{urgentDeadlines.length}</p>
            </div>
            <AlertTriangle className={urgentDeadlines.length > 0 ? "h-5 w-5 text-red-600" : "h-5 w-5 text-gray-400"} />
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Coming Up (30 days)</p>
              <p className="text-xl font-bold">{upcomingDeadlines.length}</p>
            </div>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>

          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Profile</p>
              <p className="text-sm font-semibold capitalize">{userType.replace('-', ' ')}</p>
            </div>
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </CollapsibleSection>

      {/* Urgent Deadlines - Auto-open if urgent items exist */}
      {urgentDeadlines.length > 0 && (
        <CollapsibleSection
          id="urgentDeadlines"
          title="Urgent Action Required"
          icon={AlertTriangle}
          badge={urgentDeadlines.length}
          priority={true}
        >
          <div className="space-y-2">
            {urgentDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{deadline.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                  {deadline.description && (
                    <p className="text-xs text-gray-500 mt-1">{deadline.description}</p>
                  )}
                </div>
                <Badge variant="destructive" className="text-xs">
                  {getDaysUntil(deadline.date)} days
                </Badge>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Quick Actions - Collapsible */}
      <CollapsibleSection
        id="quickActions"
        title="Tax Tools & Calculators"
        icon={Calculator}
        badge={4}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/penalty-calculator')}
            className="h-16 flex flex-col gap-1 text-xs"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Penalty Calculator</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/vat-calculator')}
            className="h-16 flex flex-col gap-1 text-xs"
          >
            <Calculator className="h-4 w-4" />
            <span>VAT Calculator</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/common-tax-issues')}
            className="h-16 flex flex-col gap-1 text-xs"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Common Issues</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/hmrc-support-guide')}
            className="h-16 flex flex-col gap-1 text-xs"
          >
            <FileText className="h-4 w-4" />
            <span>HMRC Support</span>
          </Button>
        </div>
      </CollapsibleSection>

      {/* Upcoming Deadlines - Collapsible */}
      {upcomingDeadlines.length > 0 && (
        <CollapsibleSection
          id="upcomingDeadlines"
          title="Upcoming Deadlines (Next 30 Days)"
          icon={Clock}
          badge={upcomingDeadlines.length}
        >
          <div className="space-y-2">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{deadline.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{formatDate(deadline.date)}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {getDaysUntil(deadline.date)} days
                </Badge>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Calendar View - Collapsible */}
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

      {/* All Deadlines - Collapsible */}
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

      {/* User Settings & Profile - Collapsible */}
      <CollapsibleSection
        id="userSettings"
        title="Profile Settings"
        icon={Settings}
      >
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2">Current Profile</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 capitalize">
              {userType.replace('-', ' ')}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/settings')}
              className="mt-2"
            >
              Change Profile Settings
            </Button>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Quick Help</h4>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/common-tax-issues')}
                className="w-full justify-start text-xs"
              >
                <Info className="h-3 w-3 mr-2" />
                Common Tax Issues
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/hmrc-support-guide')}
                className="w-full justify-start text-xs"
              >
                <FileText className="h-3 w-3 mr-2" />
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
