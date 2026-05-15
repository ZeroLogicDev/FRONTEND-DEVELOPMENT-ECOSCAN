import { useState, useEffect } from 'react';

/**
 * Hook to debounce a value.
 * Useful for search inputs to avoid firing API calls on every keystroke.
 *
 * @param {*} value - The value to debounce
 * @param {number} [delay=300] - Debounce delay in ms
 * @returns {*} The debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
