import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24']; // red, blue, green, yellow

const AnimatedBorderBox = () => {
  const controls = useAnimation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cycle = async () => {
      while (true) {
        await controls.start({
          borderColor: colors[index],
          transition: { duration: 0.6 },
        });
        setIndex((prev) => (prev + 1) % colors.length);
        await new Promise((res) => setTimeout(res, 600));
      }
    };

    cycle();
  }, [controls, index]);

  return (
    <motion.div
      animate={controls}
      initial={{ borderColor: colors[0] }}
      className="w-64 h-40 border-4 rounded-xl p-6 text-center  shadow-lg"
    >
      
    </motion.div>
  );
};

export default AnimatedBorderBox;
