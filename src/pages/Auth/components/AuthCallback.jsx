import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * OAuth callback page — handles the redirect from Google OAuth.
 * Supabase client automatically picks up the session from the URL hash.
 * This page just shows a loading spinner and redirects to dashboard.
 */
export default function AuthCallback() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        // Auth failed — go back to login
        navigate(ROUTES.LOGIN, { replace: true });
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-50 dark:bg-surface-950 gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-surface-500 dark:text-surface-400 text-sm animate-pulse">
        Completing sign in...
      </p>
    </div>
  );
}
