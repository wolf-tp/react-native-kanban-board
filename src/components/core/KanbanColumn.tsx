/**
 * Kanban column component
 */

import React, { memo, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  type StyleProp,
  type ViewStyle,
  type LayoutChangeEvent,
} from 'react-native';
import type { CardData, ColumnConfig } from '../../types';
import { useTheme, useKanban } from '../../hooks';
import { DraggableCard } from './DraggableCard';
import { CardPlaceholder } from './CardPlaceholder';
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
    registerColumnLayout,
    dragState,
    isDragging,
  } = useKanban();

  // Get cards for this column
  const columnCards = useMemo(
    () => getColumnCards(cards, column.id),
    [cards, column.id]
  );

  const handleColumnPress = () => {
    onColumnPress?.(column);
  };

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      registerColumnLayout(column.id, { x, y, width, height });
    },
    [column.id, registerColumnLayout]
  );

  // Check if this column is the drop target
  const isDropTarget = isDragging && dragState.targetColumnId === column.id;

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.container,
        {
          width: columnWidth,
          backgroundColor: theme.colors.columnBackground,
          borderColor: isDropTarget
            ? column.color || theme.colors.dropZoneActive
            : theme.colors.columnBorder,
          borderWidth: isDropTarget ? 2 : 1,
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
          // Empty state with placeholder
          <>
            {isDropTarget ? (
              <CardPlaceholder visible={true} height={80} />
            ) : renderEmptyColumn ? (
              renderEmptyColumn(column)
            ) : (
              <View style={styles.emptyState}>
                <Text
                  style={[
                    styles.emptyText,
                    { color: theme.colors.textTertiary },
                  ]}
                >
                  No cards yet
                </Text>
              </View>
            )}
          </>
        ) : (
          // Render cards with placeholders
          <>
            {columnCards.map((card, index) => {
              const showPlaceholderBefore =
                isDropTarget && dragState.targetIndex === index;

              return (
                <React.Fragment key={card.id}>
                  {showPlaceholderBefore && (
                    <CardPlaceholder visible={true} height={80} />
                  )}
                  <DraggableCard
                    card={card}
                    index={index}
                    columnId={column.id}
                    renderCard={renderCard}
                    onPress={() => onCardPress?.(card)}
                    onLongPress={() => onCardLongPress?.(card)}
                  />
                </React.Fragment>
              );
            })}
            {/* Placeholder at end if dropping after all cards */}
            {isDropTarget && dragState.targetIndex === columnCards.length && (
              <CardPlaceholder visible={true} height={80} />
            )}
          </>
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
