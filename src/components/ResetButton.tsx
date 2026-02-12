import { memo } from "react";
import { motion } from "motion/react";

interface ResetButtonProps {
  onClick: () => void;
  variant?: "light" | "dark";
}

export const ResetButton = memo(({ onClick, variant = "light" }: ResetButtonProps) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    onClick={onClick}
    className={`absolute top-4 right-4 px-4 py-2 rounded-lg backdrop-blur-sm transition-colors ${
      variant === "light"
        ? "bg-white/50 hover:bg-white/70 text-gray-800 font-semibold"
        : "bg-white/20 hover:bg-white/30 text-white"
    }`}
  >
    ↻ Reset
  </motion.button>
));

ResetButton.displayName = "ResetButton";
