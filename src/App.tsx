/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import GlobalStyles from '@/styles/global';
import light from '@/styles/themes/light';
import AuthProvider from './contexts/auth';
import theme from './styles/themes';

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ChakraProvider
          theme={theme}
          toastOptions={{ defaultOptions: { position: 'bottom' } }}
        >
          <ThemeProvider theme={light}>
            <GlobalStyles />
            <Outlet />
          </ThemeProvider>
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  );
};

export default App;
