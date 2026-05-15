import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/utils/cn';

/**
 * Mobile bottom navigation bar.
 * Fixed at bottom with safe-area padding for notch devices.
 */
export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border-t border-surface-200/50 dark:border-surface-800/50 pb-safe">
      <div className="flex items-center justify-around px-2 py-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl min-w-[60px] transition-all duration-200',
                item.primary && !isActive && 'relative',
                isActive
                  ? 'text-eco-600 dark:text-eco-400'
                  : 'text-surface-400 dark:text-surface-500 active:scale-95'
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.primary && !isActive ? (
                  // Highlighted scan button
                  <div className="w-12 h-12 -mt-5 rounded-2xl bg-gradient-to-br from-eco-500 to-eco-600 flex items-center justify-center shadow-glow-eco">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <item.icon
                    className={cn(
                      'w-5 h-5 transition-transform duration-200',
                      isActive && 'scale-110'
                    )}
                  />
                )}
                <span
                  className={cn(
                    'text-[10px] font-medium',
                    isActive ? 'text-eco-600 dark:text-eco-400' : ''
                  )}
                >
                  {t(item.labelKey)}
                </span>
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-eco-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
