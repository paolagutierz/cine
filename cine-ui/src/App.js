import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./AppRouter";
import "./app.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "./themeConfig";

const App = ({ user }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
