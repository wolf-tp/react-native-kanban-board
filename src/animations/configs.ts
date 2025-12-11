/**
 * Animation configurations
 */

import type {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';

/**
 * Smooth spring animation config
 * High damping, no bounce - feels smooth and controlled
 */
export const SMOOTH_SPRING: WithSpringConfig = {
  damping: 20,
  stiffness: 300,
  mass: 0.8,
  overshootClamping: false,
};

/**
 * Quick spring animation config
 * For fast interactions
 */
export const QUICK_SPRING: WithSpringConfig = {
  damping: 25,
  stiffness: 400,
  mass: 0.5,
  overshootClamping: false,
};

/**
 * Slow spring animation config
 * For emphasized movements
 */
export const SLOW_SPRING: WithSpringConfig = {
  damping: 15,
  stiffness: 200,
  mass: 1,
  overshootClamping: false,
};

/**
 * Smooth timing animation config
 */
export const SMOOTH_TIMING: WithTimingConfig = {
  duration: 250,
  // easing is not available in types but works at runtime
};

/**
 * Quick timing animation config
 */
export const QUICK_TIMING: WithTimingConfig = {
  duration: 150,
};

/**
 * Fade timing animation config
 */
export const FADE_TIMING: WithTimingConfig = {
  duration: 200,
};

/**
 * Card animation values
 */
export const CARD_ANIMATION = {
  PICKUP_SCALE: 1.05,
  PICKUP_ROTATION: 2, // degrees
  DROP_SCALE: 1,
  DROP_ROTATION: 0,
  SHADOW_OPACITY_NORMAL: 0.1,
  SHADOW_OPACITY_DRAGGING: 0.3,
} as const;

/**
 * Placeholder animation values
 */
export const PLACEHOLDER_ANIMATION = {
  HEIGHT_COLLAPSED: 0,
  OPACITY_HIDDEN: 0,
  OPACITY_VISIBLE: 0.5,
} as const;

/**
 * Scroll animation values
 */
export const SCROLL_ANIMATION = {
  SPEED: 10, // px per frame
  THRESHOLD: 60, // px from edge
  MAX_SPEED: 20,
} as const;
