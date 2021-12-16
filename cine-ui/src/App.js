import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./AppRouter";
import "./app.scss";
import { ThemeProvider } from "@emotion/react";
import theme from "./themeConfig";
import { SnackbarProvider} from 'notistack';

const App = ({ user }) => {
  return (
    <SnackbarProvider  maxSnack={3}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
