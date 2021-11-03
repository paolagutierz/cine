import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./AppRouter";
import "./app.scss";

const App = ({ user }) => {
  return (
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  );
};

export default App;
