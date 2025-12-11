/**
 * Auto-scroll hook for drag and drop
 * Automatically scrolls when dragging near edges
 */

import { useRef, useCallback } from 'react';
import { SCROLL_ANIMATION } from '../animations';

interface AutoScrollOptions {
  enabled: boolean;
  threshold?: number;
  speed?: number;
  maxSpeed?: number;
}

interface ScrollPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Hook to handle auto-scrolling during drag operations
 */
export function useAutoScroll(options: AutoScrollOptions = { enabled: true }) {
  const {
    enabled = true,
    threshold = SCROLL_ANIMATION.THRESHOLD,
    speed = SCROLL_ANIMATION.SPEED,
    maxSpeed = SCROLL_ANIMATION.MAX_SPEED,
  } = options;

  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollViewRef = useRef<any>(null);

  /**
   * Calculate scroll speed based on distance from edge
   */
  const calculateScrollSpeed = useCallback(
    (distanceFromEdge: number): number => {
      if (distanceFromEdge >= threshold) return 0;

      const ratio = 1 - distanceFromEdge / threshold;
      return Math.min(speed + ratio * (maxSpeed - speed), maxSpeed);
    },
    [threshold, speed, maxSpeed]
  );

  /**
   * Start auto-scroll in a direction
   */
  const startScroll = useCallback(
    (
      scrollView: any,
      direction: 'up' | 'down' | 'left' | 'right',
      scrollSpeed: number
    ) => {
      if (!enabled || !scrollView || scrollSpeed === 0) return;

      // Clear existing interval
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }

      scrollViewRef.current = scrollView;

      // Set up scroll interval
      scrollIntervalRef.current = setInterval(() => {
        if (!scrollViewRef.current) return;

        const delta = scrollSpeed;

        if (direction === 'up') {
          scrollViewRef.current.scrollTo({ y: -delta, animated: false });
        } else if (direction === 'down') {
          scrollViewRef.current.scrollTo({ y: delta, animated: false });
        } else if (direction === 'left') {
          scrollViewRef.current.scrollTo({ x: -delta, animated: false });
        } else if (direction === 'right') {
          scrollViewRef.current.scrollTo({ x: delta, animated: false });
        }
      }, 16); // ~60fps
    },
    [enabled]
  );

  /**
   * Stop auto-scroll
   */
  const stopScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    scrollViewRef.current = null;
  }, []);

  /**
   * Update auto-scroll based on drag position
   */
  const updateAutoScroll = useCallback(
    (
      dragPosition: { x: number; y: number },
      scrollViewBounds: ScrollPosition,
      scrollView: any,
      isVertical: boolean = true
    ) => {
      if (!enabled) return;

      const { x: dragX, y: dragY } = dragPosition;
      const { x, y, width, height } = scrollViewBounds;

      if (isVertical) {
        // Check vertical scrolling
        const topDistance = dragY - y;
        const bottomDistance = y + height - dragY;

        if (topDistance < threshold && topDistance > 0) {
          const scrollSpeed = calculateScrollSpeed(topDistance);
          startScroll(scrollView, 'up', scrollSpeed);
        } else if (bottomDistance < threshold && bottomDistance > 0) {
          const scrollSpeed = calculateScrollSpeed(bottomDistance);
          startScroll(scrollView, 'down', scrollSpeed);
        } else {
          stopScroll();
        }
      } else {
        // Check horizontal scrolling
        const leftDistance = dragX - x;
        const rightDistance = x + width - dragX;

        if (leftDistance < threshold && leftDistance > 0) {
          const scrollSpeed = calculateScrollSpeed(leftDistance);
          startScroll(scrollView, 'left', scrollSpeed);
        } else if (rightDistance < threshold && rightDistance > 0) {
          const scrollSpeed = calculateScrollSpeed(rightDistance);
          startScroll(scrollView, 'right', scrollSpeed);
        } else {
          stopScroll();
        }
      }
    },
    [enabled, threshold, calculateScrollSpeed, startScroll, stopScroll]
  );

  return {
    updateAutoScroll,
    stopScroll,
  };
}
