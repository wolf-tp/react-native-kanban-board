/**
 * Theme factory for creating custom themes
 */

import type { KanbanTheme, ThemeMode, ThemeOverride } from '../types';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

/**
 * Deep merge helper
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T {
  const output = { ...target };

  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        output[key] = deepMerge(
          target[key] as Record<string, any>,
          source[key] as Record<string, any>
        ) as T[Extract<keyof T, string>];
      } else {
        output[key] = source[key] as T[Extract<keyof T, string>];
      }
    }
  }

  return output;
}

/**
 * Create a custom theme by extending base theme
 *
 * @param mode - Base theme mode ('light' or 'dark')
 * @param overrides - Theme overrides
 * @returns Custom theme
 *
 * @example
 * ```tsx
 * const customTheme = createTheme('light', {
 *   colors: {
 *     statusNew: '#FF5733',
 *     statusDone: '#00C853',
 *   },
 *   animation: {
 *     damping: 15,
 *   },
 * });
 * ```
 */
export function createTheme(
  mode: ThemeMode = 'light',
  overrides?: ThemeOverride
): KanbanTheme {
  const baseTheme = mode === 'dark' ? darkTheme : lightTheme;

  if (!overrides) {
    return baseTheme;
  }

  return deepMerge(baseTheme, overrides as Partial<KanbanTheme>);
}

/**
 * Get default theme for mode
 */
export function getDefaultTheme(mode: ThemeMode): KanbanTheme {
  return mode === 'dark' ? darkTheme : lightTheme;
}
