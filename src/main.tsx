import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
/*  @ts-expect-error: CSS module */
import '@fontsource-variable/montserrat';
/*  @ts-expect-error: CSS module */
import '@fontsource-variable/space-grotesk';
import { router } from '@/routes';
import './i18n';

const root = document.getElementById('root');

if (!root) throw new Error('No element found with ID of root');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
