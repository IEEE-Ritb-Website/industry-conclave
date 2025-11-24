"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingLogos = ({
  logos = defaultLogos,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  logos?: {
    name: string;
    image: string;
    alt?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative opacity-30 z-20 w-full overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50%));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) linear infinite;
          animation-direction: var(--animation-direction, forwards);
        }
      `}</style>
      
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:paused"
        )}
      >
        {logos.map((logo, idx) => (
          <li
            className="relative flex h-24 w-40 shrink-0 items-center justify-center rounded-xl bg-white px-6 py-4 transition-all hover:shadow-lg dark:bg-neutral-950"
            key={`${logo.name}-${idx}`}
          >
            <img
              src={logo.image}
              alt={logo.alt || logo.name}
              className="h-full w-full object-contain grayscale transition-all duration-300 dark:brightness-0 dark:invert"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example usage with popular tech company logos
export const defaultLogos = [
  {
    name: "TCS",
    image: "https://be.tricentis.com/media-assets/2024/04/TCS_NewLogo_Final_CMYK_Black.png",
    alt: "TCS Logo",
  },
  {
    name: "AWS",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png",
    alt: "AWS Logo",
  },
  {
    name: "Samsung Research",
    image: "https://pngimg.com/d/samsung_logo_PNG14.png",
    alt: "Samsung Research Logo",
  },
  {
    name: "Centre for Development of Advanced Computing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Logo_for_the_Centre_for_Development_of_Advanced_Computing.svg/640px-Logo_for_the_Centre_for_Development_of_Advanced_Computing.svg.png",
    alt: "Logo",
  },
  {
    name: "S-Vyasa",
    image: "https://f2.leadsquaredcdn.com/t/t20250124170053/content/common/images/S-VYASA%20Logo.png",
    alt: "Logo",
  },
  {
    name: "Perfios",
    image: "https://perfios.ai/wp-content/uploads/2025/07/Perfios-New-Logo-with-Tagline-3-768x355.png",
    alt: "Logo",
  },
  {
    name: "Katidhan",
    image: "https://image.pitchbook.com/rJRZi59GE6FufR8O1nsAWiadZwB1722864132140_200x200",
    alt: "Logo",
  },
  {
    name: "Boeing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Boeing_full_logo.svg/1200px-Boeing_full_logo.svg.png",
    alt: "Logo",
  },
  {
    name: "HCLTech",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/HCLTech-new-logo.svg/1280px-HCLTech-new-logo.svg.png",
    alt: "Logo",
  },
  {
    name: "arm",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Arm_logo_2017.svg/1200px-Arm_logo_2017.svg.png",
    alt: "Logo",
  },
  {
    name: "Google",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    alt: "Logo",
  },
];