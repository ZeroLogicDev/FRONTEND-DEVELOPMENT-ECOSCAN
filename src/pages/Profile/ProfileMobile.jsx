import { useTranslation } from 'react-i18next';
import ProfileCard from './components/ProfileCard';
import EditProfileForm from './components/EditProfileForm';
import PointsBadge from './components/PointsBadge';

/**
 * Profile — Mobile layout.
 */
export default function ProfileMobile() {
  const { t } = useTranslation();

  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="text-xl font-bold text-surface-900 dark:text-surface-50 text-center">
        {t('profile.title')}
      </h1>
      <ProfileCard />
      <PointsBadge />
      <EditProfileForm />
    </div>
  );
}
