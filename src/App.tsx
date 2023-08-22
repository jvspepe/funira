import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import light from "./styles/themes/light";
import GlobalStyles from "./styles/global";

const App = () => {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
