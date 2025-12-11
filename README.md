# React Native Kanban Board

A performant, customizable drag-and-drop Kanban board component for React Native. Built with **Reanimated 3** for smooth animations and **TypeScript** for type safety.

## Features

- 🎯 **Drag & Drop** - Full drag and drop support with gesture handling
  - Smooth pickup and drop animations with scale and shadow effects
  - Real-time drop zone detection with visual feedback
  - Accurate drop position calculation based on Y coordinate
  - Animated placeholders showing exactly where cards will land
  - Move cards between columns or reorder within columns
  - Haptic feedback on drag interactions (iOS/Android)
- ✨ **Smooth Animations** - Powered by Reanimated 3 with customizable spring configs
- 🎨 **Fully Customizable** - Bring your own UI components or use the defaults
- 🌗 **Dark/Light Theme** - Built-in theming system with dark and light modes
- 📱 **Cross Platform** - Works on iOS and Android
- 🎯 **TypeScript** - Full TypeScript support with comprehensive types
- 🪝 **Hooks API** - Easy-to-use React hooks for accessing board state
- 🎭 **Headless Mode** - Complete control over rendering with custom renderers
- ♿ **Accessible** - Built with accessibility in mind
- 🔧 **Flexible** - Support for custom columns, card constraints, and more

## Installation

```bash
# Using yarn
yarn add react-native-kanban-board

# Using npm
npm install react-native-kanban-board

# Install peer dependencies
yarn add react-native-reanimated react-native-gesture-handler
```

### Complete Installation Guide

For detailed installation instructions including Expo and bare React Native setup, see:

📖 **[INSTALLATION.md](./INSTALLATION.md)** - Complete installation guide with troubleshooting

Quick links:
- [Expo Projects](./INSTALLATION.md#expo-projects)
- [Bare React Native Projects](./INSTALLATION.md#bare-react-native-projects)
- [Troubleshooting](./INSTALLATION.md#troubleshooting)

## Quick Start

```tsx
import React, { useState } from 'react';
import { Kanban } from 'react-native-kanban-board';

const columns = [
  { id: 'new', title: 'New', color: '#3B82F6' },
  { id: 'pending', title: 'Pending', color: '#F59E0B' },
  { id: 'in_progress', title: 'In Progress', color: '#8B5CF6' },
  { id: 'done', title: 'Done', color: '#10B981' },
];

const initialCards = [
  {
    id: '1',
    columnId: 'new',
    title: 'Design new landing page',
    description: 'Create mockups for the new landing page',
    priority: 'high',
  },
  {
    id: '2',
    columnId: 'in_progress',
    title: 'Implement authentication',
    description: 'Add JWT authentication to the API',
    priority: 'medium',
  },
];

function App() {
  const [cards, setCards] = useState(initialCards);

  const handleCardMove = (cardId, fromColumn, toColumn, newIndex) => {
    setCards((prevCards) => {
      const card = prevCards.find((c) => c.id === cardId);
      if (!card) return prevCards;

      const updatedCard = { ...card, columnId: toColumn };
      const filtered = prevCards.filter((c) => c.id !== cardId);
      const targetColumnCards = filtered.filter((c) => c.columnId === toColumn);
      const otherCards = filtered.filter((c) => c.columnId !== toColumn);

      targetColumnCards.splice(newIndex, 0, updatedCard);
      return [...otherCards, ...targetColumnCards];
    });
  };

  return (
    <Kanban
      columns={columns}
      cards={cards}
      onCardMove={handleCardMove}
      themeMode="light"
    />
  );
}

export default App;
```

## Documentation

For full documentation, examples, and API reference, visit the [documentation site](#) or check the [example app](./example).

## Current Status

**Phase 1: Foundation** ✅ Complete

- Core components (KanbanBoard, KanbanColumn, KanbanCard)
- Theme system with light/dark modes
- TypeScript types and utilities
- Hooks API

**Coming Soon:**

- Phase 2: Drag & Drop with Reanimated 3
- Phase 3: Advanced animations and auto-scroll
- Phase 4: Supplementary UI components
- Phase 5: Polish and npm release

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License

MIT

---

Made with ❤️ by [Phuong Nguyen](https://github.com/wolf-tp)
