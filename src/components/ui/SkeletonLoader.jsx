import { cn } from '@/utils/cn';

/**
 * Skeleton loader — smooth placeholder for content loading states.
 * Use instead of spinners for better perceived performance.
 *
 * @param {Object} props
 * @param {string} [props.className] - Tailwind width/height classes
 * @param {'text'|'circle'|'card'|'line'} [props.variant='line']
 */
export default function SkeletonLoader({ className, variant = 'line' }) {
  const variants = {
    line: 'h-4 w-full rounded',
    text: 'h-3 w-3/4 rounded',
    circle: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-2xl',
  };

  return (
    <div
      className={cn('skeleton', variants[variant], className)}
      aria-hidden="true"
    />
  );
}

/**
 * Pre-built skeleton for a dashboard stat card.
 */
export function StatCardSkeleton() {
  return (
    <div className="eco-card p-6 space-y-3">
      <SkeletonLoader variant="text" className="w-1/2" />
      <SkeletonLoader variant="line" className="h-8 w-2/3" />
      <SkeletonLoader variant="text" className="w-1/3" />
    </div>
  );
}

/**
 * Pre-built skeleton for a scan history row.
 */
export function HistoryRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4">
      <SkeletonLoader variant="circle" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader variant="line" className="w-1/3" />
        <SkeletonLoader variant="text" className="w-1/4" />
      </div>
      <SkeletonLoader variant="text" className="w-16" />
    </div>
  );
}

/**
 * Full page skeleton layout for dashboard.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome header */}
      <div className="space-y-2">
        <SkeletonLoader variant="line" className="h-8 w-64" />
        <SkeletonLoader variant="text" className="w-48" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Recent scans */}
      <div className="eco-card p-6 space-y-4">
        <SkeletonLoader variant="line" className="h-6 w-48" />
        {[...Array(3)].map((_, i) => (
          <HistoryRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
