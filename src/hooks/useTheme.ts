/**
 * Hook to access theme context
 */

import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '../context/ThemeContext';

/**
 * Access theme context
 *
 * @returns Theme context value
 *
 * @example
 * ```tsx
 * const { theme, mode } = useTheme();
 *
 * <View style={{ backgroundColor: theme.colors.cardBackground }}>
 *   <Text style={{ color: theme.colors.textPrimary }}>Hello</Text>
 * </View>
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
