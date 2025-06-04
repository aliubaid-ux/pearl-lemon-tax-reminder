
import React from 'react';
import { Bell } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface EmailReminderToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const EmailReminderToggle: React.FC<EmailReminderToggleProps> = ({
  enabled,
  onToggle
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Bell className="h-5 w-5 text-gray-600" />
        <div>
          <Label className="text-base font-medium">Email Notifications</Label>
          <p className="text-sm text-gray-600">Get notified before tax deadlines</p>
        </div>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
      />
    </div>
  );
};

export default EmailReminderToggle;
