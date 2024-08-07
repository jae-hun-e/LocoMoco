import { ReactNode } from 'react';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const setupRender = async (component: ReactNode) => {
  const user = userEvent.setup();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  await queryClient.prefetchQuery(getCategoryOptions());

  const renderedComponent = render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );

  return {
    user,
    ...renderedComponent,
  };
};

export default setupRender;
