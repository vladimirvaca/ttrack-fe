import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import type { ProxyOptions } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxy: Record<string, string | ProxyOptions> =
    env.VITE_APP_USE_PROXY === 'true'
      ? {
          '/api': {
            target: env.VITE_API_BASE_URL,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        }
      : {};
  return {
    plugins: [react()],
    server: {
      proxy,
    },
    resolve: {
      alias: {
        '@generated': resolve(__dirname, 'src/api/generated'),
      },
    },
  };
});
