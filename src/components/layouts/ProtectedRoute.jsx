import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * Protected route wrapper — redirects to login if user is not authenticated.
 * Shows loading spinner while auth state is being determined.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Still checking auth state — show loader
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-50 dark:bg-surface-950">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Not authenticated — redirect to login, preserving the intended destination
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Authenticated — render the child route
  return <Outlet />;
}
