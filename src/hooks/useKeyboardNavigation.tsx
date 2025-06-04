
import { useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface KeyboardShortcuts {
  'Ctrl+P': () => void;
  'Ctrl+E': () => void;
  'Ctrl+S': () => void;
  'Ctrl+F': () => void;
  'Escape': () => void;
  'ArrowLeft': () => void;
  'ArrowRight': () => void;
  'Enter': () => void;
  '?': () => void;
}

export const useKeyboardNavigation = (shortcuts: Partial<KeyboardShortcuts>) => {
  const { toast } = useToast();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    const isCtrl = event.ctrlKey || event.metaKey;
    
    let shortcutKey = '';
    
    if (isCtrl) {
      shortcutKey = `Ctrl+${key.toUpperCase()}`;
    } else {
      shortcutKey = key;
    }

    const handler = shortcuts[shortcutKey as keyof KeyboardShortcuts];
    
    if (handler) {
      event.preventDefault();
      handler();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const showShortcuts = useCallback(() => {
    const availableShortcuts = Object.keys(shortcuts)
      .map(key => key.replace('Ctrl+', '⌘'))
      .join(', ');
    
    toast({
      title: "Keyboard Shortcuts",
      description: `Available: ${availableShortcuts}`,
      duration: 5000,
    });
  }, [shortcuts, toast]);

  return { showShortcuts };
};

// Predefined shortcut sets
export const defaultShortcuts = {
  'Ctrl+P': () => window.print(),
  'Ctrl+F': () => {
    const searchInput = document.querySelector('input[placeholder*="search"], input[type="search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  },
  '?': () => {} // Will be overridden by component
};
