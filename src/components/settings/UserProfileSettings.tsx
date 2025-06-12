
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { User, Save, RefreshCw } from 'lucide-react';

const UserProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const { profile, updateProfile, loading } = useUserProfile();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateProfile({ full_name: fullName });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6 text-green-600" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Manage your personal information and account details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email (Read-only) */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
            className="bg-gray-100 dark:bg-gray-700"
          />
          <p className="text-xs text-gray-500">Email cannot be changed</p>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="full-name">Full Name</Label>
          <Input
            id="full-name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading || saving}
          />
        </div>

        {/* Account Info */}
        <div className="space-y-2">
          <Label>Account Created</Label>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Loading...'}
          </div>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSaveProfile}
          disabled={saving || loading || fullName === (profile?.full_name || '')}
          className="w-full"
        >
          {saving ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {saving ? 'Saving...' : 'Save Profile'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfileSettings;
