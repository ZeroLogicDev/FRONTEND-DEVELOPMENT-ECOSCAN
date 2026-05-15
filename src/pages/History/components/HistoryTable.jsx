import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { HistoryRowSkeleton } from '@/components/ui/SkeletonLoader';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { CLASS_LABELS } from '@/constants/wasteClasses';
import { formatDate } from '@/utils/formatDate';
import { formatConfidence, getConfidenceColor } from '@/utils/formatConfidence';
import { useDebounce } from '@/hooks/useDebounce';

/**
 * History table — desktop view with columns: Date, Type, Category, Confidence.
 */
export default function HistoryTable({ history, loading, searchQuery, onRefetch }) {
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
      <div className="eco-card divide-y divide-surface-100 dark:divide-surface-800">
        {[...Array(5)].map((_, i) => (
          <HistoryRowSkeleton key={i} />
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
    <div className="eco-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-50 dark:bg-surface-800/50 text-left">
              <th className="px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                {t('history.date')}
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                {t('history.type')}
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">
                {t('history.category')}
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider text-right">
                {t('history.confidence')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
            {filteredHistory.map((scan) => {
              const label =
                CLASS_LABELS[scan.class_name]?.[i18n.language] ||
                scan.class_name;

              return (
                <tr
                  key={scan.id}
                  className="hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-surface-600 dark:text-surface-400">
                    {formatDate(scan.created_at, i18n.language)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-surface-900 dark:text-surface-100 capitalize">
                    {label}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge category={scan.category} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`text-sm font-mono font-semibold ${getConfidenceColor(
                        scan.confidence
                      )}`}
                    >
                      {formatConfidence(scan.confidence)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
