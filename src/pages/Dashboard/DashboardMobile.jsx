import WelcomeHeader from './components/WelcomeHeader';
import StatsGrid from './components/StatsGrid';
import QuickActions from './components/QuickActions';
import RecentScans from './components/RecentScans';

/**
 * Dashboard — Mobile layout.
 * Single-column stacked layout optimized for touch.
 */
export default function DashboardMobile() {
  return (
    <div className="space-y-5 animate-fade-in">
      <WelcomeHeader />
      <StatsGrid />
      <QuickActions />
      <RecentScans />
    </div>
  );
}
