import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { HistoryRowSkeleton } from '@/components/ui/SkeletonLoader';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { CLASS_LABELS } from '@/constants/wasteClasses';
import { formatRelativeTime } from '@/utils/formatDate';
import { formatConfidence, getConfidenceColor } from '@/utils/formatConfidence';
import { useDebounce } from '@/hooks/useDebounce';

/**
 * History cards — mobile view with card-based layout.
 */
export default function HistoryCards({ history, loading, searchQuery, onRefetch }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredHistory = useMemo(() => {
    if (!debouncedSearch) return history;
    const query = debouncedSearch.toLowerCase();
    return history.filter(
      (scan) =>
        scan.class_name.toLowerCase().includes(query) ||
        (CLASS_LABELS[scan.class_name]?.[i18n.language] || '')
          .toLowerCase()
          .includes(query)
    );
  }, [history, debouncedSearch, i18n.language]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="eco-card p-4">
            <HistoryRowSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (filteredHistory.length === 0) {
    return (
      <EmptyState
        title={t('history.no_history')}
        description={t('history.start_first')}
        action={
          <Button onClick={() => navigate(ROUTES.SCAN)} size="sm">
            Scan Now
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {filteredHistory.map((scan) => {
        const label =
          CLASS_LABELS[scan.class_name]?.[i18n.language] || scan.class_name;

        return (
          <div
            key={scan.id}
            className="eco-card p-4 flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-900 dark:text-surface-50 capitalize truncate">
                {label}
              </p>
              <p className="text-xs text-surface-400 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {formatRelativeTime(scan.created_at, i18n.language)}
              </p>
            </div>
            <StatusBadge category={scan.category} />
            <span
              className={`text-sm font-mono font-semibold ${getConfidenceColor(
                scan.confidence
              )}`}
            >
              {formatConfidence(scan.confidence)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
