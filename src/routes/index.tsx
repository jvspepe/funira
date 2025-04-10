import { createBrowserRouter } from 'react-router';
import App from '@/App.tsx';
import Home from '@/pages/home';
import Product from '@/pages/product';
import Products from '@/pages/products';
import About from '@/pages/about';
import Checkout from '@/pages/checkout';
import Login from '@/pages/login';
import CreateAccount from '@/pages/register';
import CreateProduct from '@/pages/admin/create-product/create-product';
import Layout from '@/layouts';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/produtos', element: <Products /> },
          {
            path: '/produtos/:id',
            element: <Product />,
          },
          { path: '/carrinho', element: <Checkout /> },
          { path: '/sobre', element: <About /> },
        ],
      },
      {
        element: <Layout hideFooter />,
        children: [
          { path: '/conectar', element: <Login /> },
          { path: '/criar-conta', element: <CreateAccount /> },
        ],
      },
      {
        path: '/admin',
        children: [{ index: true, element: <CreateProduct /> }],
      },
    ],
  },
]);
export default router;
