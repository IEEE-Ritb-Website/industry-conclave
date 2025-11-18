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
        "scroller relative z-20 w-full overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
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
    name: "OpenAI",
    image: "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
    alt: "OpenAI Logo",
  },
  {
    name: "TCS",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Tata_Consultancy_Services_Logo.svg",
    alt: "TCS Logo",
  },
  {
    name: "Google",
    image: "https://cdn.worldvectorlogo.com/logos/google-icon.svg",
    alt: "Google Logo",
  },
  {
    name: "Microsoft",
    image: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
    alt: "Microsoft Logo",
  },
  {
    name: "Amazon",
    image: "https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg",
    alt: "Amazon Logo",
  },
  {
    name: "Meta",
    image: "https://cdn.worldvectorlogo.com/logos/meta-1.svg",
    alt: "Meta Logo",
  },
  {
    name: "Apple",
    image: "https://cdn.worldvectorlogo.com/logos/apple-11.svg",
    alt: "Apple Logo",
  },
  {
    name: "Netflix",
    image: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg",
    alt: "Netflix Logo",
  },
];