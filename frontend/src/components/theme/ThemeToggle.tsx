//componets/theme/ThemeToggle.tsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Toggle } from '../ui/toggle';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme} 
      aria-label="Toggle theme"
      className="p-2 rounded-full border-none"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Toggle>
  );
}
