/**
 * Card placeholder component
 * Shows where a card will be dropped during drag
 */

import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks';
import { SMOOTH_SPRING, PLACEHOLDER_ANIMATION } from '../../animations';

export interface CardPlaceholderProps {
  /**
   * Whether the placeholder should be visible
   */
  visible: boolean;

  /**
   * Height of the placeholder (should match card height)
   */
  height?: number;
}

/**
 * Animated placeholder that appears at drop location
 */
export function CardPlaceholder({
  visible,
  height = 80,
}: CardPlaceholderProps) {
  const { theme } = useTheme();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {
        duration: PLACEHOLDER_ANIMATION.FADE_IN,
      });
      scale.value = withSpring(1, SMOOTH_SPRING);
    } else {
      opacity.value = withTiming(0, {
        duration: PLACEHOLDER_ANIMATION.FADE_OUT,
      });
      scale.value = withSpring(0.8, SMOOTH_SPRING);
    }
  }, [visible, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height,
          backgroundColor: theme.colors.placeholder,
          borderColor: theme.colors.dropZoneActive,
          borderRadius: theme.borderRadius.card,
        },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: 'dashed',
    marginVertical: 6,
  },
});
