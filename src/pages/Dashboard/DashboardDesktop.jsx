import { useTranslation } from 'react-i18next';
import WelcomeHeader from './components/WelcomeHeader';
import StatsGrid from './components/StatsGrid';
import RecentScans from './components/RecentScans';
import QuickActions from './components/QuickActions';

/**
 * Dashboard — Desktop layout.
 * Two-column layout with stats and charts on left, recent scans on right.
 */
export default function DashboardDesktop() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <WelcomeHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left column — Stats + Quick Actions */}
        <div className="xl:col-span-2 space-y-6">
          <StatsGrid />
          <QuickActions />
        </div>

        {/* Right column — Recent Scans */}
        <div className="xl:col-span-1">
          <RecentScans />
        </div>
      </div>
    </div>
  );
}
