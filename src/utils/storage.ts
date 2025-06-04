
interface UserData {
  userType: 'self-employed' | 'company-director' | 'both';
  preferences?: {
    notifications: boolean;
    emailReminders: boolean;
    theme: 'light' | 'dark' | 'system';
    // Accessibility settings
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
    screenReaderAnnouncements?: boolean;
    keyboardNavigation?: boolean;
    focusIndicators?: boolean;
  };
  // Email reminder settings
  emailReminders?: {
    enabled: boolean;
    email?: string;
    daysBeforeNotification: number[];
  };
}

interface DeadlineNote {
  id: string;
  content: string;
  lastUpdated: string;
}

interface DeadlineProgress {
  id: string;
  progress: number;
  completedSteps: string[];
  notes: string;
  lastUpdated: string;
}

const USER_DATA_KEY = 'uk-tax-calendar-user-data';
const NOTES_KEY = 'uk-tax-calendar-notes';
const PROGRESS_KEY = 'uk-tax-calendar-progress';

// User data functions
export const loadUserData = (): UserData => {
  try {
    const stored = localStorage.getItem(USER_DATA_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  
  return {
    userType: 'self-employed',
    preferences: {
      notifications: true,
      emailReminders: false,
      theme: 'system',
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReaderAnnouncements: true,
      keyboardNavigation: true,
      focusIndicators: true
    },
    emailReminders: {
      enabled: false,
      email: '',
      daysBeforeNotification: [7]
    }
  };
};

export const saveUserData = (userData: UserData): void => {
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Notes functions
export const getDeadlineNote = (deadlineId: string): string => {
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    if (stored) {
      const notes: Record<string, DeadlineNote> = JSON.parse(stored);
      return notes[deadlineId]?.content || '';
    }
  } catch (error) {
    console.error('Error loading deadline note:', error);
  }
  return '';
};

export const saveDeadlineNote = (deadlineId: string, content: string): void => {
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    let notes: Record<string, DeadlineNote> = {};
    
    if (stored) {
      notes = JSON.parse(stored);
    }
    
    if (content.trim()) {
      notes[deadlineId] = {
        id: deadlineId,
        content: content.trim(),
        lastUpdated: new Date().toISOString()
      };
    } else {
      delete notes[deadlineId];
    }
    
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving deadline note:', error);
  }
};

// Progress tracking functions
export const getDeadlineProgress = (deadlineId: string): number => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      const progress: Record<string, DeadlineProgress> = JSON.parse(stored);
      return progress[deadlineId]?.progress || 0;
    }
  } catch (error) {
    console.error('Error loading deadline progress:', error);
  }
  return 0;
};

export const setDeadlineProgress = (deadlineId: string, progress: number): void => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    let progressData: Record<string, DeadlineProgress> = {};
    
    if (stored) {
      progressData = JSON.parse(stored);
    }
    
    progressData[deadlineId] = {
      id: deadlineId,
      progress,
      completedSteps: progressData[deadlineId]?.completedSteps || [],
      notes: progressData[deadlineId]?.notes || '',
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData));
  } catch (error) {
    console.error('Error saving deadline progress:', error);
  }
};

export const getCompletedDeadlines = (): string[] => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      const progress: Record<string, DeadlineProgress> = JSON.parse(stored);
      return Object.keys(progress).filter(id => progress[id].progress === 100);
    }
  } catch (error) {
    console.error('Error loading completed deadlines:', error);
  }
  return [];
};

export const getAllProgress = (): Record<string, DeadlineProgress> => {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading all progress:', error);
  }
  return {};
};

// Clear all data (for reset functionality)
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(NOTES_KEY);
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem('dismissed-suggestions');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
