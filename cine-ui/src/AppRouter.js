import Home from "./pages/home/Home";
import SignUp from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const AppRouter = ({ user }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">{!user ? <SignUp /> : <Redirect to="/" />}</Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie" />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};
const mapStateToProps = (state) => {
  return { user: state.login?.user };
};
export default connect(mapStateToProps, null)(AppRouter);
