import { useEffect, useRef } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollLockReturn {
  scrollTo: (x: number, y: number) => void;
  getScrollPosition: () => ScrollPosition;
}

export const useScrollLock = (isLocked: boolean): UseScrollLockReturn => {
  const scrollPosition = useRef<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (isLocked) {
      scrollPosition.current = {
        x: window.scrollX,
        y: window.scrollY,
      };

      const preventScroll = (e: Event): false => {
        e.preventDefault();
        e.stopPropagation();

        window.scrollTo(scrollPosition.current.x, scrollPosition.current.y);

        return false;
      };

      const preventKeyScroll = (e: KeyboardEvent): boolean | void => {
        const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        if (scrollKeys.includes(e.keyCode)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      };

      window.addEventListener("scroll", preventScroll, { passive: false });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });

      return () => {
        window.removeEventListener("scroll", preventScroll);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventKeyScroll);
      };
    }
  }, [isLocked]);

  const scrollTo = (x: number, y: number): void => {
    if (!isLocked) {
      window.scrollTo(x, y);
    }
  };

  const getScrollPosition = (): ScrollPosition => scrollPosition.current;

  return {
    scrollTo,
    getScrollPosition,
  };
};
