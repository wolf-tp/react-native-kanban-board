/**
 * Constants for Kanban board
 */

import type { ColumnConfig } from '../types';

/**
 * Default column width
 */
export const DEFAULT_COLUMN_WIDTH = 280;

/**
 * Default column gap
 */
export const DEFAULT_COLUMN_GAP = 16;

/**
 * Default card gap
 */
export const DEFAULT_CARD_GAP = 12;

/**
 * Default board padding
 */
export const DEFAULT_BOARD_PADDING = 16;

/**
 * Minimum drag distance to start dragging (prevents accidental drags)
 */
export const MIN_DRAG_DISTANCE = 5;

/**
 * Auto scroll edge threshold (px from edge to trigger scroll)
 */
export const AUTO_SCROLL_THRESHOLD = 60;

/**
 * Auto scroll speed (px per frame)
 */
export const AUTO_SCROLL_SPEED = 10;

/**
 * Default 4 columns for Kanban board
 */
export const DEFAULT_COLUMNS: ColumnConfig[] = [
  {
    id: 'new',
    title: 'New',
    color: '#3B82F6',
  },
  {
    id: 'pending',
    title: 'Pending',
    color: '#F59E0B',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    color: '#8B5CF6',
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10B981',
  },
];

/**
 * Z-index layers
 */
export const Z_INDEX = {
  CARD: 1,
  COLUMN_HEADER: 2,
  DRAG_OVERLAY: 100,
  PLACEHOLDER: 0,
} as const;

/**
 * Card animation scale values
 */
export const CARD_SCALE = {
  NORMAL: 1,
  PRESSED: 0.98,
  DRAGGING: 1.05,
} as const;

/**
 * Haptic feedback types
 */
export const HAPTIC_FEEDBACK = {
  DRAG_START: 'impactMedium',
  DRAG_END: 'impactLight',
  DROP_SUCCESS: 'notificationSuccess',
  DROP_ERROR: 'notificationError',
} as const;
