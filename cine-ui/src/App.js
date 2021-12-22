import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./AppRouter";
import "./app.scss";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themeConfig";
import { SnackbarProvider } from "notistack";

const App = ({ user }) => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <AppRouter></AppRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
