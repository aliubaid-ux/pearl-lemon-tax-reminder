
interface DeadlineProgress {
  id: string;
  progress: number;
  completedSteps: string[];
  notes: string;
  lastUpdated: string;
}

const PROGRESS_STORAGE_KEY = 'tax-calendar-progress';

export const getDeadlineProgress = (deadlineId: string): number => {
  const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!stored) return 0;
  
  try {
    const progress: Record<string, DeadlineProgress> = JSON.parse(stored);
    return progress[deadlineId]?.progress || 0;
  } catch {
    return 0;
  }
};

export const setDeadlineProgress = (deadlineId: string, progress: number): void => {
  const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
  let progressData: Record<string, DeadlineProgress> = {};
  
  if (stored) {
    try {
      progressData = JSON.parse(stored);
    } catch {
      progressData = {};
    }
  }
  
  progressData[deadlineId] = {
    id: deadlineId,
    progress,
    completedSteps: progressData[deadlineId]?.completedSteps || [],
    notes: progressData[deadlineId]?.notes || '',
    lastUpdated: new Date().toISOString()
  };
  
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
};

export const getCompletedDeadlines = (): string[] => {
  const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const progress: Record<string, DeadlineProgress> = JSON.parse(stored);
    return Object.keys(progress).filter(id => progress[id].progress === 100);
  } catch {
    return [];
  }
};

export const getAllProgress = (): Record<string, DeadlineProgress> => {
  const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (!stored) return {};
  
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
};
