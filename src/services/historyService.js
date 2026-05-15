import { supabase } from '@/lib/supabaseClient';

/**
 * History service — CRUD operations on scan_history table via Supabase.
 */
const historyService = {
  /**
   * Fetch all scan history for the current user, sorted by newest first.
   *
   * @param {Object} [options]
   * @param {string} [options.category] - Filter by category ('Organik' or 'Anorganik')
   * @param {number} [options.limit=50] - Max number of records
   * @param {number} [options.offset=0] - Pagination offset
   * @returns {Promise<import('@/types').ScanResult[]>}
   */
  async fetchHistory({ category, limit = 50, offset = 0 } = {}) {
    let query = supabase
      .from('scan_history')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  /**
   * Fetch recent scans (for dashboard).
   *
   * @param {number} [limit=5]
   * @returns {Promise<import('@/types').ScanResult[]>}
   */
  async fetchRecent(limit = 5) {
    const { data, error } = await supabase
      .from('scan_history')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  /**
   * Save a new scan result to the database.
   *
   * @param {Object} scanData
   * @param {string} scanData.user_id
   * @param {string} scanData.class_name
   * @param {string} scanData.category
   * @param {number} scanData.confidence
   * @returns {Promise<import('@/types').ScanResult>}
   */
  async saveScan({ user_id, class_name, category, confidence }) {
    const { data, error } = await supabase
      .from('scan_history')
      .insert([{ user_id, class_name, category, confidence }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a scan history entry.
   *
   * @param {string} scanId - UUID of the scan to delete
   */
  async deleteScan(scanId) {
    const { error } = await supabase
      .from('scan_history')
      .delete()
      .eq('id', scanId);

    if (error) throw error;
  },

  /**
   * Get aggregate statistics for the current user.
   *
   * @returns {Promise<{ totalScans: number, organicCount: number, inorganicCount: number }>}
   */
  async getStats() {
    const { data, error } = await supabase
      .from('scan_history')
      .select('category');

    if (error) throw error;

    const stats = {
      totalScans: data?.length || 0,
      organicCount: data?.filter((s) => s.category === 'Organik').length || 0,
      inorganicCount: data?.filter((s) => s.category === 'Anorganik').length || 0,
    };

    return stats;
  },
};

export default historyService;
