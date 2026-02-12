import { memo } from "react";
import { motion } from "motion/react";
import { ResetButton } from "./ResetButton";

interface SuccessScreenProps {
  onReset: () => void;
}

export const SuccessScreen = memo(({ onReset }: SuccessScreenProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-pink-400 via-red-400 to-pink-500 relative">
    <ResetButton onClick={onReset} variant="dark" />
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
      className="text-center"
    >
      <motion.h1
        className="text-6xl md:text-8xl font-bold text-white mb-6"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        💖 Yay! 💖
      </motion.h1>
      <motion.p
        className="text-2xl md:text-3xl text-white font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        I knew you'd say yes! 🎉
      </motion.p>
    </motion.div>
  </div>
));

SuccessScreen.displayName = "SuccessScreen";
