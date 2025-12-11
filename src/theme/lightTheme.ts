/**
 * Light theme for Kanban board
 */

import type { KanbanTheme } from '../types';

export const lightTheme: KanbanTheme = {
  mode: 'light',

  colors: {
    // Board
    boardBackground: '#F5F5F7',
    boardBorder: '#E5E5EA',

    // Column
    columnBackground: '#FFFFFF',
    columnBorder: '#E5E5EA',
    columnHeaderText: '#1C1C1E',
    columnHeaderBackground: '#FFFFFF',
    columnCountBadge: '#E5E5EA',
    columnCountText: '#636366',

    // Card
    cardBackground: '#FFFFFF',
    cardBorder: '#E5E5EA',
    cardTitle: '#1C1C1E',
    cardDescription: '#636366',
    cardShadow: '#000000',

    // Drag states
    dropZoneActive: '#007AFF',
    dropZoneInactive: '#E5E5EA',
    dragOverlay: 'rgba(0, 0, 0, 0.05)',
    placeholder: '#F2F2F7',

    // Status colors (4 default columns)
    statusNew: '#3B82F6', // Blue
    statusPending: '#F59E0B', // Amber
    statusInProgress: '#8B5CF6', // Purple
    statusDone: '#10B981', // Green

    // Priority colors
    priorityLow: '#10B981',
    priorityMedium: '#F59E0B',
    priorityHigh: '#EF4444',

    // Text
    textPrimary: '#1C1C1E',
    textSecondary: '#636366',
    textTertiary: '#AEAEB2',

    // UI
    divider: '#E5E5EA',
    overlay: 'rgba(0, 0, 0, 0.5)',
    disabled: '#AEAEB2',
  },

  spacing: {
    columnGap: 16,
    cardGap: 12,
    columnPadding: 16,
    cardPadding: 12,
    headerPadding: 16,
    footerPadding: 16,
  },

  borderRadius: {
    column: 12,
    card: 8,
    badge: 4,
    button: 8,
  },

  typography: {
    columnTitle: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    cardDescription: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18,
    },
    badge: {
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 16,
    },
    count: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 16,
    },
  },

  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    cardDragging: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    column: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
  },

  animation: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
    duration: 250,
  },
};
