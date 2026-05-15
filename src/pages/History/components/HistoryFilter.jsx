import { useTranslation } from 'react-i18next';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

const FILTER_OPTIONS = [
  { key: null, labelKey: 'history.filter_all' },
  { key: 'Organik', labelKey: 'history.filter_organic' },
  { key: 'Anorganik', labelKey: 'history.filter_inorganic' },
];

/**
 * History filter bar — category tabs + search input.
 */
export default function HistoryFilter({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  compact = false,
}) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col gap-3', !compact && 'sm:flex-row sm:items-center sm:justify-between')}>
      {/* Category filter tabs */}
      <div className="flex gap-2">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.key ?? 'all'}
            onClick={() => onCategoryChange(option.key)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
              activeCategory === option.key
                ? 'bg-eco-500 text-white shadow-md'
                : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
            )}
          >
            {t(option.labelKey)}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('history.search_placeholder')}
          className="input-field pl-10 text-sm"
        />
      </div>
    </div>
  );
}
