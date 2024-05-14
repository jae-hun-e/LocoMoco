import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default function async(component: ReactNode) {
  const user = userEvent.setup();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const renderedComponent = render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );

  return {
    user,
    ...renderedComponent,
  };
}
