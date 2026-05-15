import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from './Button';

/**
 * Error fallback UI — shown when ErrorBoundary catches an error.
 *
 * @param {Object} props
 * @param {Error} [props.error]
 * @param {Function} [props.onReset]
 */
export default function ErrorFallback({ error, onReset }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-50 dark:bg-surface-950 px-6">
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>

      <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50 mb-2">
        {t('common.error')}
      </h1>

      <p className="text-surface-500 dark:text-surface-400 text-center max-w-md mb-2">
        An unexpected error occurred. Please try again or refresh the page.
      </p>

      {error?.message && (
        <pre className="text-xs text-surface-400 dark:text-surface-500 bg-surface-100 dark:bg-surface-900 px-4 py-2 rounded-lg max-w-md overflow-auto mb-6 font-mono">
          {error.message}
        </pre>
      )}

      <div className="flex gap-3">
        {onReset && (
          <Button variant="primary" onClick={onReset}>
            <RefreshCw className="w-4 h-4" />
            {t('common.retry')}
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
}
