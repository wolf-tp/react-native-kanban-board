# Example App - React Native Kanban Board

This example demonstrates the basic usage of the `react-native-kanban-board` library.

## Features Demonstrated

- ✅ **Basic Kanban Board** - 4 columns (New, Pending, In Progress, Done)
- ✅ **Card Management** - 8 sample cards with priorities and labels
- ✅ **Theme Switching** - Toggle between light and dark themes
- ✅ **Drag & Drop** - Move and reorder cards (Phase 2 - Coming Soon)
- ✅ **Responsive Design** - Works on all screen sizes

## Running the Example

### Prerequisites

This example app requires:
- **react-native-gesture-handler** (~2.20.2)
- **react-native-reanimated** (~3.16.7)

These are already included in `example/package.json`.

### Install Dependencies

```bash
# From the root directory
yarn install

# Or using npm
npm install
```

**Note:** If you're using a fresh checkout, make sure to install dependencies in both root and example folders.

### Run on iOS

```bash
# From root directory
yarn example ios

# Or directly from example folder
cd example
npx expo start --ios
```

### Run on Android

```bash
# From root directory
yarn example android

# Or directly from example folder
cd example
npx expo start --android
```

### Troubleshooting

**If you see errors about Reanimated:**
1. Clear cache: `npx expo start --clear`
2. Restart Metro bundler
3. Make sure `react-native-reanimated/plugin` is in babel.config.js

**If you see errors about Gesture Handler:**
1. Make sure package is installed: `yarn add react-native-gesture-handler`
2. Restart the development server

## Code Structure

```
example/src/
├── App.tsx          # Main app component
├── data.ts          # Sample columns and cards data
└── README.md        # This file
```

## Key Concepts

### 1. Basic Setup

```tsx
import { Kanban } from 'react-native-kanban-board';

<Kanban
  columns={columns}
  cards={cards}
  onCardMove={handleCardMove}
  onCardReorder={handleCardReorder}
  themeMode="light"
/>
```

### 2. Column Configuration

```tsx
const columns = [
  { id: 'new', title: 'New', color: '#3B82F6' },
  { id: 'pending', title: 'Pending', color: '#F59E0B' },
  // ...
];
```

### 3. Card Data

```tsx
const cards = [
  {
    id: '1',
    columnId: 'new',
    title: 'Task Title',
    description: 'Task description',
    priority: 'high',
    labels: ['frontend', 'urgent'],
  },
];
```

### 4. Handling Card Moves

```tsx
const handleCardMove = (cardId, fromColumn, toColumn, newIndex) => {
  setCards((prevCards) => {
    // Update card's columnId
    // Reorder cards array
    // Return new array
  });
};
```

### 5. Theme Switching

```tsx
const [themeMode, setThemeMode] = useState('light');

<Kanban themeMode={themeMode} />
```

## Learn More

- [Main README](../README.md)
- [API Documentation](../README.md#api-reference)
- [TypeScript Types](../src/types/)

## Support

For issues or questions, please visit:
https://github.com/wolf-tp/react-native-kanban-board/issues
