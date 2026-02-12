# Project Structure

This Valentine's Day app has been refactored following React best practices with a clean, modular architecture.

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── index.ts        # Barrel export for easy imports
│   ├── ResetButton.tsx # Reset button component (used in multiple places)
│   ├── StarTrail.tsx   # Animated star trail particles
│   └── SuccessScreen.tsx # Success screen after "Yes" is clicked
├── constants/          # App-wide constants
│   └── index.ts       # Animation settings, distances, thresholds
├── types/             # TypeScript type definitions
│   └── index.ts      # Position, TrailParticle interfaces
├── App.tsx           # Main app component
├── App.css           # App styles
└── main.tsx         # Entry point

```

## 🎯 Component Organization

### Reusable Components (`/components`)

- **`ResetButton`** - Used in both main screen and success screen with different variants
  - Props: `onClick`, `variant` ("light" | "dark")
  - Memoized for performance
  
- **`StarTrail`** - Renders animated star particles
  - Props: `trail` (array of particles)
  - Memoized to prevent unnecessary re-renders
  
- **`SuccessScreen`** - Full screen displayed after acceptance
  - Props: `onReset`
  - Includes ResetButton and animations

### Types (`/types`)

- **`Position`** - x/y coordinate interface
- **`TrailParticle`** - Extends Position with unique id

### Constants (`/constants`)

All magic numbers extracted into named constants:
- `CURSOR_DETECTION_DISTANCE` - How close cursor triggers button movement
- `BUTTON_MOVE_DISTANCE` - How far button moves away
- `VIEWPORT_PADDING` - Buffer from screen edges
- `TRAIL_CLEANUP_DELAY` - Star particle lifetime
- `EDGE_THRESHOLD` - When to teleport button
- `NO_BUTTON_SPRING` - Animation spring settings

## 🚀 Benefits of This Structure

1. **Reusability** - Components can be easily imported and reused
2. **Maintainability** - Clear separation of concerns
3. **Testability** - Each component can be tested in isolation
4. **Type Safety** - Centralized type definitions
5. **DRY Principle** - No duplicate code, constants defined once
6. **Scalability** - Easy to add new components/features

## 📦 Import Patterns

```tsx
// Barrel exports make imports clean
import { ResetButton, StarTrail, SuccessScreen } from "./components";
import type { Position, TrailParticle } from "./types";
import { CURSOR_DETECTION_DISTANCE, NO_BUTTON_SPRING } from "./constants";
```

## 🎨 Component Hierarchy

```
App
├── SuccessScreen (conditional)
│   └── ResetButton (dark variant)
└── Main Screen (conditional)
    ├── ResetButton (light variant)
    ├── StarTrail
    ├── Valentine Question
    ├── Yes Button
    └── No Button (animated)
```
