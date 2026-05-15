import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HistoryFilter from './components/HistoryFilter';
import HistoryCards from './components/HistoryCards';
import { useScanHistory } from '@/hooks/useScanHistory';

/**
 * History — Mobile layout with card-based list.
 */
export default function HistoryMobile() {
  const { t } = useTranslation();
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { history, loading, refetch } = useScanHistory({ category });

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center">
        <h1 className="text-xl font-bold text-surface-900 dark:text-surface-50">
          {t('history.title')}
        </h1>
      </div>

      <HistoryFilter
        activeCategory={category}
        onCategoryChange={setCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        compact
      />

      <HistoryCards
        history={history}
        loading={loading}
        searchQuery={searchQuery}
        onRefetch={refetch}
      />
    </div>
  );
}
