"use client";

import * as React from "react";

export const SCREEN_INDEX_EVENT = "lavadog:screen-index";

export function emitScreenIndex(index: number) {
  window.dispatchEvent(new CustomEvent<number>(SCREEN_INDEX_EVENT, { detail: index }));
}

export function useIsAtHeroTop() {
  const [atTop, setAtTop] = React.useState(true);

  React.useEffect(() => {
    function handleScreenIndex(event: Event) {
      const index = (event as CustomEvent<number>).detail;
      setAtTop(index === 0);
    }

    window.addEventListener(SCREEN_INDEX_EVENT, handleScreenIndex);
    return () => window.removeEventListener(SCREEN_INDEX_EVENT, handleScreenIndex);
  }, []);

  return atTop;
}
