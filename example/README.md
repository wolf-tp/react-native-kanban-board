# Example App - React Native Kanban Board

This example demonstrates the basic usage of the `react-native-kanban-board` library.

## Features Demonstrated

- ✅ **Basic Kanban Board** - 4 columns (New, Pending, In Progress, Done)
- ✅ **Card Management** - 8 sample cards with priorities and labels
- ✅ **Theme Switching** - Toggle between light and dark themes
- ✅ **Drag & Drop** - Move and reorder cards (Phase 2 - Coming Soon)
- ✅ **Responsive Design** - Works on all screen sizes

## Running the Example

### Install Dependencies

```bash
# From the root directory
yarn install

# Or using npm
npm install
```

### Run on iOS

```bash
yarn example ios

# Or
npm run example ios
```

### Run on Android

```bash
yarn example android

# Or
npm run example android
```

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
