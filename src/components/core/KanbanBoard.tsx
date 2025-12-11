/**
 * Kanban board component
 */

import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DEFAULT_BOARD_PADDING } from '../../constants';
import { useTheme } from '../../hooks';
import type { CardData, KanbanBoardProps } from '../../types';
import { KanbanColumn } from './KanbanColumn';

export function KanbanBoard({
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
  KanbanBoardProps<CardData>,
  'cards' | 'onCardMove' | 'onCardReorder' | 'dragEnabled' | 'hapticFeedback'
>) {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
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
