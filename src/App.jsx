import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import AppLayout from '@/components/layouts/AppLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import('@/pages/Landing'));
const AuthPage = lazy(() => import('@/pages/Auth'));
const AuthCallback = lazy(() => import('@/pages/Auth/components/AuthCallback'));
const DashboardPage = lazy(() => import('@/pages/Dashboard'));
const ScanPage = lazy(() => import('@/pages/Scan'));
const HistoryPage = lazy(() => import('@/pages/History'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

// Fullscreen loading fallback for lazy-loaded pages
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-50 dark:bg-surface-950">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.LANDING} element={<LandingPage />} />

          {/* Auth routes — uses AuthLayout (no sidebar/nav) */}
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<AuthPage />} />
            <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />
          </Route>

          {/* Protected routes — uses AppLayout (sidebar + bottomnav) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.SCAN} element={<ScanPage />} />
              <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
