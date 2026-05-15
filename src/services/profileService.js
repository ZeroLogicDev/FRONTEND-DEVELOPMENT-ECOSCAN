import { supabase } from '@/lib/supabaseClient';

/**
 * Profile service — read/update user profile from Supabase profiles table.
 */
const profileService = {
  /**
   * Fetch the profile for the current user.
   *
   * @param {string} userId - UUID of the authenticated user
   * @returns {Promise<import('@/types').Profile>}
   */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update the current user's profile.
   *
   * @param {string} userId
   * @param {Object} updates
   * @param {string} [updates.full_name]
   * @returns {Promise<import('@/types').Profile>}
   */
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Add points to the user's total_points.
   *
   * @param {string} userId
   * @param {number} points - Points to add
   * @returns {Promise<import('@/types').Profile>}
   */
  async addPoints(userId, points) {
    // First fetch current points
    const profile = await this.getProfile(userId);
    const newTotal = (profile.total_points || 0) + points;

    return this.updateProfile(userId, { total_points: newTotal });
  },
};

export default profileService;
