# Installation Guide

Complete installation guide for `react-native-kanban-board`.

## Table of Contents

- [Basic Installation](#basic-installation)
- [Peer Dependencies](#peer-dependencies)
- [Expo Projects](#expo-projects)
- [Bare React Native Projects](#bare-react-native-projects)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

---

## Basic Installation

Install the library:

```bash
# Using yarn
yarn add react-native-kanban-board

# Using npm
npm install react-native-kanban-board
```

## Peer Dependencies

This library requires the following peer dependencies:

- `react-native-reanimated` (>= 3.0.0) - **Required for Phase 2+**
- `react-native-gesture-handler` (>= 2.9.0) - **Required for Phase 2+**

### Current Status (Phase 1)

**Phase 1** (current) does not require drag & drop functionality, so these are **optional** for now. However, to run the example app or prepare for Phase 2, you should install them:

```bash
yarn add react-native-reanimated react-native-gesture-handler
```

---

## Expo Projects

### 1. Install Dependencies

```bash
# Install the library
yarn add react-native-kanban-board

# Install peer dependencies
npx expo install react-native-reanimated react-native-gesture-handler
```

### 2. Configure Babel

Add Reanimated plugin to your `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Must be last!
    ],
  };
};
```

### 3. Clear Cache

```bash
npx expo start --clear
```

### 4. Usage

```tsx
import { Kanban } from 'react-native-kanban-board';

function App() {
  return (
    <Kanban
      columns={columns}
      cards={cards}
      onCardMove={handleCardMove}
      themeMode="light"
    />
  );
}
```

---

## Bare React Native Projects

### 1. Install Dependencies

```bash
# Install the library
yarn add react-native-kanban-board

# Install peer dependencies
yarn add react-native-reanimated react-native-gesture-handler
```

### 2. iOS Setup

```bash
cd ios
pod install
cd ..
```

### 3. Configure Babel

Add to your `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be last!
  ],
};
```

### 4. Android Setup

No additional setup needed for Android.

### 5. Configure Gesture Handler

Add to the **top** of your root component (e.g., `index.js` or `App.tsx`):

```tsx
import 'react-native-gesture-handler';
```

### 6. Clear Cache and Rebuild

```bash
# Clear Metro cache
yarn start --reset-cache

# Rebuild iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Rebuild Android
npx react-native run-android
```

---

## Verification

Test that the library is properly installed:

```tsx
import React, { useState } from 'react';
import { Kanban, DEFAULT_COLUMNS } from 'react-native-kanban-board';

const testCards = [
  {
    id: '1',
    columnId: 'new',
    title: 'Test Card',
    description: 'If you see this, installation worked!',
  },
];

export default function App() {
  const [cards, setCards] = useState(testCards);

  return (
    <Kanban
      columns={DEFAULT_COLUMNS}
      cards={cards}
      onCardMove={(cardId, from, to, index) => {
        console.log('Card moved:', { cardId, from, to, index });
      }}
    />
  );
}
```

If you see a Kanban board with one card, installation was successful! ✅

---

## Troubleshooting

### Error: "Cannot find module 'react-native-reanimated'"

**Solution:**
```bash
yarn add react-native-reanimated
```

Then clear cache:
```bash
# Expo
npx expo start --clear

# Bare RN
yarn start --reset-cache
```

### Error: "Reanimated 2 failed to create a worklet"

**Solution:** Make sure `react-native-reanimated/plugin` is in your `babel.config.js` and is **the last plugin**.

```js
plugins: [
  // ... other plugins
  'react-native-reanimated/plugin', // Must be last!
],
```

Then restart:
```bash
# Clear cache
yarn start --reset-cache

# Rebuild
npx react-native run-ios  # or run-android
```

### Error: "Invalid hook call"

**Solution:** Make sure you're using compatible versions:
- React >= 18.0.0
- React Native >= 0.70.0

Check your `package.json`:
```bash
yarn why react
yarn why react-native
```

### TypeScript Errors

**Solution:** Make sure TypeScript can find the types:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

### Metro Bundler Issues

**Solution:** Clear all caches:
```bash
# Clear Metro
yarn start --reset-cache

# Clear Watchman
watchman watch-del-all

# Clear temp files
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*

# Reinstall node_modules
rm -rf node_modules
yarn install
```

---

## Need Help?

- 📖 [Main README](./README.md)
- 🐛 [Report Issues](https://github.com/wolf-tp/react-native-kanban-board/issues)
- 💬 [Discussions](https://github.com/wolf-tp/react-native-kanban-board/discussions)
- 📚 [Example App](./example)

---

## Next Steps

After successful installation:

1. ✅ Check out the [Example App](./example) for complete implementation
2. ✅ Read the [API Documentation](./README.md#api-reference)
3. ✅ Customize the theme with `createTheme()`
4. ✅ Implement your own card designs with `renderCard`

Happy coding! 🚀
