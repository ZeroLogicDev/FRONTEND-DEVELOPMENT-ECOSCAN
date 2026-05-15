import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/useIsMobile';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ProfileDesktop = lazy(() => import('./ProfileDesktop'));
const ProfileMobile = lazy(() => import('./ProfileMobile'));

export default function ProfilePage() {
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Profile — EcoScan V2</title>
      </Helmet>
      <Suspense fallback={<LoadingSpinner size="lg" className="min-h-[60vh]" />}>
        {isMobile ? <ProfileMobile /> : <ProfileDesktop />}
      </Suspense>
    </>
  );
}
