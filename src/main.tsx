import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// PrimeReact styles
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.css';

// Global styles
import './styles/globals.css';

setApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

import { setApiBaseUrl } from './api/http.ts';
import Routes from './routes/Routes.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <Routes />
      </PrimeReactProvider>
    </QueryClientProvider>
  </StrictMode>
);
