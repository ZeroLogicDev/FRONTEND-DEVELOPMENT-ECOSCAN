import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';

/**
 * Welcome header showing user's name and greeting.
 */
export default function WelcomeHeader() {
  const { t } = useTranslation();
  const { profile } = useAuth();

  const firstName = profile?.full_name?.split(' ')[0] || 'Explorer';

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-surface-50">
          {t('dashboard.welcome')}{' '}
          <span className="text-gradient-eco">{firstName}</span>
          <Sparkles className="inline-block w-5 h-5 ml-2 text-coin-400" />
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1 text-sm">
          {t('app.tagline')}
        </p>
      </div>
    </div>
  );
}
