
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated' | 'minimal';
  hover?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  hover = true 
}) => {
  const variants = {
    default: 'bg-white/90 backdrop-blur-sm border-white/20 shadow-lg',
    glass: 'bg-white/10 backdrop-blur-lg border-white/20 shadow-xl',
    elevated: 'bg-white shadow-2xl border-0',
    minimal: 'bg-transparent border-gray-200/50'
  };

  const hoverEffect = hover ? 'hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1' : '';

  return (
    <Card className={cn(
      'transition-all duration-300 ease-out',
      variants[variant],
      hoverEffect,
      className
    )}>
      {children}
    </Card>
  );
};

export default ModernCard;
