
import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Calendar, AlertTriangle, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { TaxDeadline } from '@/types/tax';

interface NotificationCenterProps {
  deadlines: TaxDeadline[];
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  daysBeforeDeadline: number;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ deadlines }) => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'deadline' | 'warning' | 'info';
    title: string;
    message: string;
    deadline?: TaxDeadline;
    timestamp: Date;
    read: boolean;
  }>>([]);
  
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'high-priority-7days',
      label: 'High Priority Deadlines',
      description: 'Notify 7 days before high priority deadlines',
      enabled: true,
      daysBeforeDeadline: 7
    },
    {
      id: 'medium-priority-14days',
      label: 'Medium Priority Deadlines',
      description: 'Notify 14 days before medium priority deadlines',
      enabled: true,
      daysBeforeDeadline: 14
    },
    {
      id: 'low-priority-30days',
      label: 'Low Priority Deadlines',
      description: 'Notify 30 days before low priority deadlines',
      enabled: false,
      daysBeforeDeadline: 30
    },
    {
      id: 'browser-notifications',
      label: 'Browser Notifications',
      description: 'Show browser notifications for urgent deadlines',
      enabled: false,
      daysBeforeDeadline: 0
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Check for notifications
  useEffect(() => {
    checkDeadlineNotifications();
    const interval = setInterval(checkDeadlineNotifications, 24 * 60 * 60 * 1000); // Check daily
    return () => clearInterval(interval);
  }, [deadlines, settings]);

  // Request browser notification permission
  useEffect(() => {
    if (settings.find(s => s.id === 'browser-notifications')?.enabled) {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [settings]);

  const checkDeadlineNotifications = () => {
    const today = new Date();
    const newNotifications: typeof notifications = [];

    deadlines.forEach(deadline => {
      const deadlineDate = new Date(deadline.date);
      const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      // Check each notification setting
      settings.forEach(setting => {
        if (!setting.enabled) return;

        const shouldNotify = 
          (setting.id === 'high-priority-7days' && deadline.priority === 'high' && daysUntil === 7) ||
          (setting.id === 'medium-priority-14days' && deadline.priority === 'medium' && daysUntil === 14) ||
          (setting.id === 'low-priority-30days' && deadline.priority === 'low' && daysUntil === 30);

        if (shouldNotify) {
          const notification = {
            id: `${deadline.id}-${setting.id}-${today.toISOString()}`,
            type: 'deadline' as const,
            title: `Upcoming ${deadline.priority} priority deadline`,
            message: `${deadline.title} is due in ${daysUntil} days (${deadlineDate.toLocaleDateString()})`,
            deadline,
            timestamp: today,
            read: false
          };

          newNotifications.push(notification);

          // Browser notification
          if (setting.id === 'browser-notifications' && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(notification.title, {
              body: notification.message,
              icon: '/favicon.ico',
              tag: notification.id
            });
          }

          // Toast notification
          toast({
            title: notification.title,
            description: notification.message,
            duration: 5000,
          });
        }
      });
    });

    if (newNotifications.length > 0) {
      setNotifications(prev => [...newNotifications, ...prev].slice(0, 50)); // Keep last 50
    }
  };

  const toggleSetting = (settingId: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-y-auto z-50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Notifications</CardTitle>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    <Check className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Notification Settings */}
            <div className="space-y-3 border-b pb-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Settings className="h-3 w-3" />
                Settings
              </h4>
              {settings.map(setting => (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium">{setting.label}</p>
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              ))}
            </div>

            {/* Notifications List */}
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 10).map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {notification.type === 'deadline' && (
                            <Calendar className="h-3 w-3 text-blue-600" />
                          )}
                          {notification.type === 'warning' && (
                            <AlertTriangle className="h-3 w-3 text-amber-600" />
                          )}
                          <p className="text-xs font-medium">{notification.title}</p>
                        </div>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
