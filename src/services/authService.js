import { supabase } from '@/lib/supabaseClient';

/**
 * Authentication service — wraps Supabase Auth methods.
 */
const authService = {
  /**
   * Sign in with Google OAuth via Supabase.
   * Redirects the user to Google's consent screen.
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out the current user.
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Get the current session.
   * @returns {Promise<import('@supabase/supabase-js').Session|null>}
   */
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Get the current user.
   * @returns {Promise<import('@supabase/supabase-js').User|null>}
   */
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  /**
   * Listen to auth state changes.
   * @param {Function} callback - Called with (event, session)
   * @returns {{ data: { subscription: { unsubscribe: Function } } }}
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export default authService;
