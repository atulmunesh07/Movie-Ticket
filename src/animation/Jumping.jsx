// SequentialLoadingDots.jsx
import React from 'react';
import { motion } from 'framer-motion';

const dotVariants = {
  animate: {
    y: [0, -12, 0],
  },
};

const SequentialLoadingDots = () => {
  return (
    <div className="flex items-center justify-center gap-2 h-screen">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.span
          key={i}
          className="w-4 h-4 bg-white rounded-full"
          variants={dotVariants}
          animate="animate"
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
            repeat: Infinity,
            delay,
          }}
        />
      ))}
    </div>
  );
};

export default SequentialLoadingDots;
