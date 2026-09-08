import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { AdminApp } from './admin/AdminApp';
import { queryClient } from './queryClient';

async function bootstrap() {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  const isAdmin = window.location.pathname.startsWith('/admin');

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>{isAdmin ? <AdminApp /> : <App />}</QueryClientProvider>
    </StrictMode>,
  );
}

bootstrap();
