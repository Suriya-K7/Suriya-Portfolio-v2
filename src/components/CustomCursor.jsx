import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by half of cursor size (e.g. 16px for w-8)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 1.6 : 1,
        backgroundColor: isHovered ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0)",
        borderColor: isHovered ? "rgba(99, 102, 241, 1)" : "rgba(99, 102, 241, 0.4)",
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
};

export default CustomCursor;
