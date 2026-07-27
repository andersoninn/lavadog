"use client";

import * as React from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
};

export function ScrollReveal({
  children,
  className,
  y = 40,
  scale = 1,
  duration = 0.8,
  stagger = 0.15,
  ease = "power2.out",
  start = "top 85%",
}: ScrollRevealProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const targets = gsap.utils.toArray<HTMLElement>(":scope > *", container);
    if (targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y, scale });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        gsap.to(targets, { opacity: 1, y: 0, scale: 1, duration, stagger, ease });
      },
    });

    return () => trigger.kill();
  }, [y, scale, duration, stagger, ease, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
