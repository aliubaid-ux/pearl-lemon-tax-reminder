
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EnhancedButtonProps extends ButtonProps {
  icon?: LucideIcon;
  loading?: boolean;
  tooltip?: string;
  confirmAction?: boolean;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, icon: Icon, loading, tooltip, confirmAction, children, onClick, ...props }, ref) => {
    const [isConfirming, setIsConfirming] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (confirmAction && !isConfirming) {
        setIsConfirming(true);
        setTimeout(() => setIsConfirming(false), 3000);
        return;
      }
      
      if (onClick) {
        onClick(e);
      }
      
      if (confirmAction) {
        setIsConfirming(false);
      }
    };

    const buttonText = isConfirming ? 'Click again to confirm' : children;

    return (
      <Button
        className={cn(
          'transition-all duration-200 ease-in-out',
          'hover:scale-105 active:scale-95',
          'focus:ring-2 focus:ring-offset-2 focus:ring-primary/50',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          loading && 'opacity-70 cursor-wait',
          isConfirming && 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900',
          className
        )}
        variant={isConfirming ? 'secondary' : variant}
        size={size}
        onClick={handleClick}
        disabled={loading || props.disabled}
        title={tooltip}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            Icon && <Icon className="h-4 w-4" />
          )}
          {buttonText}
        </div>
      </Button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton };
