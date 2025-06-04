
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ModernBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  pulse?: boolean;
  className?: string;
}

const ModernBadge: React.FC<ModernBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon: Icon,
  pulse = false,
  className
}) => {
  const variants = {
    success: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200',
    warning: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200',
    error: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200',
    info: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200',
    neutral: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <Badge className={cn(
      'inline-flex items-center gap-1.5 font-medium rounded-full border',
      'transition-all duration-200 hover:scale-105',
      variants[variant],
      sizes[size],
      pulse && 'animate-pulse',
      className
    )}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </Badge>
  );
};

export default ModernBadge;
