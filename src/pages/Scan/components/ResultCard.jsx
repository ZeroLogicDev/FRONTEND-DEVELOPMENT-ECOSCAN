import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, RotateCcw, Save, Leaf, Trash2, Info } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/contexts/AuthContext';
import historyService from '@/services/historyService';
import profileService from '@/services/profileService';
import { calculateCoins } from '@/utils/calculateCoins';
import { formatConfidence, getConfidenceColor } from '@/utils/formatConfidence';
import { CLASS_LABELS, WASTE_TIPS } from '@/constants/wasteClasses';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';

/**
 * Result card showing AI prediction with save-to-history functionality.
 */
export default function ResultCard({ result, imagePreview, onReset }) {
  const { t, i18n } = useTranslation();
  const { user, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!result) {
    return (
      <div className="eco-card p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
        <Info className="w-10 h-10 text-surface-300 dark:text-surface-600 mb-3" />
        <p className="text-surface-500 dark:text-surface-400 text-sm">
          {t('scan.subtitle')}
        </p>
      </div>
    );
  }

  const isOrganic = result.category === 'Organik';
  const label = CLASS_LABELS[result.class]?.[i18n.language] || result.class;
  const tip = WASTE_TIPS[result.class]?.[i18n.language] || '';
  const coins = calculateCoins(result.category, result.confidence);

  async function handleSave() {
    if (!user) return;
    setSaving(true);

    try {
      await historyService.saveScan({
        user_id: user.id,
        class_name: result.class,
        category: result.category,
        confidence: result.confidence,
      });

      // Add coins
      await profileService.addPoints(user.id, coins);
      await refreshProfile();

      setSaved(true);
      toast.success(`${t('scan.saved_success')} +${coins} EcoCoins! 🌱`);
    } catch (err) {
      toast.error('Failed to save scan result');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="eco-card overflow-hidden animate-scale-in">
      {/* Image preview */}
      {imagePreview && (
        <div className="aspect-video bg-surface-900 overflow-hidden">
          <img
            src={imagePreview}
            alt="Scanned waste"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Result content */}
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isOrganic
                ? 'bg-green-50 dark:bg-green-950/30'
                : 'bg-red-50 dark:bg-red-950/30'
            }`}
          >
            {isOrganic ? (
              <Leaf className="w-6 h-6 text-green-500" />
            ) : (
              <Trash2 className="w-6 h-6 text-red-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-surface-900 dark:text-surface-50 capitalize">
              {label}
            </h3>
            <StatusBadge category={result.category} />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-500 mb-1">{t('scan.confidence')}</p>
            <p className={`text-xl font-bold ${getConfidenceColor(result.confidence)}`}>
              {formatConfidence(result.confidence)}
            </p>
          </div>
          <div className="bg-surface-50 dark:bg-surface-800 rounded-xl p-3 text-center">
            <p className="text-xs text-surface-500 mb-1">EcoCoins</p>
            <p className="text-xl font-bold text-coin-500">+{coins}</p>
          </div>
        </div>

        {/* Recycling tip */}
        {tip && (
          <div className="bg-eco-50 dark:bg-eco-950/20 border border-eco-200 dark:border-eco-800 rounded-xl p-4">
            <p className="text-xs font-semibold text-eco-700 dark:text-eco-400 mb-1">
              ♻️ Recycling Tip
            </p>
            <p className="text-sm text-eco-800 dark:text-eco-300">{tip}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {!saved ? (
            <Button
              onClick={handleSave}
              loading={saving}
              variant="primary"
              className="flex-1"
            >
              <Save className="w-4 h-4" />
              {t('scan.save_result')}
            </Button>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 py-3 text-eco-600 dark:text-eco-400 font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Saved!
            </div>
          )}
          <Button onClick={onReset} variant="ghost">
            <RotateCcw className="w-4 h-4" />
            {t('scan.scan_again')}
          </Button>
        </div>
      </div>
    </div>
  );
}
