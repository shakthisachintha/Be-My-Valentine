# Copilot Instructions for my-app

## Project Overview
React 19 + TypeScript + Vite 7 application with Tailwind CSS 4 and Motion for animations. Uses modern ESLint flat config and strict TypeScript settings.

## Tech Stack & Key Dependencies
- **Build System**: Vite 7 with Fast Refresh via `@vitejs/plugin-react`
- **Styling**: Tailwind CSS 4 (latest) with `@tailwindcss/vite` plugin
- **Animations**: Motion library (`motion` package, v12+)
- **React**: v19.2.0 with StrictMode enabled
- **TypeScript**: v5.9.3 with strict mode and all recommended linting flags

## Architecture
- **Single-page app** with entry point at `src/main.tsx`
- All source code lives in `src/` directory
- Vite serves from `index.html` in project root
- Build artifacts output to `dist/` (gitignored and ESLint-ignored)

## Development Workflows

### Running the app
```bash
npm run dev          # Start dev server with HMR
npm run build        # TypeScript check + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on codebase
```

### Build Process
The `build` script runs **TypeScript compilation first** (`tsc -b`) before Vite build. This ensures type errors fail the build early. Do not skip this step.

## Code Conventions

### TypeScript Configuration
- Uses **project references** via `tsconfig.json` that splits configs:
  - `tsconfig.app.json` for `src/` code (target: ES2022, jsx: react-jsx)
  - `tsconfig.node.json` for Vite config files
- **Strict mode enabled** with additional flags: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`
- Use `verbatimModuleSyntax` - avoid type-only imports unless necessary

### React Patterns
- Use **React 19 features** (e.g., `use` hook, enhanced Server Components readiness)
- Always wrap root in `<StrictMode>` (see `src/main.tsx`)
- Prefer functional components with hooks
- Import React hooks directly: `import { useState } from 'react'`

### Styling with Tailwind
- **Tailwind CSS 4** is integrated via Vite plugin (not PostCSS)
- Apply utility classes directly in JSX `className` props
- Example pattern from `App.tsx`: `className="flex flex-col items-center justify-center min-h-screen bg-gray-100"`
- Global styles in `src/index.css` include dark mode support via `color-scheme: light dark`

### ESLint Configuration
- Uses **flat config format** (`eslint.config.js`)
- Extends: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- Only lints `**/*.{ts,tsx}` files
- React Refresh plugin ensures Fast Refresh works correctly (warns on component export patterns)
- **Type-aware linting is NOT enabled** by default (would require `parserOptions.project`)

## Project-Specific Patterns

### Animation Library
- Use `motion` package (not Framer Motion) for animations
- Import from `motion` directly: `import { motion } from 'motion'`

### File Organization
- Components in `src/` (currently flat structure)
- Assets in `src/assets/`
- Global styles in `src/index.css` and `src/App.css`

## Important Notes

### React Compiler
React Compiler is **intentionally NOT enabled** due to performance impact on dev/build. Do not add it unless explicitly requested.

### Type Safety
All imports must have types available. The project uses `skipLibCheck: true` but still enforces strict typing in project code.

### Module Resolution
Uses `moduleResolution: "bundler"` which allows:
- `allowImportingTsExtensions` (can import `.tsx` explicitly)
- Modern ESNext module syntax
- Vite handles all bundling/resolution

## Common Tasks

### Adding a new component
1. Create `.tsx` file in `src/`
2. Use functional component with TypeScript types
3. Style with Tailwind utilities
4. Export default for main components

### Adding dependencies
- Runtime deps: `npm install <package>`
- Dev deps: `npm install -D <package>`
- Always check compatibility with React 19

### Debugging
- Use browser DevTools with Vite's source maps
- React DevTools supports React 19
- Check terminal for TypeScript/ESLint errors during dev
