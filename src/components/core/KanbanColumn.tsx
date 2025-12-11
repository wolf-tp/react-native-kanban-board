/**
 * Kanban column component
 */

import React, { memo, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { CardData, ColumnConfig } from '../../types';
import { useTheme, useKanban } from '../../hooks';
import { KanbanCard } from './KanbanCard';
import { getColumnCards } from '../../utils';

export interface KanbanColumnProps {
  column: ColumnConfig;
  style?: StyleProp<ViewStyle>;
  renderCard?: (card: CardData, isDragging: boolean) => React.ReactNode;
  renderColumnHeader?: (
    column: ColumnConfig,
    cardCount: number
  ) => React.ReactNode;
  renderEmptyColumn?: (column: ColumnConfig) => React.ReactNode;
  renderColumnFooter?: (column: ColumnConfig) => React.ReactNode;
}

function KanbanColumnComponent({
  column,
  style,
  renderCard,
  renderColumnHeader,
  renderEmptyColumn,
  renderColumnFooter,
}: KanbanColumnProps) {
  const { theme } = useTheme();
  const {
    cards,
    columnWidth,
    cardGap,
    onCardPress,
    onCardLongPress,
    onColumnPress,
    dragState,
  } = useKanban();

  // Get cards for this column
  const columnCards = useMemo(
    () => getColumnCards(cards, column.id),
    [cards, column.id]
  );

  const handleColumnPress = () => {
    onColumnPress?.(column);
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: columnWidth,
          backgroundColor: theme.colors.columnBackground,
          borderColor: theme.colors.columnBorder,
          borderRadius: theme.borderRadius.column,
          ...theme.shadows.column,
        },
        style,
      ]}
    >
      {/* Column Header */}
      {renderColumnHeader ? (
        renderColumnHeader(column, columnCards.length)
      ) : (
        <Pressable onPress={handleColumnPress} style={styles.header}>
          {/* Color indicator */}
          {column.color && (
            <View
              style={[
                styles.colorIndicator,
                {
                  backgroundColor: column.color,
                  borderRadius: theme.borderRadius.badge,
                },
              ]}
            />
          )}

          <Text
            style={[
              styles.title,
              {
                color: theme.colors.columnHeaderText,
                fontSize: theme.typography.columnTitle.fontSize,
                fontWeight: theme.typography.columnTitle.fontWeight,
                lineHeight: theme.typography.columnTitle.lineHeight,
              },
            ]}
          >
            {column.title}
          </Text>

          {/* Card count badge */}
          <View
            style={[
              styles.countBadge,
              {
                backgroundColor: theme.colors.columnCountBadge,
                borderRadius: theme.borderRadius.badge,
              },
            ]}
          >
            <Text
              style={[
                styles.countText,
                {
                  color: theme.colors.columnCountText,
                  fontSize: theme.typography.count.fontSize,
                  fontWeight: theme.typography.count.fontWeight,
                },
              ]}
            >
              {columnCards.length}
            </Text>
          </View>
        </Pressable>
      )}

      {/* Cards ScrollView */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            padding: theme.spacing.columnPadding,
            gap: cardGap,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {columnCards.length === 0 ? (
          // Empty state
          renderEmptyColumn ? (
            renderEmptyColumn(column)
          ) : (
            <View style={styles.emptyState}>
              <Text
                style={[styles.emptyText, { color: theme.colors.textTertiary }]}
              >
                No cards yet
              </Text>
            </View>
          )
        ) : (
          // Render cards
          columnCards.map((card) => {
            const isDragging = dragState.activeCardId === card.id;

            return (
              <KanbanCard
                key={card.id}
                card={card}
                isDragging={isDragging}
                renderCard={renderCard}
                onPress={() => onCardPress?.(card)}
                onLongPress={() => onCardLongPress?.(card)}
              />
            );
          })
        )}
      </ScrollView>

      {/* Column Footer */}
      {renderColumnFooter && (
        <View style={styles.footer}>{renderColumnFooter(column)}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  colorIndicator: {
    width: 4,
    height: 20,
  },
  title: {
    flex: 1,
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  countText: {
    // Dynamic styles from theme
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // Dynamic styles from theme
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
  footer: {
    padding: 16,
  },
});

export const KanbanColumn = memo(KanbanColumnComponent);
