'use client';

import { ReactNode } from 'react';
import { initializeApp } from '@firebase/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Provider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
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
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
