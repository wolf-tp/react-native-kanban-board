/**
 * React Native Kanban Board Library
 * A performant drag-and-drop Kanban board for React Native
 *
 * @packageDocumentation
 */

// Main component
export { Kanban } from './components/core/KanbanProvider';

// Core components
export { KanbanBoard } from './components/core/KanbanBoard';
export { KanbanCard } from './components/core/KanbanCard';
export { KanbanColumn } from './components/core/KanbanColumn';

// Context providers
export { KanbanProvider } from './context/KanbanContext';
export { ThemeProvider } from './context/ThemeContext';

// Hooks
export { useHaptic } from './hooks/useHaptic';
export { useKanban } from './hooks/useKanban';
export { useTheme } from './hooks/useTheme';

// Theme
export { createTheme, darkTheme, getDefaultTheme, lightTheme } from './theme';

// Utils
export {
  canMoveToColumn,
  getCardIndexInColumn,
  getColumnCards,
  moveCard,
  reorderCards,
} from './utils/reorder';

export {
  calculateDropIndex,
  doRectsOverlap,
  getDistance,
  getOverlapArea,
  getRectCenter,
  isPointInRect,
} from './utils/collision';

export {
  calculateBoardWidth,
  calculateCardY,
  calculateColumnHeight,
  calculateColumnX,
  groupCardsByColumn,
  sortCardsByPosition,
} from './utils/layout';

// Constants
export {
  AUTO_SCROLL_SPEED,
  AUTO_SCROLL_THRESHOLD,
  CARD_SCALE,
  DEFAULT_BOARD_PADDING,
  DEFAULT_CARD_GAP,
  DEFAULT_COLUMN_GAP,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_COLUMNS,
  HAPTIC_FEEDBACK,
  MIN_DRAG_DISTANCE,
  Z_INDEX,
} from './constants';

// Animation configs
export {
  CARD_ANIMATION,
  FADE_TIMING,
  PLACEHOLDER_ANIMATION,
  QUICK_SPRING,
  QUICK_TIMING,
  SCROLL_ANIMATION,
  SLOW_SPRING,
  SMOOTH_SPRING,
  SMOOTH_TIMING,
} from './animations/configs';

export {
  animateCardDrop,
  animateCardPickup,
  animateCardsShift,
  animateCardToPosition,
  animatePlaceholderAppear,
  animatePlaceholderDisappear,
} from './animations/cardAnimations';

// Types
export type {
  // Card
  CardData,
  CardLayout,
  // Events
  CardMoveEvent,
  CardPosition,
  CardPressEvent,
  CardReorderEvent,
  // Column
  ColumnConfig,
  ColumnLayout,
  ColumnPressEvent,
  DeepPartial,
  DragEndEvent,
  DragStartEvent,
  DragState,
  // Board
  KanbanBoardProps,
  // Theme
  KanbanTheme,
  ThemeMode,
  ThemeOverride,
} from './types';

export type { KanbanContextValue } from './context/KanbanContext';
export type { ThemeContextValue } from './context/ThemeContext';
