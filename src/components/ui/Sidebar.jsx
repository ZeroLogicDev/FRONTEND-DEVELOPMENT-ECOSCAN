import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut, Recycle, Moon, Sun, Globe } from 'lucide-react';
import { toast } from 'sonner';

import { NAV_ITEMS } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import authService from '@/services/authService';
import Avatar from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';

/**
 * Desktop sidebar navigation.
 * Shows branding, nav links, user info, and settings (theme/language toggle).
 */
export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useLocalStorage('ecoscan-theme', true);

  // Toggle dark mode
  function toggleTheme() {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
  }

  // Toggle language
  function toggleLanguage() {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  }

  // Sign out
  async function handleSignOut() {
    try {
      await authService.signOut();
      toast.success(t('auth.logging_out'));
      navigate(ROUTES.LANDING);
    } catch (err) {
      toast.error('Failed to sign out');
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 flex flex-col">
      {/* Branding */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-surface-100 dark:border-surface-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-eco-500 to-eco-600 flex items-center justify-center shadow-glow-eco">
          <Recycle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-surface-900 dark:text-surface-50">
            EcoScan
          </h1>
          <span className="text-[10px] font-medium text-eco-500 uppercase tracking-wider">
            V2
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-eco-50 dark:bg-eco-950/50 text-eco-700 dark:text-eco-400 shadow-sm'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 hover:text-surface-900 dark:hover:text-surface-200'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {t(item.labelKey)}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section — Settings & User */}
      <div className="border-t border-surface-100 dark:border-surface-800 px-3 py-3 space-y-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
        >
          <Globe className="w-4 h-4" />
          {i18n.language === 'en' ? 'Bahasa Indonesia' : 'English'}
        </button>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          {t('nav.logout')}
        </button>
      </div>

      {/* User card */}
      <div className="border-t border-surface-100 dark:border-surface-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <Avatar
            name={profile?.full_name || user?.email}
            src={user?.user_metadata?.avatar_url}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-900 dark:text-surface-50 truncate">
              {profile?.full_name || 'EcoScan User'}
            </p>
            <p className="text-xs text-surface-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
