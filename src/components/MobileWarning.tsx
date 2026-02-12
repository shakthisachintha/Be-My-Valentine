import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const isMobileDevice = mobileKeywords.test(userAgent) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-linear-to-br from-pink-100 to-red-100 rounded-3xl shadow-2xl p-8 max-w-md text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            💻
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Best Viewed on Desktop
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            This interactive experience works best on desktop browsers where you can use your mouse to play! 
            <span className="block mt-2 text-sm text-gray-500">
              (Mobile works too, but it's not as fun 😉)
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDismissed(true)}
            className="w-full px-6 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            Continue Anyway 💝
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
