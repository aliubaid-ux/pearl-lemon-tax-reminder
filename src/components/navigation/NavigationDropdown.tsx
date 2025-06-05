
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  title: string;
  path: string;
}

interface NavigationDropdownProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavigationItem[];
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ title, icon: Icon, items }) => {
  const navigate = useNavigate();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-9 px-3 bg-white dark:bg-gray-800 z-50">
        <Icon className="h-4 w-4 mr-2" />
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 w-80 z-50 shadow-lg">
        <div className="grid gap-3">
          {items.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className="justify-start"
            >
              {item.title}
            </Button>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavigationDropdown;
