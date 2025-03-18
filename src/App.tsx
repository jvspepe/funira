import { Outlet } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { store } from './store/store';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from './contexts/auth';

const App = () => {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <ChakraProvider defaultTheme="light">
          <Outlet />
          <Toaster />
        </ChakraProvider>
      </ReduxProvider>
    </AuthProvider>
  );
};

export default App;
