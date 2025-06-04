
import React from 'react';
import { Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CurrentSettingsProps {
  enabled: boolean;
  email?: string;
  daysBeforeNotification: number[];
}

const CurrentSettings: React.FC<CurrentSettingsProps> = ({
  enabled,
  email,
  daysBeforeNotification
}) => {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-4 w-4 text-blue-600" />
        <span className="font-medium text-blue-900">Current Settings</span>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <span>Status:</span>
          <Badge variant={enabled ? "default" : "secondary"}>
            {enabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
        {enabled && (
          <>
            <div className="flex items-center justify-between">
              <span>Email:</span>
              <span className="text-blue-700">{email || 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Notify:</span>
              <span className="text-blue-700">
                {daysBeforeNotification.length > 0
                  ? `${daysBeforeNotification.join(', ')} days before`
                  : 'Not configured'
                }
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentSettings;
