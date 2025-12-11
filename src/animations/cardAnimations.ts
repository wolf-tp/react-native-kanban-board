/**
 * Card-specific animation helpers
 */

import { withSpring, withTiming } from 'react-native-reanimated';
import { SMOOTH_SPRING, SMOOTH_TIMING, CARD_ANIMATION } from './configs';

/**
 * Animate card pickup
 */
export const animateCardPickup = () => {
  'worklet';
  return {
    scale: withSpring(CARD_ANIMATION.PICKUP_SCALE, SMOOTH_SPRING),
    rotation: withSpring(CARD_ANIMATION.PICKUP_ROTATION, SMOOTH_SPRING),
    shadowOpacity: withTiming(
      CARD_ANIMATION.SHADOW_OPACITY_DRAGGING,
      SMOOTH_TIMING
    ),
  };
};

/**
 * Animate card drop
 */
export const animateCardDrop = () => {
  'worklet';
  return {
    scale: withSpring(CARD_ANIMATION.DROP_SCALE, SMOOTH_SPRING),
    rotation: withSpring(CARD_ANIMATION.DROP_ROTATION, SMOOTH_SPRING),
    shadowOpacity: withTiming(
      CARD_ANIMATION.SHADOW_OPACITY_NORMAL,
      SMOOTH_TIMING
    ),
  };
};

/**
 * Animate card to position
 */
export const animateCardToPosition = (x: number, y: number) => {
  'worklet';
  return {
    translateX: withSpring(x, SMOOTH_SPRING),
    translateY: withSpring(y, SMOOTH_SPRING),
  };
};

/**
 * Animate placeholder appearance
 */
export const animatePlaceholderAppear = (height: number) => {
  'worklet';
  return {
    height: withSpring(height, SMOOTH_SPRING),
    opacity: withTiming(0.5, SMOOTH_TIMING),
  };
};

/**
 * Animate placeholder disappearance
 */
export const animatePlaceholderDisappear = () => {
  'worklet';
  return {
    height: withSpring(0, SMOOTH_SPRING),
    opacity: withTiming(0, SMOOTH_TIMING),
  };
};

/**
 * Animate cards shift
 */
export const animateCardsShift = (offset: number) => {
  'worklet';
  return {
    translateY: withSpring(offset, SMOOTH_SPRING),
  };
};
