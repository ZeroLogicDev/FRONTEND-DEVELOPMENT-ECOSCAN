import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Recycle } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants/routes';
import authService from '@/services/authService';
import Button from '@/components/ui/Button';

/**
 * Auth page — Google OAuth login.
 */
export default function AuthPage() {
  const { t } = useTranslation();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  async function handleGoogleLogin() {
    try {
      await authService.signInWithGoogle();
    } catch (err) {
      toast.error(t('auth.auth_error'));
      console.error('Login failed:', err);
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign In — EcoScan V2</title>
      </Helmet>

      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="glass-card p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-eco-500 to-eco-600 flex items-center justify-center shadow-glow-eco">
              <Recycle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {t('auth.welcome_back')}
            </h1>
            <p className="text-surface-400 text-sm">
              {t('auth.sign_in_desc')}
            </p>
          </div>

          {/* Google Sign In Button */}
          <Button
            variant="ghost"
            className="w-full bg-white dark:bg-white text-surface-900 border-surface-300 hover:bg-surface-50 dark:hover:bg-surface-100 dark:text-surface-900"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t('auth.sign_in_google')}
          </Button>

          {/* Info text */}
          <p className="text-center text-xs text-surface-500 mt-6">
            {t('auth.no_account')}
          </p>
        </div>

        {/* Footer brand */}
        <p className="text-center text-xs text-surface-600 mt-6">
          EcoScan V2 · AI-Powered Waste Classification
        </p>
      </div>
    </>
  );
}
