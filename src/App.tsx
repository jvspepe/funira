import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import light from "./styles/themes/light";
import GlobalStyles from "./styles/global";
import { AuthProvider } from "./contexts/AuthContext";

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
