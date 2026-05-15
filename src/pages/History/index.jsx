import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/useIsMobile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const HistoryDesktop = lazy(() => import('./HistoryDesktop'));
const HistoryMobile = lazy(() => import('./HistoryMobile'));

/**
 * History page gatekeeper.
 */
export default function HistoryPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Scan History — EcoScan V2</title>
      </Helmet>
      <Suspense fallback={<LoadingSpinner size="lg" className="min-h-[60vh]" />}>
        {isMobile ? <HistoryMobile /> : <HistoryDesktop />}
      </Suspense>
    </>
  );
}
