"use client";
import React, { useRef, useState, CSSProperties, useEffect } from "react";
import { motion } from "motion/react";

type Variant = "solid" | "border";

interface TextHoverVariantsProps {
  text: string;
  variant?: Variant;
  duration?: number;
}

export const TextHoverEffect = ({
  text,
  variant = "solid",
  duration = 0.3,
}: TextHoverVariantsProps) => {
  // Common states and refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [pos, setPos] = useState({ cx: "50%", cy: "50%" });
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Update mouse position for both variants
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
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      updatePosFromEvent(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Shared font size and style
  const textSizeStyle: CSSProperties = {
    fontSize: "clamp(3.25rem, 10vw, 8rem)",
    lineHeight: 1,
    fontWeight: 800,
    fontFamily: "'Inter', 'Helvetica', sans-serif",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  // -------------------
  // 🔹 VARIANT 1: SOLID
  // -------------------
  if (variant === "solid") {
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
        className="inline-block relative select-none"
        style={{ padding: "0.1rem 0.25rem" }}
      >
        {/* Base Text */}
        <div
          style={{
            ...textSizeStyle,
            color: "black",
            WebkitTextFillColor: "black",
          }}
          className="relative z-10"
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
            justifyContent: "center",
            zIndex: 20,
            ...overlayStyle,
          }}
          className="pointer-events-none"
        >
          {text}
        </motion.div>
      </div>
    );
  }

  // -------------------
  // 🔹 VARIANT 2: BORDER
  // -------------------
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 135"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "clamp(10rem, 80vw, 80rem)", height: "auto" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      className="select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Subtle Outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2.5"
        style={textSizeStyle}
        className="fill-transparent stroke-neutral-400"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Gradient border hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="2.5"
        mask="url(#textMask)"
        style={textSizeStyle}
        className="fill-transparent"
      >
        {text}
      </text>
    </svg>
  );
};
