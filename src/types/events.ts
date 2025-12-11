/**
 * Event types for Kanban board
 */

import type { CardData } from './card';
import type { ColumnConfig } from './column';

export interface CardMoveEvent {
  cardId: string;
  card: CardData;
  fromColumnId: string;
  toColumnId: string;
  fromIndex: number;
  toIndex: number;
  timestamp: number;
}

export interface CardReorderEvent {
  cardId: string;
  card: CardData;
  columnId: string;
  fromIndex: number;
  toIndex: number;
  timestamp: number;
}

export interface CardPressEvent {
  card: CardData;
  columnId: string;
  index: number;
}

export interface ColumnPressEvent {
  column: ColumnConfig;
  cardCount: number;
}

export interface DragStartEvent {
  cardId: string;
  card: CardData;
  columnId: string;
  index: number;
  position: { x: number; y: number };
}

export interface DragEndEvent {
  cardId: string;
  card: CardData;
  fromColumnId: string;
  toColumnId: string;
  fromIndex: number;
  toIndex: number;
  cancelled: boolean;
}
