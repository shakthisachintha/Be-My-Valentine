// Animation and interaction constants
export const CURSOR_DETECTION_DISTANCE = 150;
export const BUTTON_MOVE_DISTANCE = 250;
export const VIEWPORT_PADDING = 50;
export const TRAIL_CLEANUP_DELAY = 150; // How often to remove one star
export const EDGE_THRESHOLD = 10;
export const BUTTON_MOVE_COOLDOWN = 200; // Milliseconds between moves
export const STARS_PER_MOVE = 10; // Number of stars to create per move
export const WARNING_THRESHOLD = 12; // Show warning after this many No attempts

// Spring animation settings
export const NO_BUTTON_SPRING = {
  stiffness: 150,
  damping: 25,
};
