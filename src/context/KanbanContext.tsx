/**
 * Kanban board context
 */

import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
import type {
  CardData,
  ColumnConfig,
  ColumnLayout,
  DragState,
  KanbanBoardProps,
} from '../types';

export interface KanbanContextValue<T extends CardData = CardData> {
  // Data
  columns: ColumnConfig[];
  cards: T[];

  // Layout tracking
  columnLayouts: Map<string, ColumnLayout>;
  registerColumnLayout: (columnId: string, layout: ColumnLayout) => void;
  cardLayouts: Map<string, ColumnLayout>;
  registerCardLayout: (cardId: string, layout: ColumnLayout) => void;

  // Scroll offset ref for performance (no rerenders)
  scrollOffsetRef: React.MutableRefObject<{ x: number; y: number }>;

  // Column state
  collapsedColumns: Set<string>;
  toggleColumnCollapse: (columnId: string) => void;
  isColumnCollapsed: (columnId: string) => boolean;

  // Drag state
  dragState: DragState;
  isDragging: boolean;

  // Overlay state for proper drag rendering (Overlay Pattern)
  draggingOverlay: {
    card: T | null;
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  updateDraggingOverlay: (
    card: T | null,
    position: { x: number; y: number },
    size?: { width: number; height: number }
  ) => void;

  // Drag actions
  startDrag: (
    cardId: string,
    columnId: string,
    position: { x: number; y: number }
  ) => void;
  updateDrag: (
    position: { x: number; y: number },
    targetColumnId?: string,
    targetIndex?: number
  ) => void;
  endDrag: (targetColumnId?: string, targetIndex?: number) => void;
  cancelDrag: () => void;

  // Card actions
  moveCardAction: (cardId: string, toColumnId: string, toIndex: number) => void;
  reorderCardAction: (
    columnId: string,
    fromIndex: number,
    toIndex: number
  ) => void;

  // Callbacks
  onCardPress?: (card: T) => void;
  onCardLongPress?: (card: T) => void;
  onColumnPress?: (column: ColumnConfig) => void;

  // Config
  dragEnabled: boolean;
  hapticFeedback: boolean;
  columnWidth: number;
  columnGap: number;
  cardGap: number;
}

const initialDragState: DragState = {
  activeCardId: null,
  activeColumnId: null,
  targetColumnId: null,
  targetIndex: 0,
  position: { x: 0, y: 0 },
};

export const KanbanContext = createContext<KanbanContextValue | null>(null);

export interface KanbanProviderProps<T extends CardData = CardData> {
  children: React.ReactNode;
  columns: ColumnConfig[];
  cards: T[];
  onCardMove?: KanbanBoardProps<T>['onCardMove'];
  onCardReorder?: KanbanBoardProps<T>['onCardReorder'];
  onCardPress?: KanbanBoardProps<T>['onCardPress'];
  onCardLongPress?: KanbanBoardProps<T>['onCardLongPress'];
  onColumnPress?: KanbanBoardProps<T>['onColumnPress'];
  dragEnabled?: boolean;
  hapticFeedback?: boolean;
  columnWidth?: number;
  columnGap?: number;
  cardGap?: number;
}

/**
 * Kanban provider component
 */
export function KanbanProvider<T extends CardData = CardData>({
  children,
  columns,
  cards,
  onCardMove,
  onCardReorder,
  onCardPress,
  onCardLongPress,
  onColumnPress,
  dragEnabled = true,
  hapticFeedback = true,
  columnWidth = 280,
  columnGap = 16,
  cardGap = 12,
}: KanbanProviderProps<T>) {
  const [dragState, setDragState] = useState<DragState>(initialDragState);
  const [columnLayouts, setColumnLayouts] = useState<Map<string, ColumnLayout>>(
    new Map()
  );
  const [cardLayouts, setCardLayouts] = useState<Map<string, ColumnLayout>>(
    new Map()
  );
  const [collapsedColumns, setCollapsedColumns] = useState<Set<string>>(
    new Set(columns.filter((col) => col.collapsed).map((col) => col.id))
  );
  const [draggingOverlay, setDraggingOverlay] = useState<{
    card: T | null;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>({
    card: null,
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
  });

  // Use ref for scroll offset - no rerenders on scroll for better performance
  const scrollOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateDraggingOverlay = useCallback(
    (
      card: T | null,
      position: { x: number; y: number },
      size?: { width: number; height: number }
    ) => {
      setDraggingOverlay((prev) => ({
        card,
        position,
        size: size || prev.size,
      }));
    },
    []
  );

  const toggleColumnCollapse = useCallback((columnId: string) => {
    setCollapsedColumns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(columnId)) {
        newSet.delete(columnId);
      } else {
        newSet.add(columnId);
      }
      return newSet;
    });
  }, []);

  const isColumnCollapsed = useCallback(
    (columnId: string) => collapsedColumns.has(columnId),
    [collapsedColumns]
  );

  const startDrag = useCallback(
    (cardId: string, columnId: string, position: { x: number; y: number }) => {
      if (!dragEnabled) return;

      setDragState({
        activeCardId: cardId,
        activeColumnId: columnId,
        targetColumnId: columnId,
        targetIndex: 0,
        position,
      });
    },
    [dragEnabled]
  );

  const updateDrag = useCallback(
    (
      position: { x: number; y: number },
      targetColumnId?: string,
      targetIndex?: number
    ) => {
      setDragState((prev) => ({
        ...prev,
        position,
        ...(targetColumnId !== undefined && { targetColumnId }),
        ...(targetIndex !== undefined && { targetIndex }),
      }));
    },
    []
  );

  const endDrag = useCallback(
    (targetColumnId?: string, targetIndex?: number) => {
      const { activeCardId, activeColumnId } = dragState;

      if (!activeCardId || !activeColumnId) return;

      const finalTargetColumnId = targetColumnId || dragState.targetColumnId;
      const finalTargetIndex =
        targetIndex !== undefined ? targetIndex : dragState.targetIndex;

      // Call appropriate callback
      if (finalTargetColumnId === activeColumnId) {
        // Reorder within same column
        const columnCards = cards.filter((c) => c.columnId === activeColumnId);
        const fromIndex = columnCards.findIndex((c) => c.id === activeCardId);

        if (fromIndex !== finalTargetIndex) {
          onCardReorder?.(activeColumnId, fromIndex, finalTargetIndex);
        }
      } else if (
        finalTargetColumnId &&
        finalTargetColumnId !== activeColumnId
      ) {
        // Move to different column
        onCardMove?.(
          activeCardId,
          activeColumnId,
          finalTargetColumnId,
          finalTargetIndex
        );
      }

      // Reset drag state
      setDragState(initialDragState);
    },
    [dragState, cards, onCardMove, onCardReorder]
  );

  const cancelDrag = useCallback(() => {
    setDragState(initialDragState);
  }, []);

  const moveCardAction = useCallback(
    (cardId: string, toColumnId: string, toIndex: number) => {
      const card = cards.find((c) => c.id === cardId);
      if (!card) return;

      onCardMove?.(cardId, card.columnId, toColumnId, toIndex);
    },
    [cards, onCardMove]
  );

  const reorderCardAction = useCallback(
    (columnId: string, fromIndex: number, toIndex: number) => {
      onCardReorder?.(columnId, fromIndex, toIndex);
    },
    [onCardReorder]
  );

  const registerColumnLayout = useCallback(
    (columnId: string, layout: ColumnLayout) => {
      setColumnLayouts((prev) => {
        const newMap = new Map(prev);
        newMap.set(columnId, layout);
        return newMap;
      });
    },
    []
  );

  const registerCardLayout = useCallback(
    (cardId: string, layout: ColumnLayout) => {
      setCardLayouts((prev) => {
        const newMap = new Map(prev);
        newMap.set(cardId, layout);
        return newMap;
      });
    },
    []
  );

  const value = useMemo<KanbanContextValue<T>>(
    () => ({
      columns,
      cards,
      columnLayouts,
      registerColumnLayout,
      cardLayouts,
      registerCardLayout,
      scrollOffsetRef,
      collapsedColumns,
      toggleColumnCollapse,
      isColumnCollapsed,
      dragState,
      isDragging: dragState.activeCardId !== null,
      draggingOverlay,
      updateDraggingOverlay,
      startDrag,
      updateDrag,
      endDrag,
      cancelDrag,
      moveCardAction,
      reorderCardAction,
      onCardPress,
      onCardLongPress,
      onColumnPress,
      dragEnabled,
      hapticFeedback,
      columnWidth,
      columnGap,
      cardGap,
    }),
    [
      columns,
      cards,
      columnLayouts,
      registerColumnLayout,
      cardLayouts,
      registerCardLayout,
      scrollOffsetRef,
      collapsedColumns,
      toggleColumnCollapse,
      isColumnCollapsed,
      dragState,
      draggingOverlay,
      updateDraggingOverlay,
      startDrag,
      updateDrag,
      endDrag,
      cancelDrag,
      moveCardAction,
      reorderCardAction,
      onCardPress,
      onCardLongPress,
      onColumnPress,
      dragEnabled,
      hapticFeedback,
      columnWidth,
      columnGap,
      cardGap,
    ]
  );

  return (
    <KanbanContext.Provider value={value as unknown as KanbanContextValue}>
      {children}
    </KanbanContext.Provider>
  );
}
