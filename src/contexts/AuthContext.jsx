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

  // Fetch profile from Supabase profiles table (non-blocking)
  async function fetchProfile(userId) {
    try {
      const profileData = await profileService.getProfile(userId);
      setProfile(profileData);
    } catch (err) {
      console.warn('[AuthContext] Profile fetch failed (non-fatal):', err.message);
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
    let isMounted = true;

    // Safety timeout — never stay loading for more than 8 seconds
    const timeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('[AuthContext] Auth init timed out — forcing loading=false');
        setLoading(false);
      }
    }, 8000);

    // Get initial session
    async function initAuth() {
      try {
        console.log('[AuthContext] Initializing auth...');
        const session = await authService.getSession();
        const currentUser = session?.user ?? null;

        console.log('[AuthContext] Session:', currentUser ? `User: ${currentUser.email}` : 'No session');

        if (isMounted) {
          setUser(currentUser);

          if (currentUser) {
            // Fetch profile in background — don't block loading
            fetchProfile(currentUser.id);
          }
        }
      } catch (err) {
        console.error('[AuthContext] Auth init failed:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initAuth();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthContext] Auth event:', event);
        const currentUser = session?.user ?? null;

        if (isMounted) {
          setUser(currentUser);

          if (currentUser) {
            // Fetch profile in background — don't block
            fetchProfile(currentUser.id);
          } else {
            setProfile(null);
          }

          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
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
