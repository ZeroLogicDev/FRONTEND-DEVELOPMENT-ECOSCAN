import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/useIsMobile';
import Sidebar from '@/components/ui/Sidebar';
import BottomNav from '@/components/ui/BottomNav';

/**
 * Main application layout — wraps all authenticated pages.
 * Desktop: sidebar on left, content area on right.
 * Mobile: content area fullscreen, bottom nav fixed at bottom.
 */
export default function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Desktop sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main content area */}
      <main
        className={
          isMobile
            ? 'pb-20 pt-safe' // Space for bottom nav
            : 'ml-64' // Space for sidebar
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      {isMobile && <BottomNav />}
    </div>
  );
}
