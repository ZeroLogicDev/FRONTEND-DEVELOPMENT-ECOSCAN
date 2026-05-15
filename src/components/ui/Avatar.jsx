import { cn } from '@/utils/cn';

/**
 * User avatar component with fallback to initials.
 *
 * @param {Object} props
 * @param {string} [props.name]
 * @param {string} [props.src] - Image URL
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} [props.className]
 */
export default function Avatar({ name, src, size = 'md', className }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  };

  // Get initials from name
  function getInitials(fullName) {
    if (!fullName) return '?';
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'User avatar'}
        className={cn(
          'rounded-full object-cover ring-2 ring-surface-200 dark:ring-surface-700',
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br from-eco-400 to-eco-600 text-white font-semibold flex items-center justify-center ring-2 ring-surface-200 dark:ring-surface-700',
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
