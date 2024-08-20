import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { setupWorker } from 'msw/browser';
import { handlers } from '../src/mocks/handlers';
import '../src/styles/globals.css';

initialize();

const worker = setupWorker(...handlers(true));
worker.start({
  serviceWorker: {
    url: './mockServiceWorker.js',
  },
});

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
  loaders: [mswLoader],
};

export default preview;
