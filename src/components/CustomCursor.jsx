import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by half of cursor size (16px for w-8)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Detect interactive elements since global cursor style will be "none"
      const isInteractive = target.closest(
        'a, button, input, select, textarea, label, summary, [role="button"], .cursor-pointer'
      );

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isPressed ? 0.75 : (isHovered ? 1.75 : 1),
        backgroundColor: isHovered 
          ? "rgba(99, 102, 241, 0.15)" 
          : "rgba(99, 102, 241, 0)",
        borderColor: isHovered 
          ? "rgba(20, 184, 166, 1)" 
          : "rgba(99, 102, 241, 0.6)",
        borderWidth: isHovered ? "2px" : "1.5px",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};

export default CustomCursor;
