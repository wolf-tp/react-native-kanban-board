/**
 * Utility functions for reordering cards
 */

import type { CardData } from '../types';

/**
 * Reorder cards within the same column
 */
export function reorderCards<T extends CardData>(
  cards: T[],
  columnId: string,
  fromIndex: number,
  toIndex: number
): T[] {
  // Filter cards in the target column
  const columnCards = cards.filter((card) => card.columnId === columnId);
  const otherCards = cards.filter((card) => card.columnId !== columnId);

  // Reorder within column
  const [movedCard] = columnCards.splice(fromIndex, 1);
  columnCards.splice(toIndex, 0, movedCard as T);

  // Combine and return
  return [...otherCards, ...columnCards];
}

/**
 * Move card between columns
 */
export function moveCard<T extends CardData>(
  cards: T[],
  cardId: string,
  toColumnId: string,
  toIndex: number
): T[] {
  const cardIndex = cards.findIndex((card) => card.id === cardId);
  if (cardIndex === -1) return cards;

  const card = cards[cardIndex];
  if (!card) return cards;

  const fromColumnId = card.columnId;

  // If same column, use reorder
  if (fromColumnId === toColumnId) {
    const columnCards = cards.filter((c) => c.columnId === toColumnId);
    const currentIndex = columnCards.findIndex((c) => c.id === cardId);
    return reorderCards(cards, toColumnId, currentIndex, toIndex);
  }

  // Remove card from old position
  const newCards = cards.filter((c) => c.id !== cardId);

  // Update card's columnId
  const updatedCard = { ...card, columnId: toColumnId } as T;

  // Get cards in target column
  const targetColumnCards = newCards.filter((c) => c.columnId === toColumnId);
  const otherCards = newCards.filter((c) => c.columnId !== toColumnId);

  // Insert at specified index
  targetColumnCards.splice(toIndex, 0, updatedCard);

  return [...otherCards, ...targetColumnCards];
}

/**
 * Get cards for a specific column
 */
export function getColumnCards<T extends CardData>(
  cards: T[],
  columnId: string
): T[] {
  return cards.filter((card) => card.columnId === columnId);
}

/**
 * Get card index within its column
 */
export function getCardIndexInColumn<T extends CardData>(
  cards: T[],
  cardId: string
): number {
  const card = cards.find((c) => c.id === cardId);
  if (!card) return -1;

  const columnCards = getColumnCards(cards, card.columnId);
  return columnCards.findIndex((c) => c.id === cardId);
}

/**
 * Check if card can be moved to column
 */
export function canMoveToColumn<T extends CardData>(
  card: T,
  targetColumnId: string,
  columns: Array<{ id: string; acceptFrom?: string[]; maxCards?: number }>,
  cards: T[]
): boolean {
  const targetColumn = columns.find((col) => col.id === targetColumnId);
  if (!targetColumn) return false;

  // Check acceptFrom restriction
  if (
    targetColumn.acceptFrom &&
    !targetColumn.acceptFrom.includes(card.columnId)
  ) {
    return false;
  }

  // Check maxCards restriction
  if (targetColumn.maxCards !== undefined) {
    const targetColumnCards = getColumnCards(cards, targetColumnId);
    // If moving within same column, don't count
    if (card.columnId !== targetColumnId) {
      if (targetColumnCards.length >= targetColumn.maxCards) {
        return false;
      }
    }
  }

  return true;
}
