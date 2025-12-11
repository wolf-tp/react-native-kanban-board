/**
 * Board types for Kanban
 */

import type { StyleProp, ViewStyle } from 'react-native';
import type { CardData } from './card';
import type { ColumnConfig } from './column';

export interface DragState {
  /**
   * Currently dragging card ID
   */
  activeCardId: string | null;

  /**
   * Original column ID where drag started
   */
  activeColumnId: string | null;

  /**
   * Current target column ID
   */
  targetColumnId: string | null;

  /**
   * Target index in the column
   */
  targetIndex: number;

  /**
   * Current drag position
   */
  position: {
    x: number;
    y: number;
  };
}

export interface KanbanBoardProps<T extends CardData = CardData> {
  /**
   * Column configurations
   */
  columns: ColumnConfig[];

  /**
   * Array of cards to display
   */
  cards: T[];

  /**
   * Callback when card is moved between columns
   */
  onCardMove?: (
    cardId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => void;

  /**
   * Callback when card is reordered within same column
   */
  onCardReorder?: (columnId: string, fromIndex: number, toIndex: number) => void;

  /**
   * Callback when card is pressed
   */
  onCardPress?: (card: T) => void;

  /**
   * Callback when card is long pressed
   */
  onCardLongPress?: (card: T) => void;

  /**
   * Callback when column header is pressed
   */
  onColumnPress?: (column: ColumnConfig) => void;

  /**
   * Custom card renderer
   */
  renderCard?: (card: T, isDragging: boolean) => React.ReactNode;

  /**
   * Custom column header renderer
   */
  renderColumnHeader?: (
    column: ColumnConfig,
    cardCount: number
  ) => React.ReactNode;

  /**
   * Custom empty column renderer
   */
  renderEmptyColumn?: (column: ColumnConfig) => React.ReactNode;

  /**
   * Custom column footer renderer (e.g., add button)
   */
  renderColumnFooter?: (column: ColumnConfig) => React.ReactNode;

  /**
   * Board container style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Column container style
   */
  columnStyle?: StyleProp<ViewStyle>;

  /**
   * Card container style
   */
  cardStyle?: StyleProp<ViewStyle>;

  /**
   * Gap between columns (default: 16)
   */
  columnGap?: number;

  /**
   * Gap between cards (default: 12)
   */
  cardGap?: number;

  /**
   * Column width (default: 280)
   */
  columnWidth?: number;

  /**
   * Enable horizontal scrolling (default: true)
   */
  scrollEnabled?: boolean;

  /**
   * Enable drag and drop (default: true)
   */
  dragEnabled?: boolean;

  /**
   * Enable haptic feedback (default: true)
   */
  hapticFeedback?: boolean;

  /**
   * Show scroll indicators (default: false)
   */
  showsScrollIndicator?: boolean;

  /**
   * Content container padding
   */
  contentContainerPadding?: number;
}
