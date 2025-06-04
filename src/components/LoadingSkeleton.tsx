
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ModernCard from './ModernCard';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'timeline' | 'stats';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'card', 
  count = 3 
}) => {
  const renderCardSkeleton = () => (
    <ModernCard variant="glass" className="p-6 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </ModernCard>
  );

  const renderListSkeleton = () => (
    <div className="p-4 bg-white/50 rounded-xl border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );

  const renderTimelineSkeleton = () => (
    <div className="flex gap-4 p-4 animate-pulse">
      <div className="flex flex-col items-center">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-16 w-0.5 mt-2" />
      </div>
      <div className="flex-1 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );

  const renderStatsSkeleton = () => (
    <ModernCard variant="glass" className="p-6 animate-pulse">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
    </ModernCard>
  );

  const skeletonMap = {
    card: renderCardSkeleton,
    list: renderListSkeleton,
    timeline: renderTimelineSkeleton,
    stats: renderStatsSkeleton,
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
          {skeletonMap[variant]()}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
