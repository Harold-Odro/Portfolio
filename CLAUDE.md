# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite, port 5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

This is a React 19 portfolio site using Vite 7, Tailwind CSS 4, and Framer Motion.

### Routing & Entry Points

- `src/App.jsx` - Router setup with lazy-loaded pages wrapped in ErrorBoundary
- Two routes: `/` (Homepage) and `/projects` (ProjectsPage)
- Pages are lazy-loaded with error recovery fallbacks

### Key Patterns

**Loading Flow**: Homepage shows `LoadingPage` on first visit (tracked via sessionStorage), then transitions to content with AnimatePresence.

**Custom Text Effects**:
- `DecryptedText` - Text scrambling effect, triggers on hover or view (IntersectionObserver). Configurable speed, iterations, and reveal direction.
- `RotatingText` - Cycles through text array with staggered character animations. Exposes imperative methods via ref (next, previous, jumpTo, reset).

**Shared Hooks** (`src/hooks/useWindowSize.js`):
- `useWindowSize()` - Returns `{ width, height }`
- `useIsMobile(breakpoint)` - Boolean responsive check

**Design Tokens** (`src/utils/constants.js`):
- Breakpoints, animation durations/delays, Framer Motion presets, z-index layers

**Project Data**: Centralized in `src/data/projects.js` - add new projects to `projectsData` object by category.

### ESLint Configuration

Uses ESLint 9 flat config with react-hooks and react-refresh plugins. Custom `no-unused-vars` rule ignores variables starting with `_`, capital letters, and motion/AnimatePresence imports.
