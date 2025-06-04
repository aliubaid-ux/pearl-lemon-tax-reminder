
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ModernBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ModernBadge: React.FC<ModernBadgeProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    error: 'bg-red-100 text-red-800 border-red-200'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <Badge 
      className={cn(
        'inline-flex items-center rounded-full font-medium border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </Badge>
  );
};

export default ModernBadge;
