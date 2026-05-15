import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

import historyService from '@/services/historyService';
import { ROUTES } from '@/constants/routes';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { HistoryRowSkeleton } from '@/components/ui/SkeletonLoader';
import Button from '@/components/ui/Button';
import { formatRelativeTime } from '@/utils/formatDate';
import { formatConfidence } from '@/utils/formatConfidence';
import { CLASS_LABELS } from '@/constants/wasteClasses';

/**
 * Recent scans widget for dashboard — shows last 5 scans.
 */
export default function RecentScans() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecent() {
      try {
        const data = await historyService.fetchRecent(5);
        setScans(data);
      } catch (err) {
        console.error('Failed to load recent scans:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRecent();
  }, []);

  return (
    <div className="eco-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-lg">{t('dashboard.recent_scans')}</h2>
        {scans.length > 0 && (
          <button
            onClick={() => navigate(ROUTES.HISTORY)}
            className="text-xs text-eco-600 dark:text-eco-400 font-medium hover:underline"
          >
            {t('dashboard.view_history')} →
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-1">
          {[...Array(3)].map((_, i) => (
            <HistoryRowSkeleton key={i} />
          ))}
        </div>
      ) : scans.length === 0 ? (
        <EmptyState
          title={t('dashboard.no_scans_yet')}
          description={t('dashboard.start_scanning')}
          action={
            <Button onClick={() => navigate(ROUTES.SCAN)} variant="primary" size="sm">
              {t('dashboard.scan_now')}
            </Button>
          }
        />
      ) : (
        <div className="space-y-1">
          {scans.map((scan) => {
            const label =
              CLASS_LABELS[scan.class_name]?.[i18n.language] ||
              scan.class_name;

            return (
              <div
                key={scan.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-50 capitalize truncate">
                    {label}
                  </p>
                  <p className="text-xs text-surface-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(scan.created_at, i18n.language)}
                  </p>
                </div>
                <StatusBadge category={scan.category} />
                <span className="text-xs font-mono text-surface-500 w-14 text-right">
                  {formatConfidence(scan.confidence)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
