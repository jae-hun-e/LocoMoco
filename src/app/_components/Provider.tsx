'use client';

import { ReactNode } from 'react';
import client from '@/apis/core';
import { clearItem, setItem } from '@/utils/storage';
import { initializeApp } from '@firebase/app';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { OverlayProvider } from '@toss/use-overlay';
import { AxiosError } from 'axios';

interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}

const Provider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            alert('인증이 만료되었습니다. 다시 로그인해주세요.');
            clearItem(localStorage);
          } else if (error.response?.status === 1401) {
            client
              .get<RefreshTokenResponse>({ url: '/users/refresh/kakao' })
              .then((res) => setItem(localStorage, 'token', res.access_token));
          }
        }
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  const initFireBase = () => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    initializeApp(firebaseConfig);
  };

  if (typeof window !== 'undefined' && 'serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        })
        .then(() => {
          return navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/firebase-cloud-messaging-push-scope',
          });
        })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }

  initFireBase();
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default Provider;
