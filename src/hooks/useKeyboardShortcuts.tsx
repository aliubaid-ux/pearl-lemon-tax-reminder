
import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onShowSearch: () => void;
  onShowFilters: () => void;
  onShowShortcuts: () => void;
}

export const useKeyboardShortcuts = ({
  onShowSearch,
  onShowFilters,
  onShowShortcuts,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            onShowSearch();
            break;
          case 'f':
            e.preventDefault();
            onShowFilters();
            break;
        }
      }
      if (e.key === '?') {
        e.preventDefault();
        onShowShortcuts();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onShowSearch, onShowFilters, onShowShortcuts]);
};
