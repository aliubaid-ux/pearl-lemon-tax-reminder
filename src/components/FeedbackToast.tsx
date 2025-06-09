
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface FeedbackToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
}

export const useFeedbackToast = () => {
  const { toast } = useToast();

  const showFeedback = ({ type, title, description }: FeedbackToastProps) => {
    const icons = {
      success: CheckCircle,
      error: AlertCircle,
      info: Info,
      warning: AlertTriangle
    };

    const Icon = icons[type];

    toast({
      title: (
        <div className="flex items-center gap-2">
          <Icon className={cn(
            "h-4 w-4",
            type === 'success' && "text-green-600",
            type === 'error' && "text-red-600",
            type === 'info' && "text-blue-600",
            type === 'warning' && "text-yellow-600"
          )} />
          {title}
        </div>
      ),
      description,
      duration: type === 'error' ? 5000 : 3000,
    });
  };

  return { showFeedback };
};

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');
