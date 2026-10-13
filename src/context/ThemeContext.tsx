'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeToDOM(target: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (target === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Compute actual target from a given theme
  const resolveActualTheme = useCallback((mode: Theme): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('benresa-theme', newTheme);
    } catch {}

    const resolved = resolveActualTheme(newTheme);
    setActualTheme(resolved);
    applyThemeToDOM(resolved);
  }, [resolveActualTheme]);

  // Initial client mount
  useEffect(() => {
    let savedTheme: Theme = 'system';
    try {
      const stored = localStorage.getItem('benresa-theme') as Theme | null;
      if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
        savedTheme = stored;
      }
    } catch {}

    setThemeState(savedTheme);
    const resolved = resolveActualTheme(savedTheme);
    setActualTheme(resolved);
    applyThemeToDOM(resolved);
    setMounted(true);
  }, [resolveActualTheme]);

  // Listen to system changes when set to 'system'
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const nextTarget = e.matches ? 'dark' : 'light';
        setActualTheme(nextTarget);
        applyThemeToDOM(nextTarget);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    // If currently rendering dark, switch to light; if light, switch to dark
    const nextTarget: Theme = actualTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTarget);
  }, [actualTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
