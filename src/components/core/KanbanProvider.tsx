/**
 * Main Kanban provider component
 * Combines ThemeProvider and KanbanProvider
 */

import React from 'react';
import { KanbanProvider as KanbanContextProvider } from '../../context/KanbanContext';
import { ThemeProvider } from '../../context/ThemeContext';
import type {
  CardData,
  KanbanBoardProps,
  KanbanTheme,
  ThemeMode,
} from '../../types';
import { KanbanBoard } from './KanbanBoard';

export interface KanbanProps<T extends CardData = CardData>
  extends KanbanBoardProps<T> {
  /**
   * Custom theme
   */
  theme?: KanbanTheme;

  /**
   * Theme mode ('light' or 'dark')
   */
  themeMode?: ThemeMode;

  /**
   * Children components (optional)
   * If not provided, will render default KanbanBoard
   */
  children?: React.ReactNode;
}

/**
 * Main Kanban component with providers
 *
 * @example
 * ```tsx
 * import { Kanban } from 'react-native-kanban-board';
 *
 * function App() {
 *   const [cards, setCards] = useState(myCards);
 *
 *   return (
 *     <Kanban
 *       columns={columns}
 *       cards={cards}
 *       onCardMove={(cardId, from, to, index) => {
 *         // Handle card move
 *       }}
 *       themeMode="light"
 *     />
 *   );
 * }
 * ```
 */
export function Kanban({
  // Theme props
  theme,
  themeMode = 'light',

  // Board props
  columns,
  cards,
  onCardMove,
  onCardReorder,
  onCardPress,
  onCardLongPress,
  onColumnPress,

  // Rendering props
  renderCard,
  renderColumnHeader,
  renderEmptyColumn,
  renderColumnFooter,

  // Styling props
  style,
  columnStyle,
  columnGap,
  cardGap,
  columnWidth,

  // Behavior props
  scrollEnabled,
  dragEnabled,
  hapticFeedback,
  showsScrollIndicator,
  contentContainerPadding,

  // Children
  children,
}: KanbanProps<CardData>) {
  return (
    <ThemeProvider theme={theme} mode={themeMode}>
      <KanbanContextProvider
        columns={columns}
        cards={cards}
        onCardMove={onCardMove}
        onCardReorder={onCardReorder}
        onCardPress={onCardPress}
        onCardLongPress={onCardLongPress}
        onColumnPress={onColumnPress}
        dragEnabled={dragEnabled}
        hapticFeedback={hapticFeedback}
        columnWidth={columnWidth}
        columnGap={columnGap}
        cardGap={cardGap}
      >
        {children || (
          <KanbanBoard
            columns={columns}
            style={style}
            columnStyle={columnStyle}
            renderCard={renderCard}
            renderColumnHeader={renderColumnHeader}
            renderEmptyColumn={renderEmptyColumn}
            renderColumnFooter={renderColumnFooter}
            columnGap={columnGap}
            scrollEnabled={scrollEnabled}
            showsScrollIndicator={showsScrollIndicator}
            contentContainerPadding={contentContainerPadding}
          />
        )}
      </KanbanContextProvider>
    </ThemeProvider>
  );
}
