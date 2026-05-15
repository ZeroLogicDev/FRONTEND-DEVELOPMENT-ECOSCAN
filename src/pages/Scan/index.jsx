import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/useIsMobile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ScanDesktop = lazy(() => import('./ScanDesktop'));
const ScanMobile = lazy(() => import('./ScanMobile'));

/**
 * Scan page gatekeeper — lazy-loads Desktop or Mobile view.
 */
export default function ScanPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Scan Waste — EcoScan V2</title>
      </Helmet>
      <Suspense fallback={<LoadingSpinner size="lg" className="min-h-[60vh]" />}>
        {isMobile ? <ScanMobile /> : <ScanDesktop />}
      </Suspense>
    </>
  );
}
