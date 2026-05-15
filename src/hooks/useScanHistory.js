import { useState, useEffect, useCallback } from 'react';
import historyService from '@/services/historyService';

/**
 * Hook to fetch and manage scan history.
 *
 * @param {Object} [options]
 * @param {string} [options.category] - Filter by 'Organik' or 'Anorganik'
 * @param {number} [options.limit=50]
 * @returns {{ history: Array, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useScanHistory({ category, limit = 50 } = {}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await historyService.fetchHistory({ category, limit });
      setHistory(data);
    } catch (err) {
      setError(err);
      console.error('Failed to fetch scan history:', err);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { history, loading, error, refetch: fetchData };
}
