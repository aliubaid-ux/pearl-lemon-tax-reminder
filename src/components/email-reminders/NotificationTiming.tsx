
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface NotificationTimingProps {
  currentDays: number[];
  enabled: boolean;
  onUpdateDays: (days: number[]) => void;
}

const NotificationTiming: React.FC<NotificationTimingProps> = ({
  currentDays,
  enabled,
  onUpdateDays
}) => {
  const presetDays = [
    { label: "1 day", value: [1] },
    { label: "3 days", value: [3] },
    { label: "1 week", value: [7] },
    { label: "1 week + 1 day", value: [7, 1] },
    { label: "2 weeks + 3 days", value: [14, 3] },
    { label: "Custom", value: [] }
  ];

  return (
    <div className="space-y-3">
      <Label>Notification Timing</Label>
      <div className="grid grid-cols-2 gap-2">
        {presetDays.map((preset, index) => (
          <Button
            key={index}
            variant={
              JSON.stringify(currentDays) === JSON.stringify(preset.value)
                ? "default" 
                : "outline"
            }
            size="sm"
            onClick={() => onUpdateDays(preset.value)}
            disabled={!enabled}
            className="justify-start"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NotificationTiming;
