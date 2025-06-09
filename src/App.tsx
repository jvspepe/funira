import { Outlet, ScrollRestoration } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/features/users/contexts';
import { store } from './store/store';

export function App() {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <ChakraProvider defaultTheme="light">
          <ScrollRestoration />
          <Outlet />
          <Toaster />
        </ChakraProvider>
      </ReduxProvider>
    </AuthProvider>
  );
}
