import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HistoryFilter from './components/HistoryFilter';
import HistoryTable from './components/HistoryTable';
import { useScanHistory } from '@/hooks/useScanHistory';

/**
 * History — Desktop layout with full table view.
 */
export default function HistoryDesktop() {
  const { t } = useTranslation();
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { history, loading, refetch } = useScanHistory({ category });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
          {t('history.title')}
        </h1>
        <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">
          {t('history.subtitle')}
        </p>
      </div>

      <HistoryFilter
        activeCategory={category}
        onCategoryChange={setCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <HistoryTable
        history={history}
        loading={loading}
        searchQuery={searchQuery}
        onRefetch={refetch}
      />
    </div>
  );
}
