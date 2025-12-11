/**
 * Kanban board component
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import type { CardData, KanbanBoardProps } from '../../types';
import { useTheme } from '../../hooks';
import { KanbanColumn } from './KanbanColumn';
import { DEFAULT_BOARD_PADDING } from '../../constants';

export function KanbanBoard<T extends CardData = CardData>({
  columns,
  style,
  columnStyle,
  renderCard,
  renderColumnHeader,
  renderEmptyColumn,
  renderColumnFooter,
  columnGap = 16,
  scrollEnabled = true,
  showsScrollIndicator = false,
  contentContainerPadding = DEFAULT_BOARD_PADDING,
}: Omit<
  KanbanBoardProps<T>,
  'cards' | 'onCardMove' | 'onCardReorder' | 'dragEnabled' | 'hapticFeedback'
>) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.boardBackground },
        style,
      ]}
    >
      <ScrollView
        horizontal
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={showsScrollIndicator}
        contentContainerStyle={[
          styles.scrollContent,
          {
            padding: contentContainerPadding,
            gap: columnGap,
          },
        ]}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            style={columnStyle}
            renderCard={renderCard}
            renderColumnHeader={renderColumnHeader}
            renderEmptyColumn={renderEmptyColumn}
            renderColumnFooter={renderColumnFooter}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    // Dynamic styles from props
  },
});
