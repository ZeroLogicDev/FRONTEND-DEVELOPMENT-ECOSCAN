import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanLine, Leaf, Trash2, Coins } from 'lucide-react';
import historyService from '@/services/historyService';
import { useAuth } from '@/contexts/AuthContext';
import { calculateTotalCoins } from '@/utils/calculateCoins';
import { StatCardSkeleton } from '@/components/ui/SkeletonLoader';

/**
 * Grid of statistic cards (total scans, organic, inorganic, eco coins).
 */
export default function StatsGrid() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [statsData, allScans] = await Promise.all([
          historyService.getStats(),
          historyService.fetchHistory({ limit: 1000 }),
        ]);
        const ecoCoins = profile?.total_points || calculateTotalCoins(allScans);
        setStats({ ...statsData, ecoCoins });
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [profile]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: t('dashboard.total_scans'),
      value: stats?.totalScans ?? 0,
      icon: ScanLine,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      label: t('dashboard.organic_count'),
      value: stats?.organicCount ?? 0,
      icon: Leaf,
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-950/30',
    },
    {
      label: t('dashboard.inorganic_count'),
      value: stats?.inorganicCount ?? 0,
      icon: Trash2,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-950/30',
    },
    {
      label: t('dashboard.eco_coins'),
      value: stats?.ecoCoins ?? 0,
      icon: Coins,
      color: 'text-coin-500',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="eco-card p-5 flex flex-col gap-3 group"
        >
          <div
            className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
          >
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-surface-900 dark:text-surface-50">
              {card.value.toLocaleString()}
            </p>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              {card.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
