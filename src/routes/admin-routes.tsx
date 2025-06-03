import { RouteObject } from 'react-router';
import { paths } from '@/config/paths';
import { AdminHome } from '@/features/admin/pages/home';
import { AdminProtectedRoute } from '@/features/admin/routes/admin-protected-route';
import { AdminLayout } from '@/layouts/admin-layout';
import { AdminProducts } from '@/features/admin/pages/products';
import { CreateProduct } from '@/features/admin/pages/create-product';
import { AdminCategories } from '@/features/admin/pages/categories';
import { AdminSignIn } from '@/features/admin/pages/sign-in';
import { AdminUsers } from '@/features/admin/routes/users';

export const adminRoutes: RouteObject[] = [
  {
    path: paths.admin.home,
    element: <AdminSignIn />,
  },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: paths.admin.dashboard,
            element: <AdminHome />,
          },
          {
            path: paths.admin.users,
            element: <AdminUsers />,
          },
          {
            path: paths.admin.products,
            element: <AdminProducts />,
          },
          {
            path: paths.admin.categories,
            element: <AdminCategories />,
          },
          {
            path: paths.admin.createProduct,
            element: <CreateProduct />,
          },
        ],
      },
    ],
  },
];
