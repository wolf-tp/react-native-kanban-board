/**
 * React Native Kanban Board - Example App
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Kanban, type CardData, type ThemeMode } from 'react-native-kanban-board';
import { columns, initialCards } from './data';

export default function App() {
  const systemColorScheme = useColorScheme();
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    systemColorScheme === 'dark' ? 'dark' : 'light'
  );

  /**
   * Handle card move between columns
   */
  const handleCardMove = (
    cardId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => {
    setCards((prevCards) => {
      // Find the card
      const card = prevCards.find((c) => c.id === cardId);
      if (!card) return prevCards;

      // Update card's columnId
      const updatedCard = { ...card, columnId: toColumn };

      // Remove card from old position
      const filtered = prevCards.filter((c) => c.id !== cardId);

      // Get cards in target column
      const targetColumnCards = filtered.filter((c) => c.columnId === toColumn);
      const otherCards = filtered.filter((c) => c.columnId !== toColumn);

      // Insert at new index
      targetColumnCards.splice(newIndex, 0, updatedCard);

      return [...otherCards, ...targetColumnCards];
    });
  };

  /**
   * Handle card reorder within same column
   */
  const handleCardReorder = (
    columnId: string,
    fromIndex: number,
    toIndex: number
  ) => {
    setCards((prevCards) => {
      const columnCards = prevCards.filter((c) => c.columnId === columnId);
      const otherCards = prevCards.filter((c) => c.columnId !== columnId);

      // Reorder within column
      const [movedCard] = columnCards.splice(fromIndex, 1);
      columnCards.splice(toIndex, 0, movedCard);

      return [...otherCards, ...columnCards];
    });
  };

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: themeMode === 'dark' ? '#000000' : '#F5F5F7',
        },
      ]}
    >
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={themeMode === 'dark' ? '#000000' : '#F5F5F7'}
      />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { color: themeMode === 'dark' ? '#FFFFFF' : '#1C1C1E' },
            ]}
          >
            Project Board
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: themeMode === 'dark' ? '#AEAEB2' : '#636366' },
            ]}
          >
            Drag cards to organize your tasks
          </Text>
        </View>

        {/* Theme Toggle Button */}
        <TouchableOpacity
          style={[
            styles.themeButton,
            {
              backgroundColor: themeMode === 'dark' ? '#2C2C2E' : '#FFFFFF',
              borderColor: themeMode === 'dark' ? '#3A3A3C' : '#E5E5EA',
            },
          ]}
          onPress={toggleTheme}
        >
          <Text style={styles.themeButtonText}>
            {themeMode === 'dark' ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Kanban Board */}
      <Kanban
        columns={columns}
        cards={cards}
        onCardMove={handleCardMove}
        onCardReorder={handleCardReorder}
        themeMode={themeMode}
        dragEnabled={true}
        hapticFeedback={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  themeButtonText: {
    fontSize: 20,
  },
});
