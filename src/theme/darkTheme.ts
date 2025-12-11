/**
 * Dark theme for Kanban board
 */

import type { KanbanTheme } from '../types';

export const darkTheme: KanbanTheme = {
  mode: 'dark',

  colors: {
    // Board
    boardBackground: '#000000',
    boardBorder: '#2C2C2E',

    // Column
    columnBackground: '#1C1C1E',
    columnBorder: '#2C2C2E',
    columnHeaderText: '#FFFFFF',
    columnHeaderBackground: '#1C1C1E',
    columnCountBadge: '#2C2C2E',
    columnCountText: '#AEAEB2',

    // Card
    cardBackground: '#2C2C2E',
    cardBorder: '#3A3A3C',
    cardTitle: '#FFFFFF',
    cardDescription: '#AEAEB2',
    cardShadow: '#000000',

    // Drag states
    dropZoneActive: '#0A84FF',
    dropZoneInactive: '#3A3A3C',
    dragOverlay: 'rgba(255, 255, 255, 0.05)',
    placeholder: '#1C1C1E',

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
    textPrimary: '#FFFFFF',
    textSecondary: '#AEAEB2',
    textTertiary: '#636366',

    // UI
    divider: '#3A3A3C',
    overlay: 'rgba(0, 0, 0, 0.7)',
    disabled: '#636366',
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
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    cardDragging: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 8,
    },
    column: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
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
