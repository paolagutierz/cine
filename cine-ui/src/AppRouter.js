import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ReservationLists from "./pages/ReservationLists";
import ReservationDetails from "./pages/ReservationDetails";

import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import MovieDetails from "./pages/MovieDetails";

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
              <MovieDetails />
            </Route>
            <Route path="/reservas">
              <ReservationLists />
            </Route>
            <Route path="/verreserva/:id">
              <ReservationDetails />
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
