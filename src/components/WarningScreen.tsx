import { motion } from "motion/react";

export const WarningScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="text-center"
      >
        <motion.img
          src="/cat-gun.png"
          alt="Warning cat"
          className="w-64 h-64 object-contain mx-auto mb-6"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-red-500 mb-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          DON'T MESS WITH ME! 😾
        </motion.h2>
        <p className="text-white text-xl">
          Choose "Yes" or face the consequences...
        </p>
      </motion.div>
    </motion.div>
  );
};
