/**
 * Hook to access Kanban context
 */

import { useContext } from 'react';
import {
  KanbanContext,
  type KanbanContextValue,
} from '../context/KanbanContext';
import type { CardData } from '../types';

/**
 * Access Kanban board context
 *
 * @returns Kanban context value
 *
 * @example
 * ```tsx
 * const { cards, columns, isDragging } = useKanban();
 * ```
 */
export function useKanban<
  T extends CardData = CardData
>(): KanbanContextValue<T> {
  const context = useContext(KanbanContext);

  if (!context) {
    throw new Error('useKanban must be used within KanbanProvider');
  }

  return context as any as KanbanContextValue<T>;
}
