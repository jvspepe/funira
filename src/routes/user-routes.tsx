import { RouteObject } from 'react-router';
import { paths } from '@/config/paths';
import { MainLayout } from '@/layouts/main-layout';
import { About } from '@/pages/about';
import { Checkout } from '@/pages/checkout';
import { HomePage } from '@/pages/home';
import { ProductDetails } from '@/features/products/pages/product-details';
import { ProductsDisplay } from '@/features/products/pages/products-display';
import { SignInPage } from '@/features/users/pages/sign-in';
import { SignUpPage } from '@/features/users/pages/sign-up';

export const userRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: paths.user.home, element: <HomePage /> },
      { path: paths.user.products, element: <ProductsDisplay /> },
      {
        path: paths.user.product,
        element: <ProductDetails />,
      },
      { path: paths.user.cart, element: <Checkout /> },
      { path: paths.user.about, element: <About /> },
    ],
  },
  {
    element: <MainLayout hideFooter />,
    children: [
      { path: paths.user.signIn, element: <SignInPage /> },
      { path: paths.user.signUp, element: <SignUpPage /> },
    ],
  },
];
