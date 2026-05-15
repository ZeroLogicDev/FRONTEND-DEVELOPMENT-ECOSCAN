import { useState, useEffect, useCallback } from 'react';
import profileService from '@/services/profileService';

/**
 * Hook to fetch and manage the current user's profile.
 *
 * @param {string|null} userId
 * @returns {{ profile: Object|null, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(err);
      console.error('Failed to fetch profile:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
