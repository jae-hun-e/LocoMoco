import react from '@vitejs/plugin-react';
import path from 'path';
import magicalSvg from 'vite-plugin-magical-svg';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), magicalSvg({ target: 'react' })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/libs/test/setupTests.ts',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
