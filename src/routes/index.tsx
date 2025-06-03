import { createBrowserRouter } from 'react-router';
import { adminRoutes } from '@/routes/admin-routes';
import { userRoutes } from '@/routes/user-routes';
import { App } from '@/App.tsx';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [...userRoutes, ...adminRoutes],
  },
]);
