'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-full border border-border/40 bg-background/80 backdrop-blur-sm"
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  try {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative h-9 w-9 rounded-full border border-border/40 bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        <Sun className={`h-4 w-4 transition-all duration-300 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon className={`absolute h-4 w-4 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      </Button>
    );
  } catch (error) {
    // Fallback if ThemeProvider is not available
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-full border border-border/40 bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
        onClick={() => {
          // Simple theme toggle without context
          const isDark = document.documentElement.classList.contains('dark');
          if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('elrahama-theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('elrahama-theme', 'dark');
          }
        }}
      >
        <Sun className="h-4 w-4 transition-all duration-300" />
        <Moon className="absolute h-4 w-4 transition-all duration-300 opacity-0" />
      </Button>
    );
  }
}
