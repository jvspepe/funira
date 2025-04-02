import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import '@fontsource-variable/montserrat';
import '@fontsource-variable/space-grotesk';
import router from '@/routes';

const root = document.getElementById('root');

if (!root) throw new Error('No element found with ID of root');

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
