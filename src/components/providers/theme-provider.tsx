'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'elrahama-ui-theme',
}: ThemeProviderProps) {
  // سميت الـ setter باسم مختلف علشان نتجنب أي لبس
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // اقرأ من localStorage بعد التركيب فقط
  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(storageKey) as Theme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored);
      }
    } catch (err) {
      // متسجل كتحذير بدل throw علشان ما يكسرش React error overlay
      console.warn('ThemeProvider: cannot access localStorage on mount', err);
    }
  }, [storageKey]);

  // طبّق الكلاس المناسب على <html> عند تغيّر الثيم
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    const apply = (t: Theme) => {
      if (t === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(prefersDark ? 'dark' : 'light');
      } else {
        root.classList.add(t);
      }
    };

    apply(theme);

    // لو الثيم system تحدّثه لو تفضيل النظام اتغير
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => theme === 'system' && apply('system');
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [theme, mounted]);

  // دالة تغيير الثيم — ما تلمسش localStorage قبل ما نركّب
  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (!mounted || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, t);
    } catch (err) {
      console.warn('ThemeProvider: cannot write to localStorage', err);
    }
  };

  const value = useMemo<ThemeProviderState>(() => ({ theme, setTheme }), [theme]);

  // لتفادي أي mismatch أثناء الـ SSR
  if (!mounted) {
    return <>{children}</>; // نعرض الأطفال بدون تطبيق الثيم لتجنب أخطاء hydration
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeProviderContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
