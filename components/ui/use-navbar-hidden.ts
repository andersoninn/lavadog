"use client";

import * as React from "react";
import { SCREEN_INDEX_EVENT } from "@/components/ui/use-screen-index";

export function useNavbarHidden() {
  const [hidden, setHidden] = React.useState(false);
  const lastIndexRef = React.useRef(0);
  const lastScrollYRef = React.useRef(0);

  React.useEffect(() => {
    function handleScreenIndex(event: Event) {
      const index = (event as CustomEvent<number>).detail;
      if (index > lastIndexRef.current) setHidden(true);
      else if (index < lastIndexRef.current) setHidden(false);
      lastIndexRef.current = index;
    }

    function handleScroll() {
      const y = window.scrollY;
      if (y > lastScrollYRef.current && y > 10) setHidden(true);
      else if (y < lastScrollYRef.current) setHidden(false);
      lastScrollYRef.current = y;
    }

    window.addEventListener(SCREEN_INDEX_EVENT, handleScreenIndex);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener(SCREEN_INDEX_EVENT, handleScreenIndex);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return hidden;
}
