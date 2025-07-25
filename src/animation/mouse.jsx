import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const colors = ["#f87171", "#60a5fa", "#34d399", "#fbbf24"]; // red, blue, green, yellow

export default function CustomCursor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[9999] w-full h-full">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          animate={{
            x: mouse.x - 10,
            y: mouse.y - 10,
            scale: 1 + i * 0.4,
            opacity: 0.4,
          }}
          transition={{
            type: "spring",
            stiffness: 100 - i * 10,
            damping: 20 + i * 5,
          }}
          style={{
            width: 20,
            height: 20,
            backgroundColor: color,
            mixBlendMode: "screen",
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}
