/**
 * Layout calculation utilities
 */

import type { CardData } from '../types';

/**
 * Calculate total board width
 */
export function calculateBoardWidth(
  columnCount: number,
  columnWidth: number,
  columnGap: number,
  padding: number
): number {
  return (
    columnCount * columnWidth + (columnCount - 1) * columnGap + padding * 2
  );
}

/**
 * Calculate column X position
 */
export function calculateColumnX(
  columnIndex: number,
  columnWidth: number,
  columnGap: number,
  padding: number
): number {
  return padding + columnIndex * (columnWidth + columnGap);
}

/**
 * Calculate card Y position within column
 */
export function calculateCardY(
  cardIndex: number,
  cardHeights: number[],
  cardGap: number,
  columnPadding: number
): number {
  let y = columnPadding;

  for (let i = 0; i < cardIndex; i++) {
    const height = cardHeights[i];
    if (height !== undefined) {
      y += height + cardGap;
    }
  }

  return y;
}

/**
 * Calculate total column content height
 */
export function calculateColumnHeight(
  cardHeights: number[],
  cardGap: number,
  columnPadding: number
): number {
  if (cardHeights.length === 0) return columnPadding * 2;

  const totalCardHeight = cardHeights.reduce(
    (sum, height) => sum + (height || 0),
    0
  );
  const totalGapHeight = (cardHeights.length - 1) * cardGap;

  return totalCardHeight + totalGapHeight + columnPadding * 2;
}

/**
 * Group cards by column
 */
export function groupCardsByColumn<T extends CardData>(
  cards: T[]
): Map<string, T[]> {
  const groups = new Map<string, T[]>();

  for (const card of cards) {
    const columnCards = groups.get(card.columnId) || [];
    columnCards.push(card);
    groups.set(card.columnId, columnCards);
  }

  return groups;
}

/**
 * Sort cards by their position in column
 * (Assumes cards array is already ordered)
 */
export function sortCardsByPosition<T extends CardData>(
  cards: T[],
  columnId: string
): T[] {
  return cards.filter((card) => card.columnId === columnId);
}
