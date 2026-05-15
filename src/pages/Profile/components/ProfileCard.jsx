import { useTranslation } from 'react-i18next';
import { Mail, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Avatar from '@/components/ui/Avatar';
import { formatDate } from '@/utils/formatDate';

/**
 * Profile info card — avatar, name, email, join date.
 */
export default function ProfileCard() {
  const { t, i18n } = useTranslation();
  const { user, profile } = useAuth();

  return (
    <div className="eco-card p-6 flex flex-col items-center text-center">
      <Avatar
        name={profile?.full_name}
        src={user?.user_metadata?.avatar_url}
        size="lg"
        className="mb-4"
      />
      <h2 className="text-lg font-bold text-surface-900 dark:text-surface-50">
        {profile?.full_name || 'EcoScan User'}
      </h2>

      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <Mail className="w-4 h-4" />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-surface-500">
          <Calendar className="w-4 h-4" />
          <span>
            {t('profile.member_since')}{' '}
            {formatDate(profile?.created_at, i18n.language)}
          </span>
        </div>
      </div>
    </div>
  );
}
