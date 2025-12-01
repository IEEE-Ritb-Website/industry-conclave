"use client";

import { cn } from "@/lib/utils";

interface TrackLabelProps {
  track: "Software" | "Hardware" | "General" | "Workshop";
  className?: string;
}

const trackConfig = {
  Software: {
    color: "border-blue-500 text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30"
  },
  Hardware: {
    color: "border-orange-500 text-orange-600 dark:text-orange-400", 
    bg: "bg-orange-50 dark:bg-orange-950/30"
  },
  General: {
    color: "border-green-500 text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30"
  },
  Workshop: {
    color: "border-purple-500 text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30"
  }
};

export default function TrackLabel({ track, className }: TrackLabelProps) {
  const config = trackConfig[track];

  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-l-4 border-r border-t border-b",
      config.color,
      config.bg,
      className
    )}>
      {track}
    </div>
  );
}