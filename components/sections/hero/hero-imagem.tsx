"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { HeroBadge } from "@/components/sections/hero/hero-badge";
import { gsap } from "@/lib/gsap";

export function HeroDesktopImagem() {
  const hoverRef = useRef<HTMLDivElement>(null);
  const imageFloatRef = useRef<HTMLDivElement>(null);
  const badgeFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = hoverRef.current;
    const imageEl = imageFloatRef.current;
    const badgeEl = badgeFloatRef.current;
    if (
      !scope ||
      !imageEl ||
      !badgeEl ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(imageEl, {
        y: -10,
        rotate: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(badgeEl, {
        x: 5,
        y: -8,
        rotate: -1.4,
        duration: 2.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const el = hoverRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      x: x * 12,
      y: y * 10,
      rotate: x * 1.2,
      duration: 0.45,
      ease: "power3.out",
    });
  }

  function handleMouseLeave() {
    const el = hoverRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.45)",
    });
  }

  return (
    <div className="flex justify-center lg:w-[200%] lg:translate-x-[-10%] lg:justify-start">
      <div
        ref={hoverRef}
        className="relative w-full max-w-none will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={imageFloatRef} className="relative will-change-transform">
          <img
            src="/images/heroDog1.png"
            alt="Cachorro da LavaDog Store"
            className="w-full object-cover lg:w-full"
          />
        </div>

        <div
          ref={badgeFloatRef}
          className="absolute left-0 top-14 z-20 will-change-transform sm:left-2 sm:top-16 md:left-1 md:top-20 lg:left-3 lg:top-24"
        >
          <HeroBadge />
        </div>
      </div>
    </div>
  );
}
