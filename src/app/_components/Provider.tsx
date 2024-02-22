'use client';

import { ReactNode } from 'react';
import { getCategory } from '@/apis/mgc/queryFn';
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
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  (async () =>
    await queryClient.prefetchQuery({
      queryKey: ['category'],
      queryFn: () => getCategory({ type: 'MOGAKKO' }),
    }))();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
