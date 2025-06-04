
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

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error accessing localStorage for key ${key}:`, error);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting localStorage for key ${key}:`, error);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage for key ${key}:`, error);
    }
  }
};

// User data functions
export const loadUserData = (): UserData => {
  try {
    const stored = safeLocalStorage.getItem(USER_DATA_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure backward compatibility and proper defaults
      return {
        userType: parsed.userType || 'self-employed',
        preferences: {
          notifications: parsed.preferences?.notifications ?? true,
          emailReminders: parsed.preferences?.emailReminders ?? false,
          theme: parsed.preferences?.theme || 'system',
          highContrast: parsed.preferences?.highContrast ?? false,
          largeText: parsed.preferences?.largeText ?? false,
          reducedMotion: parsed.preferences?.reducedMotion ?? false,
          screenReaderAnnouncements: parsed.preferences?.screenReaderAnnouncements ?? true,
          keyboardNavigation: parsed.preferences?.keyboardNavigation ?? true,
          focusIndicators: parsed.preferences?.focusIndicators ?? true
        },
        emailReminders: {
          enabled: parsed.emailReminders?.enabled ?? false,
          email: parsed.emailReminders?.email || '',
          daysBeforeNotification: parsed.emailReminders?.daysBeforeNotification || [7]
        }
      };
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }
  
  // Return default data structure
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
    safeLocalStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Notes functions
export const getDeadlineNote = (deadlineId: string): string => {
  try {
    const stored = safeLocalStorage.getItem(NOTES_KEY);
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
    const stored = safeLocalStorage.getItem(NOTES_KEY);
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
    
    safeLocalStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving deadline note:', error);
  }
};

// Progress tracking functions
export const getDeadlineProgress = (deadlineId: string): number => {
  try {
    const stored = safeLocalStorage.getItem(PROGRESS_KEY);
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
    const stored = safeLocalStorage.getItem(PROGRESS_KEY);
    let progressData: Record<string, DeadlineProgress> = {};
    
    if (stored) {
      progressData = JSON.parse(stored);
    }
    
    progressData[deadlineId] = {
      id: deadlineId,
      progress: Math.max(0, Math.min(100, progress)), // Ensure progress is between 0-100
      completedSteps: progressData[deadlineId]?.completedSteps || [],
      notes: progressData[deadlineId]?.notes || '',
      lastUpdated: new Date().toISOString()
    };
    
    safeLocalStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData));
  } catch (error) {
    console.error('Error saving deadline progress:', error);
  }
};

export const getCompletedDeadlines = (): string[] => {
  try {
    const stored = safeLocalStorage.getItem(PROGRESS_KEY);
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
    const stored = safeLocalStorage.getItem(PROGRESS_KEY);
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
    safeLocalStorage.removeItem(USER_DATA_KEY);
    safeLocalStorage.removeItem(NOTES_KEY);
    safeLocalStorage.removeItem(PROGRESS_KEY);
    safeLocalStorage.removeItem('dismissed-suggestions');
    safeLocalStorage.removeItem('uk-tax-calendar-theme');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Export all data for backup
export const exportAllData = (): string => {
  try {
    const data = {
      userData: safeLocalStorage.getItem(USER_DATA_KEY),
      notes: safeLocalStorage.getItem(NOTES_KEY),
      progress: safeLocalStorage.getItem(PROGRESS_KEY),
      theme: safeLocalStorage.getItem('uk-tax-calendar-theme'),
      dismissedSuggestions: safeLocalStorage.getItem('dismissed-suggestions'),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return '{}';
  }
};
