/**
 * Draggable Card Wrapper Component
 * Wraps KanbanCard with gesture handling
 */

import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import type { CardData } from '../../types';
import { useKanban, useTheme, useHaptic } from '../../hooks';
import { SMOOTH_SPRING, CARD_ANIMATION } from '../../animations';
import { KanbanCard } from './KanbanCard';

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
  index,
  columnId,
  renderCard,
  onPress,
  onLongPress,
}: DraggableCardProps) {
  const { theme } = useTheme();
  const {
    dragEnabled,
    hapticFeedback,
    startDrag,
    updateDrag,
    endDrag,
    dragState,
  } = useKanban();
  const trigger = useHaptic(hapticFeedback);

  // Animation values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(
    theme.shadows.card.shadowOpacity
  );

  const isDragging = dragState.activeCardId === card.id;

  // Reset position when drag ends
  const resetPosition = useCallback(() => {
    translateX.value = withSpring(0, SMOOTH_SPRING);
    translateY.value = withSpring(0, SMOOTH_SPRING);
    scale.value = withSpring(1, SMOOTH_SPRING);
    shadowOpacity.value = withTiming(
      theme.shadows.card.shadowOpacity,
      { duration: 200 }
    );
  }, [translateX, translateY, scale, shadowOpacity, theme]);

  // Gesture handling
  const panGesture = Gesture.Pan()
    .enabled(dragEnabled)
    .onStart((event) => {
      'worklet';
      // Scale up and increase shadow
      scale.value = withSpring(CARD_ANIMATION.PICKUP_SCALE, SMOOTH_SPRING);
      shadowOpacity.value = withTiming(
        CARD_ANIMATION.SHADOW_OPACITY_DRAGGING,
        { duration: 200 }
      );

      // Trigger haptic feedback
      runOnJS(trigger)('impactMedium');

      // Notify context
      runOnJS(startDrag)(card.id, columnId, {
        x: event.absoluteX,
        y: event.absoluteY,
      });
    })
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      // Update drag position in context
      runOnJS(updateDrag)({
        x: event.absoluteX,
        y: event.absoluteY,
      });
    })
    .onEnd(() => {
      'worklet';
      // Trigger haptic feedback
      runOnJS(trigger)('impactLight');

      // End drag
      runOnJS(endDrag)();

      // Reset position
      runOnJS(resetPosition)();
    });

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      zIndex: isDragging ? 1000 : 1,
      shadowOpacity: shadowOpacity.value,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <KanbanCard
          card={card}
          isDragging={isDragging}
          renderCard={renderCard}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container for drag
  },
});
