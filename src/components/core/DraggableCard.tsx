/**
 * Draggable Card - Full Overlay Pattern Implementation
 *
 * Features:
 * - Card becomes placeholder (opacity 0.3) during drag
 * - Actual dragging happens in DraggingOverlay at screen level
 * - Requires 1-second long press before drag activates
 * - Uses measureInWindow for absolute screen positioning
 * - No clipping by ScrollView (z-index 9999)
 */

import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import type { CardData } from '../../types';
import { useKanban, useHaptic } from '../../hooks';
import { SMOOTH_SPRING } from '../../animations';
import { KanbanCard } from './KanbanCard';
import { isPointInRect, calculateDropIndex } from '../../utils/collision';
import { getColumnCards, canMoveToColumn } from '../../utils/reorder';

export interface DraggableCardProps {
  card: CardData;
  index: number;
  columnId: string;
  renderCard?: (card: CardData, isDragging: boolean) => React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
}

export function DraggableCard({
  card,
  index: _index,
  columnId,
  renderCard,
  onPress,
  onLongPress,
}: DraggableCardProps) {
  const {
    dragEnabled,
    hapticFeedback,
    startDrag,
    updateDrag,
    endDrag,
    dragState,
    columnLayouts,
    cardLayouts,
    registerCardLayout,
    updateDraggingOverlay,
    columns,
    cards,
  } = useKanban();
  const trigger = useHaptic(hapticFeedback);

  const cardRef = useRef<any>(null);
  const originX = useSharedValue(0);
  const originY = useSharedValue(0);
  const cardWidth = useSharedValue(0);
  const cardHeight = useSharedValue(0);
  const isLongPressActivated = useSharedValue(false);

  const isDragging = dragState.activeCardId === card.id;

  // Measure card using measureInWindow for screen coordinates
  const measureCard = useCallback(
    () =>
      new Promise<{
        x: number;
        y: number;
        width: number;
        height: number;
      } | null>((resolve) => {
        if (!cardRef.current) {
          resolve(null);
          return;
        }

        // @ts-ignore - measureInWindow exists but not in types
        cardRef.current.measureInWindow(
          (x: number, y: number, width: number, height: number) => {
            resolve({ x, y, width, height });
          }
        );
      }),
    []
  );

  // Register layout for drop detection
  const handleLayout = useCallback(
    (event: any) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      registerCardLayout(card.id, { x, y, width, height });
      cardWidth.value = width;
      cardHeight.value = height;
    },
    [card.id, registerCardLayout, cardWidth, cardHeight]
  );

  // Start drag - capture position and show overlay
  const onDragStart = useCallback(async () => {
    const measurements = await measureCard();
    if (!measurements) return;

    originX.value = measurements.x;
    originY.value = measurements.y;

    trigger('impactMedium');
    startDrag(card.id, columnId, { x: measurements.x, y: measurements.y });

    updateDraggingOverlay(
      card,
      { x: measurements.x, y: measurements.y },
      { width: measurements.width, height: measurements.height }
    );
  }, [
    measureCard,
    originX,
    originY,
    trigger,
    startDrag,
    card,
    columnId,
    updateDraggingOverlay,
  ]);

  // Detect drop target during drag
  const detectDropTarget = useCallback(
    (position: { x: number; y: number }) => {
      let targetColumnId: string | undefined;
      let targetIndex = 0;

      for (const column of columns) {
        const layout = columnLayouts.get(column.id);
        if (layout && isPointInRect(position, layout)) {
          if (!canMoveToColumn(card, column.id, columns, cards)) {
            break;
          }

          targetColumnId = column.id;
          const columnCards = getColumnCards(cards, column.id).filter(
            (c) => c.id !== card.id
          );

          const cardLayoutsArray = columnCards
            .map((c) => cardLayouts.get(c.id))
            .filter((l): l is NonNullable<typeof l> => l !== undefined)
            .map((l) => ({ y: l.y, height: l.height }));

          targetIndex = calculateDropIndex(position.y, cardLayoutsArray);
          break;
        }
      }

      updateDrag(position, targetColumnId, targetIndex);
    },
    [columnLayouts, cardLayouts, columns, cards, card, updateDrag]
  );

  // End drag - hide overlay and reset long press
  const onDragEnd = useCallback(() => {
    trigger('impactLight');
    endDrag();
    updateDraggingOverlay(null, { x: 0, y: 0 });
    isLongPressActivated.value = false;
  }, [trigger, endDrag, updateDraggingOverlay, isLongPressActivated]);

  // Long Press gesture - 1 second hold required before drag
  const longPressGesture = Gesture.LongPress()
    .minDuration(1000)
    .enabled(dragEnabled)
    .onStart(() => {
      'worklet';
      isLongPressActivated.value = true;
      runOnJS(trigger)('impactMedium');
      runOnJS(onDragStart)();
    })
    .onFinalize(() => {
      'worklet';
      if (!isDragging) {
        isLongPressActivated.value = false;
      }
    });

  // Pan gesture - only works after long press activates
  const panGesture = Gesture.Pan()
    .enabled(dragEnabled)
    .onUpdate((event) => {
      'worklet';
      if (!isLongPressActivated.value) return;

      const newX = originX.value + event.translationX;
      const newY = originY.value + event.translationY;

      // Update overlay position
      runOnJS(updateDraggingOverlay)(card, { x: newX, y: newY });

      // Detect drop target using center point
      runOnJS(detectDropTarget)({
        x: newX + cardWidth.value / 2,
        y: newY + cardHeight.value / 2,
      });
    })
    .onEnd(() => {
      'worklet';
      if (isLongPressActivated.value) {
        runOnJS(onDragEnd)();
      }
    });

  // Combine gestures - LongPress triggers, Pan moves
  const composedGesture = Gesture.Simultaneous(longPressGesture, panGesture);

  // Placeholder opacity when dragging + scale feedback during long press
  const placeholderStyle = useAnimatedStyle(() => ({
    opacity: isDragging ? withSpring(0.3, SMOOTH_SPRING) : 1,
    transform: [
      {
        scale:
          isLongPressActivated.value && !isDragging
            ? withSpring(0.98, SMOOTH_SPRING)
            : 1,
      },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        ref={cardRef}
        onLayout={handleLayout}
        style={[styles.container, placeholderStyle]}
      >
        <KanbanCard
          card={card}
          isDragging={false}
          renderCard={renderCard}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {},
});
