import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScanLine, History } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

/**
 * Quick action cards for dashboard — primary CTAs.
 */
export default function QuickActions() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    {
      label: t('dashboard.scan_now'),
      description: t('scan.subtitle'),
      icon: ScanLine,
      path: ROUTES.SCAN,
      gradient: 'from-eco-500 to-eco-600',
      glow: 'shadow-glow-eco',
    },
    {
      label: t('dashboard.view_history'),
      description: t('history.subtitle'),
      icon: History,
      path: ROUTES.HISTORY,
      gradient: 'from-blue-500 to-blue-600',
      glow: '',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.path)}
          className={`eco-card p-6 flex items-center gap-4 text-left group hover:scale-[1.02] transition-all duration-300 ${action.glow}`}
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
          >
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-surface-900 dark:text-surface-50">
              {action.label}
            </p>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              {action.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
