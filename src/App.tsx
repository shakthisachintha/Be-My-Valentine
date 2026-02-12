import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { throttle } from "lodash";
import {
  ResetButton,
  StarTrail,
  SuccessScreen,
  WarningScreen,
  MobileWarning,
} from "./components";
import type { Position, TrailParticle } from "./types";
import {
  CURSOR_DETECTION_DISTANCE,
  BUTTON_MOVE_DISTANCE,
  VIEWPORT_PADDING,
  TRAIL_CLEANUP_DELAY,
  EDGE_THRESHOLD,
  NO_BUTTON_SPRING,
  BUTTON_MOVE_COOLDOWN,
  STARS_PER_MOVE,
  WARNING_THRESHOLD,
} from "./constants";
import "./App.css";

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const [noAttempts, setNoAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const trailIdRef = useRef(0);

  // Memoized handlers
  const handleYes = useCallback(() => {
    setAccepted(true);
  }, []);

  const handleReset = useCallback(() => {
    setAccepted(false);
    setNoButtonPosition({ x: 0, y: 0 });
    setTrail([]);
    setNoAttempts(0);
    setShowWarning(false);
  }, []);

  // Create throttled function using useRef to avoid re-creating on every render
  // Throttle ensures the function runs at most once per cooldown period
  const throttledMoveButtonRef = useRef(
    throttle(
      (
        clientX: number,
        clientY: number,
        buttonRef: React.RefObject<HTMLButtonElement | null>,
        currentAccepted: boolean,
        currentPosition: Position,
        setPosition: (pos: Position) => void,
        addTrail: (particle: TrailParticle) => void,
      ) => {
        if (!buttonRef.current || currentAccepted) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(clientX - buttonCenterX, 2) +
            Math.pow(clientY - buttonCenterY, 2),
        );

        // If cursor is within detection distance of the button, move it away
        if (distance < CURSOR_DETECTION_DISTANCE) {
          const angle = Math.atan2(
            clientY - buttonCenterY,
            clientX - buttonCenterX,
          );

          // Calculate new position (move away from cursor)
          let newX = currentPosition.x - Math.cos(angle) * BUTTON_MOVE_DISTANCE;
          let newY = currentPosition.y - Math.sin(angle) * BUTTON_MOVE_DISTANCE;

          // Keep button within viewport bounds with padding
          const maxX = (window.innerWidth - rect.width) / 2 - VIEWPORT_PADDING;
          const maxY =
            (window.innerHeight - rect.height) / 2 - VIEWPORT_PADDING;

          newX = Math.max(-maxX, Math.min(maxX, newX));
          newY = Math.max(-maxY, Math.min(maxY, newY));

          // If button hits the edge, bounce it to a random visible position
          if (
            Math.abs(newX) >= maxX - EDGE_THRESHOLD ||
            Math.abs(newY) >= maxY - EDGE_THRESHOLD
          ) {
            newX = (Math.random() - 0.5) * maxX * 1.5;
            newY = (Math.random() - 0.5) * maxY * 1.5;
          }

          setPosition({ x: newX, y: newY });

          // Add multiple stars to trail for better visibility
          for (let i = 0; i < STARS_PER_MOVE; i++) {
            // Add slight randomness to star positions for natural look
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;
            addTrail({
              x: buttonCenterX + offsetX,
              y: buttonCenterY + offsetY,
              id: trailIdRef.current++,
            });
          }
        }
      },
      BUTTON_MOVE_COOLDOWN,
      {
        leading: false,
        trailing: true,
      },
    ),
  );

  // Check for warning threshold
  useEffect(() => {
    if (noAttempts >= WARNING_THRESHOLD) {
      setShowWarning(true);
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [noAttempts]);

  // Cleanup throttle on unmount
  useEffect(() => {
    const throttledFn = throttledMoveButtonRef.current;
    return () => {
      throttledFn.cancel();
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const prevPosition = { ...noButtonPosition };
      throttledMoveButtonRef.current(
        e.clientX,
        e.clientY,
        noButtonRef,
        accepted,
        noButtonPosition,
        (pos: Position) => {
          // Check if position actually changed
          if (pos.x !== prevPosition.x || pos.y !== prevPosition.y) {
            setNoAttempts((prev) => prev + 1);
          }
          setNoButtonPosition(pos);
        },
        (particle: TrailParticle) => setTrail((prev) => [...prev, particle]),
      );
    },
    [accepted, noButtonPosition],
  );

  // Clean up old trail particles
  useEffect(() => {
    if (trail.length === 0) return;

    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, TRAIL_CLEANUP_DELAY);

    return () => clearTimeout(timer);
  }, [trail.length]);

  // Early return for accepted state
  if (accepted) {
    return <SuccessScreen onReset={handleReset} />;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-pink-200 via-red-200 to-pink-300 overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <MobileWarning />
      <ResetButton onClick={handleReset} variant="light" />
      <StarTrail trail={trail} />
      {showWarning && <WarningScreen />}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-red-600 mb-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💝 Will you be my Valentine? 💝
        </motion.h1>
        <p className="text-xl text-gray-700">Choose wisely... 😏</p>
      </motion.div>

      <div className="flex gap-8 relative">
        {/* Yes Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYes}
          className="px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          Yes! 💚
        </motion.button>

        {/* No Button - Runs Away */}
        <motion.button
          ref={noButtonRef}
          animate={{
            x: noButtonPosition.x,
            y: noButtonPosition.y,
          }}
          transition={{
            type: "spring",
            ...NO_BUTTON_SPRING,
          }}
          className="px-8 py-4 bg-red-500 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-red-600 transition-colors cursor-pointer"
        >
          No 😈
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-gray-600 text-sm"
      >
        (Psst... try clicking "No" if you dare 😉)
      </motion.p>
    </div>
  );
}

export default App;
