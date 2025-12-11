/**
 * Kanban board component
 */

import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DEFAULT_BOARD_PADDING } from '../../constants';
import { useTheme, useKanban } from '../../hooks';
import type { CardData, KanbanBoardProps } from '../../types';
import { KanbanColumn } from './KanbanColumn';
import { DraggingOverlay } from './DraggingOverlay';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

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
  const { draggingOverlay, scrollOffsetRef } = useKanban();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    // Direct ref mutation - no rerenders for better performance
    scrollOffsetRef.current = { x: contentOffset.x, y: contentOffset.y };
  };

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
          onScroll={handleScroll}
          scrollEventThrottle={16}
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

        {/* Dragging Overlay - Renders outside ScrollView for proper z-index */}
        <DraggingOverlay
          card={draggingOverlay.card}
          position={draggingOverlay.position}
          width={draggingOverlay.size.width}
          height={draggingOverlay.size.height}
          renderCard={renderCard}
        />
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
