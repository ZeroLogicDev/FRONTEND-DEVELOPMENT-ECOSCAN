import { createContext, useContext, useEffect, useState } from 'react';
import authService from '@/services/authService';
import profileService from '@/services/profileService';

/**
 * @typedef {Object} AuthContextValue
 * @property {import('@supabase/supabase-js').User|null} user
 * @property {import('@/types').Profile|null} profile
 * @property {boolean} loading
 * @property {boolean} isAuthenticated
 * @property {Function} refreshProfile
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from Supabase profiles table
  async function fetchProfile(userId) {
    try {
      const profileData = await profileService.getProfile(userId);
      setProfile(profileData);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setProfile(null);
    }
  }

  // Public method to refresh profile data
  async function refreshProfile() {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  }

  useEffect(() => {
    // Get initial session
    async function initAuth() {
      try {
        const session = await authService.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
      } finally {
        setLoading(false);
      }
    }

    initAuth();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access AuthContext.
 * @returns {AuthContextValue}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
