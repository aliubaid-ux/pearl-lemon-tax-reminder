
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  onClick,
  className,
  disabled
}) => {
  const variants = {
    default: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl',
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl',
    glass: 'bg-white/20 backdrop-blur-md border-white/30 text-gray-900 dark:text-white hover:bg-white/30',
    minimal: 'bg-transparent border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'transition-all duration-200 ease-out hover:scale-105 active:scale-95',
        'font-medium rounded-xl border-0',
        variants[variant],
        sizes[size],
        className
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </div>
    </Button>
  );
};

export default AnimatedButton;
