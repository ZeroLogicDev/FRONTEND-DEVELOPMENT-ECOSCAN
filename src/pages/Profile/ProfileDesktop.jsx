import { useTranslation } from 'react-i18next';
import ProfileCard from './components/ProfileCard';
import EditProfileForm from './components/EditProfileForm';
import PointsBadge from './components/PointsBadge';

/**
 * Profile — Desktop layout.
 */
export default function ProfileDesktop() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
        {t('profile.title')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <ProfileCard />
          <PointsBadge />
        </div>
        <div className="lg:col-span-2">
          <EditProfileForm />
        </div>
      </div>
    </div>
  );
}
