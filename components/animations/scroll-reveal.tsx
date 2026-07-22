"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Direction = "up" | "left" | "right" | "none";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  start?: string;
};

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  start = "top 85%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const offset = OFFSETS[direction];
    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        x: offset.x,
        y: offset.y,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
