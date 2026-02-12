import { memo } from "react";
import { motion } from "motion/react";
import type { TrailParticle } from "../types";

interface StarTrailProps {
  trail: TrailParticle[];
}

export const StarTrail = memo(({ trail }: StarTrailProps) => (
  <>
    {trail.map((star) => (
      <motion.div
        key={star.id}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute pointer-events-none text-2xl"
        style={{
          left: star.x,
          top: star.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        ⭐
      </motion.div>
    ))}
  </>
));

StarTrail.displayName = "StarTrail";
