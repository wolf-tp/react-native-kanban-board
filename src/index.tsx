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
export { KanbanColumn } from './components/core/KanbanColumn';
export { KanbanCard } from './components/core/KanbanCard';

// Context providers
export { ThemeProvider } from './context/ThemeContext';
export { KanbanProvider } from './context/KanbanContext';

// Hooks
export { useTheme } from './hooks/useTheme';
export { useKanban } from './hooks/useKanban';
export { useHaptic } from './hooks/useHaptic';

// Theme
export { lightTheme, darkTheme, createTheme, getDefaultTheme } from './theme';

// Utils
export {
  moveCard,
  reorderCards,
  getColumnCards,
  getCardIndexInColumn,
  canMoveToColumn,
} from './utils/reorder';

export {
  isPointInRect,
  doRectsOverlap,
  getOverlapArea,
  getDistance,
  getRectCenter,
  calculateDropIndex,
} from './utils/collision';

export {
  calculateBoardWidth,
  calculateColumnX,
  calculateCardY,
  calculateColumnHeight,
  groupCardsByColumn,
  sortCardsByPosition,
} from './utils/layout';

// Constants
export {
  DEFAULT_COLUMNS,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_COLUMN_GAP,
  DEFAULT_CARD_GAP,
  DEFAULT_BOARD_PADDING,
  MIN_DRAG_DISTANCE,
  AUTO_SCROLL_THRESHOLD,
  AUTO_SCROLL_SPEED,
  Z_INDEX,
  CARD_SCALE,
  HAPTIC_FEEDBACK,
} from './constants';

// Animation configs
export {
  SMOOTH_SPRING,
  QUICK_SPRING,
  SLOW_SPRING,
  SMOOTH_TIMING,
  QUICK_TIMING,
  FADE_TIMING,
  CARD_ANIMATION,
  PLACEHOLDER_ANIMATION,
  SCROLL_ANIMATION,
} from './animations/configs';

export {
  animateCardPickup,
  animateCardDrop,
  animateCardToPosition,
  animatePlaceholderAppear,
  animatePlaceholderDisappear,
  animateCardsShift,
} from './animations/cardAnimations';

// Types
export type {
  // Board
  KanbanBoardProps,
  DragState,

  // Card
  CardData,
  CardPosition,
  CardLayout,

  // Column
  ColumnConfig,
  ColumnLayout,

  // Events
  CardMoveEvent,
  CardReorderEvent,
  CardPressEvent,
  ColumnPressEvent,
  DragStartEvent,
  DragEndEvent,

  // Theme
  KanbanTheme,
  ThemeMode,
  ThemeOverride,
  DeepPartial,

  // Component props
  KanbanProps,
  KanbanCardProps,
  KanbanColumnProps,
} from './types';

export type { ThemeContextValue } from './context/ThemeContext';
export type { KanbanContextValue } from './context/KanbanContext';

