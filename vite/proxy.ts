import type { ProxyOptions } from 'vite';

export const PROXY_CONFIG = (env: Record<string, string>): Record<string, string | ProxyOptions> =>
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

