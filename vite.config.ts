import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { PROXY_CONFIG } from './vite/proxy';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxy = PROXY_CONFIG(env);
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
