/**
 * Hook for haptic feedback
 */

import { useCallback } from 'react';
import { Platform } from 'react-native';

type HapticFeedbackType =
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError'
  | 'selection';

/**
 * Hook to trigger haptic feedback
 *
 * @param enabled - Whether haptic feedback is enabled
 * @returns Trigger function
 */
export function useHaptic(enabled: boolean = true) {
  const trigger = useCallback(
    (_type: HapticFeedbackType = 'impactMedium') => {
      if (!enabled) return;

      // Haptic feedback is currently best supported on iOS
      // On Android, we can use the Vibration API as fallback
      if (Platform.OS === 'ios') {
        // React Native doesn't have built-in haptic feedback
        // Users will need to install a library like react-native-haptic-feedback
        // For now, we'll just provide the structure
        try {
          // Placeholder for actual haptic feedback implementation
          // When users install react-native-haptic-feedback:
          // const ReactNativeHapticFeedback = require('react-native-haptic-feedback');
          // ReactNativeHapticFeedback.trigger(type);
        } catch (error) {
          // Silently fail if haptic feedback is not available
        }
      } else if (Platform.OS === 'android') {
        // Android fallback using Vibration
        try {
          // const { Vibration } = require('react-native');
          // const duration = type.includes('Heavy') ? 50 : type.includes('Light') ? 10 : 25;
          // Vibration.vibrate(duration);
        } catch (error) {
          // Silently fail
        }
      }
    },
    [enabled]
  );

  return trigger;
}
