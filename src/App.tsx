import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@/styles/global';
import light from '@/styles/themes/light';

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
