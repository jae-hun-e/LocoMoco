import React from 'react';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { pretendard } from '../src/app/layout';
import { handlers } from '../src/mocks/handlers';
import '../src/styles/globals.css';
import { getCategoryOptions } from '../src/utils/getQueryOptions';

initialize({
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
});

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: handlers(true),
    },
  },
  loaders: [
    async () => {
      await queryClient.prefetchQuery(getCategoryOptions());
      return { queryClient };
    },
    mswLoader,
  ],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className={pretendard.className}>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
