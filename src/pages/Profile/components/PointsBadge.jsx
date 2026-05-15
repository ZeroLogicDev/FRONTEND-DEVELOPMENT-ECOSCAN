import { Coins, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getCoinTier } from '@/utils/calculateCoins';
import { useTranslation } from 'react-i18next';

const TIER_COLORS = {
  seedling: 'from-green-400 to-green-600',
  bronze: 'from-amber-600 to-amber-800',
  silver: 'from-gray-300 to-gray-500',
  gold: 'from-yellow-400 to-yellow-600',
  platinum: 'from-cyan-300 to-cyan-500',
};

/**
 * Points badge — shows EcoCoins total and tier progress.
 */
export default function PointsBadge() {
  const { t } = useTranslation();
  const { profile } = useAuth();

  const totalPoints = profile?.total_points || 0;
  const tier = getCoinTier(totalPoints);
  const progress = tier.nextTier
    ? ((totalPoints - tier.minPoints) / (tier.nextTier - tier.minPoints)) * 100
    : 100;

  return (
    <div className="eco-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${TIER_COLORS[tier.tier]} flex items-center justify-center`}>
          <Coins className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-surface-900 dark:text-surface-50">
            {totalPoints.toLocaleString()}
          </p>
          <p className="text-xs text-surface-500">EcoCoins</p>
        </div>
      </div>

      {/* Tier info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-surface-700 dark:text-surface-300">
            🌱 {tier.label}
          </span>
          {tier.nextTier && (
            <span className="text-xs text-surface-400">
              {tier.nextTier - totalPoints} to next tier
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${TIER_COLORS[tier.tier]} rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
