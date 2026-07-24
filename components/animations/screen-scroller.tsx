"use client";

import * as React from "react";
import { gsap, Observer } from "@/lib/gsap";
import {
  emitScreenIndex,
  SCREEN_INDEX_REQUEST_EVENT,
} from "@/components/ui/use-screen-index";

type ScreenScrollerProps = {
  children: React.ReactNode;
};

export function ScreenScroller({ children }: ScreenScrollerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const screens = React.Children.toArray(children);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const screenEls = gsap.utils.toArray<HTMLElement>(".screen", container);
    const outers = gsap.utils.toArray<HTMLElement>(".screen-outer", container);
    const inners = gsap.utils.toArray<HTMLElement>(".screen-inner", container);
    const lastIndex = screenEls.length - 1;

    let currentIndex = 0;
    let animating = false;

    gsap.set(inners, { yPercent: -100 });
    gsap.set(outers, { yPercent: 100 });
    gsap.set([outers[0], inners[0]], { yPercent: 0 });
    emitScreenIndex(0);

    function handleReEntry() {
      const top = container!.offsetTop;
      if (window.scrollY <= top) {
        window.scrollTo({ top, behavior: "auto" });
        window.removeEventListener("scroll", handleReEntry);
        observer.enable();
      }
    }

    function exitToNativeScroll() {
      observer.disable();
      window.addEventListener("scroll", handleReEntry, { passive: true });
    }

    function handleScreenIndexRequest(event: Event) {
      if (animating) return;
      const target = (event as CustomEvent<number>).detail;
      if (target < 0 || target > lastIndex) return;

      window.removeEventListener("scroll", handleReEntry);
      observer.enable();
      window.scrollTo({ top: container!.offsetTop, behavior: "auto" });

      const direction = target >= currentIndex ? 1 : -1;
      gotoScreen(target, direction);
    }

    function gotoScreen(index: number, direction: 1 | -1) {
      if (index === currentIndex || index < 0 || index > lastIndex) return;
      animating = true;

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
        },
      });

      gsap.set(screenEls[currentIndex], { zIndex: 0 });
      tl.set(screenEls[currentIndex], { autoAlpha: 0 }, 0.5);

      gsap.set(screenEls[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outers[index], inners[index]],
        { yPercent: (i) => (i ? -100 * direction : 100 * direction) },
        { yPercent: 0 },
        0,
      );

      currentIndex = index;
      emitScreenIndex(index);
    }

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onUp: () => {
        if (animating) return;
        if (currentIndex >= lastIndex) {
          exitToNativeScroll();
          return;
        }
        gotoScreen(currentIndex + 1, 1);
      },
      onDown: () => !animating && gotoScreen(currentIndex - 1, -1),
    });

    window.addEventListener(SCREEN_INDEX_REQUEST_EVENT, handleScreenIndexRequest);

    return () => {
      observer.kill();
      window.removeEventListener("scroll", handleReEntry);
      window.removeEventListener(SCREEN_INDEX_REQUEST_EVENT, handleScreenIndexRequest);
    };
  }, [screens.length]);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {screens.map((child, index) => (
        <div
          key={index}
          className={
            index === 0
              ? "screen absolute inset-0 z-10 visible opacity-100"
              : "screen invisible absolute inset-0 z-0 opacity-0"
          }
        >
          <div className="screen-outer absolute inset-0 overflow-hidden">
            <div className="screen-inner absolute inset-0 h-full w-full">
              {child}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
