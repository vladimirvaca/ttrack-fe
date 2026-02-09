import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://44.199.248.244:8080/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        cookiePathRewrite: '/',
      },
    },
  },
  resolve: {
    alias: {
      '@generated': resolve(__dirname, 'src/api/generated'),
    },
  },
});
