/**
 * Theme types for Kanban board
 */

export type ThemeMode = 'light' | 'dark';

export interface KanbanTheme {
  /**
   * Theme mode
   */
  mode: ThemeMode;

  /**
   * Color palette
   */
  colors: {
    // Board colors
    boardBackground: string;
    boardBorder: string;

    // Column colors
    columnBackground: string;
    columnBorder: string;
    columnHeaderText: string;
    columnHeaderBackground: string;
    columnCountBadge: string;
    columnCountText: string;

    // Card colors
    cardBackground: string;
    cardBorder: string;
    cardTitle: string;
    cardDescription: string;
    cardShadow: string;

    // Drag states
    dropZoneActive: string;
    dropZoneInactive: string;
    dragOverlay: string;
    placeholder: string;

    // Status colors (for default 4 columns)
    statusNew: string;
    statusPending: string;
    statusInProgress: string;
    statusDone: string;

    // Priority colors
    priorityLow: string;
    priorityMedium: string;
    priorityHigh: string;

    // Text colors
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;

    // UI elements
    divider: string;
    overlay: string;
    disabled: string;
  };

  /**
   * Spacing values
   */
  spacing: {
    columnGap: number;
    cardGap: number;
    columnPadding: number;
    cardPadding: number;
    headerPadding: number;
    footerPadding: number;
  };

  /**
   * Border radius values
   */
  borderRadius: {
    column: number;
    card: number;
    badge: number;
    button: number;
  };

  /**
   * Typography
   */
  typography: {
    columnTitle: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700' | 'bold';
      lineHeight: number;
    };
    cardTitle: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700' | 'bold';
      lineHeight: number;
    };
    cardDescription: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700' | 'bold';
      lineHeight: number;
    };
    badge: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700' | 'bold';
      lineHeight: number;
    };
    count: {
      fontSize: number;
      fontWeight: '400' | '500' | '600' | '700' | 'bold';
      lineHeight: number;
    };
  };

  /**
   * Shadow configuration
   */
  shadows: {
    card: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    cardDragging: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
    column: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };

  /**
   * Animation configuration
   */
  animation: {
    damping: number;
    stiffness: number;
    mass: number;
    duration: number;
  };
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeOverride = DeepPartial<KanbanTheme>;
