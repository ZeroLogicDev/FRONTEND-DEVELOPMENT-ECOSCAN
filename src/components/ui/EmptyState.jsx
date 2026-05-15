import { Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Empty state placeholder for lists/tables with no data.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {import('react').ReactNode} [props.icon]
 * @param {import('react').ReactNode} [props.action] - CTA button
 * @param {string} [props.className]
 */
export default function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
        {icon || <Inbox className="w-8 h-8 text-surface-400" />}
      </div>
      <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-surface-500 dark:text-surface-400 max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
