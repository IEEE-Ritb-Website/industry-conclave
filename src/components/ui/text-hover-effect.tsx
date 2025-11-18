"use client";
import React, { useRef, useState, CSSProperties } from "react";
import { motion } from "motion/react";

interface TextHoverVariantsProps {
  text: string;
  duration?: number;
  className?: string;
}

export const TextHoverEffect = ({
  text,
  duration = 0.3,
  className = "",
}: TextHoverVariantsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ cx: "50%", cy: "50%" });
  const [hovered, setHovered] = useState(false);

  // Update mouse position
  const updatePosFromEvent = (clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cxPct = ((clientX - rect.left) / rect.width) * 100;
    const cyPct = ((clientY - rect.top) / rect.height) * 100;
    setPos({
      cx: `${Math.max(0, Math.min(100, cxPct))}%`,
      cy: `${Math.max(0, Math.min(100, cyPct))}%`,
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    updatePosFromEvent(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      updatePosFromEvent(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Shared font size and style
  const textSizeStyle: CSSProperties = {
    fontSize: "clamp(2.5rem, 10vw, 6rem)",
    lineHeight: 1,
    fontWeight: 800,
    fontFamily: "'Inter', 'Helvetica', sans-serif",
    userSelect: "none",
  };

  const overlayStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(90deg, #eab308 0%, #ef4444 25%, #3b82f6 50%, #06b6d4 75%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    WebkitMaskImage: `radial-gradient(circle at ${pos.cx} ${pos.cy}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0) 45%)`,
    maskImage: `radial-gradient(circle at ${pos.cx} ${pos.cy}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 10%, rgba(0,0,0,0) 45%)`,
    transition: `opacity ${duration}s ease, -webkit-mask-position ${duration}s linear`,
    pointerEvents: "none",
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      onTouchStart={() => setHovered(true)}
      onTouchMove={onTouchMove}
      onTouchEnd={() => setHovered(false)}
      className={`inline-block relative select-none ${className}`}
    >
      {/* Base Text */}
      <div
        style={{
          ...textSizeStyle,
        }}
        className="relative z-10 text-black dark:text-white"
      >
        {text}
      </div>

      {/* Gradient Hover Mask */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: duration, ease: "easeOut" }}
        style={{
          ...textSizeStyle,
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          zIndex: 20,
          ...overlayStyle,
        }}
        className="pointer-events-none"
      >
        {text}
      </motion.div>
    </div>
  );
};