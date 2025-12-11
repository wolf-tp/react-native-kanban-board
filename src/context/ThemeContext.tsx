/**
 * Theme context for Kanban board
 */

import React, { createContext, useMemo } from 'react';
import type { KanbanTheme, ThemeMode } from '../types';
import { lightTheme, darkTheme } from '../theme';

export interface ThemeContextValue {
  theme: KanbanTheme;
  mode: ThemeMode;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  mode: 'light',
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: KanbanTheme;
  mode?: ThemeMode;
}

/**
 * Theme provider component
 */
export function ThemeProvider({
  children,
  theme: customTheme,
  mode = 'light',
}: ThemeProviderProps) {
  const value = useMemo<ThemeContextValue>(() => {
    // Use custom theme if provided, otherwise use default theme for mode
    const theme = customTheme || (mode === 'dark' ? darkTheme : lightTheme);

    return {
      theme,
      mode: theme.mode,
    };
  }, [customTheme, mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
