import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768; // px — matches Tailwind's md breakpoint

/**
 * Hook to detect if the current viewport is mobile.
 * Uses window.matchMedia for performance (no resize event spam).
 *
 * @returns {boolean} true if viewport width < 768px
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    function handleChange(e) {
      setIsMobile(e.matches);
    }

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}
