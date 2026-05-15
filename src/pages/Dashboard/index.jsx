import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/useIsMobile';
import { DashboardSkeleton } from '@/components/ui/SkeletonLoader';

const DashboardDesktop = lazy(() => import('./DashboardDesktop'));
const DashboardMobile = lazy(() => import('./DashboardMobile'));

/**
 * Dashboard gatekeeper — lazy-loads Desktop or Mobile view.
 */
export default function DashboardPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Dashboard — EcoScan V2</title>
      </Helmet>
      <Suspense fallback={<DashboardSkeleton />}>
        {isMobile ? <DashboardMobile /> : <DashboardDesktop />}
      </Suspense>
    </>
  );
}
