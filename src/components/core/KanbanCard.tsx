/**
 * Kanban card component
 */

import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { CardData } from '../../types';
import { useTheme } from '../../hooks';

export interface KanbanCardProps {
  card: CardData;
  isDragging?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
  renderCard?: (card: CardData, isDragging: boolean) => React.ReactNode;
}

function KanbanCardComponent({
  card,
  isDragging = false,
  style,
  onPress,
  onLongPress,
  renderCard,
}: KanbanCardProps) {
  const { theme } = useTheme();

  // Use custom renderer if provided
  if (renderCard) {
    return <View style={style}>{renderCard(card, isDragging)}</View>;
  }

  // Default card UI
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.colors.cardBackground,
          borderColor: theme.colors.cardBorder,
          borderRadius: theme.borderRadius.card,
          padding: theme.spacing.cardPadding,
          ...theme.shadows.card,
        },
        pressed && styles.pressed,
        isDragging && {
          opacity: 0.5,
          ...theme.shadows.cardDragging,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.cardTitle,
            fontSize: theme.typography.cardTitle.fontSize,
            fontWeight: theme.typography.cardTitle.fontWeight,
            lineHeight: theme.typography.cardTitle.lineHeight,
          },
        ]}
        numberOfLines={2}
      >
        {card.title}
      </Text>

      {card.description && (
        <Text
          style={[
            styles.description,
            {
              color: theme.colors.cardDescription,
              fontSize: theme.typography.cardDescription.fontSize,
              fontWeight: theme.typography.cardDescription.fontWeight,
              lineHeight: theme.typography.cardDescription.lineHeight,
              marginTop: 4,
            },
          ]}
          numberOfLines={3}
        >
          {card.description}
        </Text>
      )}

      {/* Priority indicator */}
      {card.priority && (
        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor:
                card.priority === 'high'
                  ? theme.colors.priorityHigh
                  : card.priority === 'medium'
                  ? theme.colors.priorityMedium
                  : theme.colors.priorityLow,
              borderRadius: theme.borderRadius.badge,
              marginTop: 8,
            },
          ]}
        >
          <Text
            style={[
              styles.priorityText,
              {
                fontSize: theme.typography.badge.fontSize,
                fontWeight: theme.typography.badge.fontWeight,
              },
            ]}
          >
            {card.priority.toUpperCase()}
          </Text>
        </View>
      )}

      {/* Labels */}
      {card.labels && card.labels.length > 0 && (
        <View style={styles.labelsContainer}>
          {card.labels.slice(0, 3).map((label, index) => (
            <View
              key={index}
              style={[
                styles.label,
                {
                  backgroundColor: theme.colors.columnCountBadge,
                  borderRadius: theme.borderRadius.badge,
                },
              ]}
            >
              <Text
                style={[
                  styles.labelText,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.badge.fontSize,
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    // Dynamic styles from theme
  },
  description: {
    // Dynamic styles from theme
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priorityText: {
    color: '#FFFFFF',
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  labelText: {
    // Dynamic styles from theme
  },
});

export const KanbanCard = memo(KanbanCardComponent);
