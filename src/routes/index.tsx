import { createBrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import SingleProduct from '@/pages/SingleProduct';
import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import CreateAccount from '@/pages/CreateAccount';
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
          { path: '/produtos/:productId', element: <SingleProduct /> },
          { path: '/carrinho', element: <Cart /> },
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
    ],
  },
]);
export default router;
