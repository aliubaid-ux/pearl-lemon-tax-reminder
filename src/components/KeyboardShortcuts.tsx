
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Keyboard, Search, Filter, Calendar, Download } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['⌘', 'K'], description: 'Open search', icon: Search },
        { keys: ['⌘', 'F'], description: 'Open filters', icon: Filter },
        { keys: ['Esc'], description: 'Close modals' },
      ]
    },
    {
      category: 'Quick Actions',
      items: [
        { keys: ['⌘', 'E'], description: 'Export calendar', icon: Download },
        { keys: ['⌘', 'D'], description: 'Jump to today', icon: Calendar },
        { keys: ['?'], description: 'Show shortcuts', icon: Keyboard },
      ]
    },
    {
      category: 'Calendar Navigation',
      items: [
        { keys: ['←', '→'], description: 'Navigate months' },
        { keys: ['↑', '↓'], description: 'Navigate weeks' },
        { keys: ['Space'], description: 'Select date' },
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {shortcuts.map((section, index) => (
            <div key={section.category}>
              <h3 className="font-semibold text-gray-900 mb-2">{section.category}</h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="h-4 w-4 text-gray-500" />}
                      <span className="text-sm text-gray-700">{item.description}</span>
                    </div>
                    <div className="flex gap-1">
                      {item.keys.map((key, keyIndex) => (
                        <Badge key={keyIndex} variant="outline" className="text-xs px-2 py-1">
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {index < shortcuts.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 Tip: Use these shortcuts to navigate the tax calendar more efficiently!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;
