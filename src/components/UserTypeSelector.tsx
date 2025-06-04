
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, UserCog } from 'lucide-react';

type UserType = 'self-employed' | 'company-director' | 'both';

interface UserTypeSelectorProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ userType, onUserTypeChange }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Select Your Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant={userType === 'self-employed' ? 'default' : 'outline'}
            className="h-auto py-4 px-6 flex flex-col items-center gap-2"
            onClick={() => onUserTypeChange('self-employed')}
          >
            <Users className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Self-Employed</div>
              <div className="text-xs opacity-75">Sole trader, freelancer</div>
            </div>
          </Button>
          
          <Button
            variant={userType === 'company-director' ? 'default' : 'outline'}
            className="h-auto py-4 px-6 flex flex-col items-center gap-2"
            onClick={() => onUserTypeChange('company-director')}
          >
            <Building2 className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Company Director</div>
              <div className="text-xs opacity-75">Limited company</div>
            </div>
          </Button>
          
          <Button
            variant={userType === 'both' ? 'default' : 'outline'}
            className="h-auto py-4 px-6 flex flex-col items-center gap-2"
            onClick={() => onUserTypeChange('both')}
          >
            <UserCog className="h-6 w-6" />
            <div className="text-center">
              <div className="font-medium">Both</div>
              <div className="text-xs opacity-75">Self-employed + Director</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTypeSelector;
