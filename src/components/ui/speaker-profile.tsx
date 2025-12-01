"use client";

import Image from "next/image";
import { StaticImageData } from "next/image";

interface SpeakerProfileProps {
  name: string;
  imageSrc: string | StaticImageData;
  size?: "sm" | "md" | "lg";
}

export default function SpeakerProfile({ name, imageSrc, size = "sm" }: SpeakerProfileProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  return (
    <div className="flex items-center gap-2 mb-3">
      <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700`}>
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 32px, 40px"
        />
      </div>
      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        {name}
      </span>
    </div>
  );
}