
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmailInputProps {
  email: string;
  isValidEmail: boolean;
  enabled: boolean;
  onEmailChange: (email: string) => void;
  onSave: () => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  isValidEmail,
  enabled,
  onEmailChange,
  onSave
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <div className="flex gap-2">
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={!isValidEmail ? 'border-red-500' : ''}
          disabled={!enabled}
        />
        <Button 
          onClick={onSave}
          disabled={!isValidEmail || !email || !enabled}
          size="sm"
        >
          <Check className="h-4 w-4" />
        </Button>
      </div>
      {!isValidEmail && (
        <p className="text-sm text-red-600">Please enter a valid email address</p>
      )}
    </div>
  );
};

export default EmailInput;
