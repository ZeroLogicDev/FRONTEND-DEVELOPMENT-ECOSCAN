import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SearchX } from 'lucide-react';

import { ROUTES } from '@/constants/routes';
import Button from '@/components/ui/Button';

/**
 * 404 Not Found page.
 */
export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 — Page Not Found</title>
      </Helmet>

      <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-surface-400" />
        </div>

        <h1 className="text-6xl font-bold text-gradient-eco mb-4">404</h1>

        <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-50 mb-2">
          {t('common.page_not_found')}
        </h2>

        <p className="text-surface-500 dark:text-surface-400 max-w-sm mb-8">
          {t('common.not_found_desc')}
        </p>

        <Button onClick={() => navigate(ROUTES.DASHBOARD)}>
          {t('common.go_home')}
        </Button>
      </div>
    </>
  );
}
