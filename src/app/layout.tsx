import { ReactNode } from 'react';
import Navbar from '@/app/_components/NavBar';
import Provider from '@/app/_components/Provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/libs/utils';
import '@/styles/globals.css';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import GoogleAnalyticsTracker from './_components/GoogleAnalyticsTracker';
import MapLoaderProvider from './_components/Map/MapLoaderProvider';
import PagePathRecorder from './_components/PagePathRecorder';

export const pretendard = localFont({
  src: '../../public/font/PretendardVariable.ttf',
  variable: '--pretendard',
  display: 'swap',
});

const APP_DEFAULT_TITLE = 'LocoMoco :D';
const APP_DESCRIPTION = '위치기반 모각코!';

export const metadata: Metadata = {
  title: {
    template: `%s | LocoMoco`,
    default: APP_DEFAULT_TITLE,
  },
  description: APP_DESCRIPTION,
  openGraph: {
    title: {
      template: `%s | LocoMoco`,
      default: APP_DEFAULT_TITLE,
    },
    description: APP_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_SITE_BASE_URL,
    siteName: '로코모코',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
    other: [
      {
        url: '/splashscreens/iphone5_splash.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/iphone6_splash.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/iphoneplus_splash.png',
        media:
          '(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/iphonex_splash.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/iphonexr_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/iphonexsmax_splash.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/ipad_splash.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/ipadpro1_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/ipadpro3_splash.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/splashscreens/ipadpro2_splash.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
    ],
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getCategoryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body
        className={cn(pretendard.className, 'relative min-h-svh')}
        suppressHydrationWarning
      >
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=clusterer,services`}
          strategy="beforeInteractive"
        />
        <Provider>
          <MapLoaderProvider>
            <main className="body-height">
              <div className="flex h-full flex-col overflow-y-auto px-20pxr scrollbar-hide">
                <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
                <PagePathRecorder />
              </div>
            </main>
            <Navbar />
            <Toaster />
          </MapLoaderProvider>
        </Provider>
        <GoogleAnalyticsTracker />
      </body>
    </html>
  );
};

export default RootLayout;
