
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InteractiveCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverable?: boolean;
  selected?: boolean;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  children,
  onClick,
  className,
  hoverable = true,
  selected = false
}) => {
  return (
    <Card
      className={cn(
        'transition-all duration-200 ease-in-out',
        hoverable && 'hover:shadow-lg hover:-translate-y-1',
        onClick && 'cursor-pointer hover:border-primary/50',
        selected && 'border-primary shadow-lg',
        'focus-within:ring-2 focus-within:ring-primary/20',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default InteractiveCard;
