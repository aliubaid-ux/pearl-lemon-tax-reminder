interface UserData {
  userType: 'self-employed' | 'company-director' | 'both';
  deadlineNotes: Record<string, string>;
  emailReminders: {
    enabled: boolean;
    email?: string;
    daysBeforeNotification: number[];
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    reminderSound: boolean;
    compactView: boolean;
    // Accessibility settings
    highContrast?: boolean;
    largeText?: boolean;
    reducedMotion?: boolean;
    screenReaderAnnouncements?: boolean;
    keyboardNavigation?: boolean;
    focusIndicators?: boolean;
  };
}

const STORAGE_KEY = 'uk-tax-calendar-data';

export const saveUserData = (data: Partial<UserData>): void => {
  try {
    const existing = loadUserData();
    const updated = { ...existing, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

export const loadUserData = (): UserData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
  
  return {
    userType: 'self-employed',
    deadlineNotes: {},
    emailReminders: {
      enabled: false,
      daysBeforeNotification: [7, 1]
    },
    preferences: {
      theme: 'system',
      reminderSound: true,
      compactView: false
    }
  };
};

export const saveDeadlineNote = (deadlineId: string, note: string): void => {
  const userData = loadUserData();
  userData.deadlineNotes[deadlineId] = note;
  saveUserData(userData);
};

export const getDeadlineNote = (deadlineId: string): string => {
  const userData = loadUserData();
  return userData.deadlineNotes[deadlineId] || '';
};

export const exportUserData = (): string => {
  return JSON.stringify(loadUserData(), null, 2);
};

export const importUserData = (data: string): boolean => {
  try {
    const parsed = JSON.parse(data);
    saveUserData(parsed);
    return true;
  } catch (error) {
    console.error('Failed to import user data:', error);
    return false;
  }
};
