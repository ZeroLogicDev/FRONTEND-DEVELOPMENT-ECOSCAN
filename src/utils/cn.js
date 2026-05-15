import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 *
 * @param  {...(string|object|array)} inputs - Class names, objects, or arrays
 * @returns {string} Merged class string
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-eco-500', 'px-6') // → 'py-2 bg-eco-500 px-6'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
