// Design Tokens and Configuration Constants

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

// Animation delays (in seconds)
export const ANIMATION_DELAYS = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  veryLong: 0.6,
};

// Framer Motion transition presets
export const TRANSITIONS = {
  spring: { type: 'spring', damping: 25, stiffness: 300 },
  smooth: { type: 'tween', ease: 'easeInOut' },
  bounce: { type: 'spring', bounce: 0.5 },
};

// Rotation intervals (in milliseconds)
export const ROTATION_INTERVALS = {
  fast: 1500,
  normal: 2000,
  slow: 3000,
};

// Loading configuration
export const LOADING = {
  simulatedDelay: 2000, // milliseconds
  progressUpdateInterval: 100, // milliseconds
};

// DecryptedText configuration
export const DECRYPT_TEXT = {
  speed: {
    mobile: 50,
    desktop: 80,
  },
  maxIterations: {
    mobile: 10,
    desktop: 20,
  },
};

// Z-index layers
export const Z_INDEX = {
  behind: -10,
  base: 0,
  navbar: 50,
  modal: 100,
  tooltip: 200,
};
