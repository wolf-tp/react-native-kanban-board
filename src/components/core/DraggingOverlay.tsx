/**
 * Dragging Overlay Component
 * Renders the dragging item at screen level with absolute positioning
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { CardData } from '../../types';
import { useTheme } from '../../hooks';
import { KanbanCard } from './KanbanCard';
import { SMOOTH_SPRING, CARD_ANIMATION } from '../../animations';

export interface DraggingOverlayProps {
  card: CardData | null;
  position: { x: number; y: number };
  width: number;
  height: number;
  renderCard?: (card: CardData, isDragging: boolean) => React.ReactNode;
}

/**
 * Overlay layer that renders the dragging item outside normal flow
 * Positioned absolutely at screen level to avoid clipping
 */
export function DraggingOverlay({
  card,
  position,
  width,
  height,
  renderCard,
}: DraggingOverlayProps) {
  const { theme } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    if (!card) {
      return {
        opacity: 0,
        transform: [{ scale: 0.8 }],
      };
    }

    return {
      opacity: withSpring(1, SMOOTH_SPRING),
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { scale: withSpring(CARD_ANIMATION.PICKUP_SCALE, SMOOTH_SPRING) },
      ],
    };
  });

  if (!card) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          width,
          height,
          shadowColor: theme.colors.cardShadow,
          shadowOpacity: CARD_ANIMATION.SHADOW_OPACITY_DRAGGING,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 8,
        },
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <KanbanCard card={card} isDragging={true} renderCard={renderCard} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
});
