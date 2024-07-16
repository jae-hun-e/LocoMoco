'use client';

import { useEffect } from 'react';
import { pageview } from '@/libs/gtag';
import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';

const GoogleAnalyticsTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    pageview(pathname);
  }, [pathname]);

  return (
    <>
      {process.env.NEXT_PUBLIC_GA_ID ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
      ) : null}
    </>
  );
};

export default GoogleAnalyticsTracker;
