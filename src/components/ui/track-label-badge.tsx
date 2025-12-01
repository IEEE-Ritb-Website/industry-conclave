"use client";

import { cn } from "@/lib/utils";
import { Cpu, CircuitBoard, Sparkles } from "lucide-react";

interface TrackLabelProps {
  track: "software" | "hardware" | "general";
  className?: string;
}

const trackConfig = {
  software: {
    color: "text-blue-600 dark:text-blue-400 border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: Cpu
  },
  hardware: {
    color: "text-green-600 dark:text-green-400 border-green-500", 
    bg: "bg-green-50 dark:bg-green-950/30",
    icon: CircuitBoard
  },
  general: {
    color: "text-purple-600 dark:text-purple-400 border-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    icon: Sparkles
  }
};

export default function TrackLabel({ track, className }: TrackLabelProps) {
  const config = trackConfig[track];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border",
      config.color,
      config.bg,
      className
    )}>
      <Icon size={12} />
      <span className="capitalize">{track}</span>
    </div>
  );
}