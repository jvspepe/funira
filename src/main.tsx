import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource-variable/montserrat';
import '@fontsource-variable/space-grotesk';
import { store } from './store/store.ts';
import App from '@/App.tsx';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import SingleProduct from '@/pages/SingleProduct';
import About from '@/pages/About';
import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import CreateAccount from '@/pages/CreateAccount';
import AuthProvider from './contexts/auth/index.tsx';
import theme from './styles/themes/index.ts';
import Layout from '@/layouts';

const browserRouter = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ChakraProvider
          theme={theme}
          toastOptions={{ defaultOptions: { position: 'bottom' } }}
        >
          <RouterProvider router={browserRouter} />
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
