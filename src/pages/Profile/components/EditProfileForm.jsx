import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import profileService from '@/services/profileService';
import Button from '@/components/ui/Button';

/**
 * Edit profile form — update full_name.
 */
export default function EditProfileForm() {
  const { t } = useTranslation();
  const { user, profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      await profileService.updateProfile(user.id, { full_name: fullName.trim() });
      await refreshProfile();
      toast.success(t('profile.update_success'));
    } catch (err) {
      toast.error(t('profile.update_error'));
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="eco-card p-6">
      <h3 className="section-title mb-4">{t('profile.edit_profile')}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
          >
            {t('profile.full_name')}
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-field"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
            {t('profile.email')}
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="input-field opacity-60 cursor-not-allowed"
          />
          <p className="text-xs text-surface-400 mt-1">
            Email is managed by your Google account.
          </p>
        </div>

        <Button type="submit" loading={saving}>
          <Save className="w-4 h-4" />
          {t('profile.save_changes')}
        </Button>
      </form>
    </div>
  );
}
