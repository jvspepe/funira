import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AuthProvider from '@/contexts/auth';
import GlobalStyles from '@/styles/global';
import light from '@/styles/themes/light';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
