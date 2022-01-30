import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ReservationLists from "./pages/ReservationLists";
import ReservationDetails from "./pages/ReservationDetails";
import MovieListings from "./pages/MovieListings";
import MovieDetails from "./pages/MovieDetails";
import Page from "./components/Page";
import AdminPanel from "./pages/AdminPanel";

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
        <Route exact path="/movies">
          <Page>
            <MovieListings />
          </Page>
        </Route>
        <Route path="/movies/:id">
          <MovieDetails />
        </Route>
        {user?.isAdmin && (
          <Route path="/administrador">
            <AdminPanel user={user} />
          </Route>
        )}

        <Route path="/signup">{!user ? <SignUp /> : <Redirect to="/" />}</Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {user && (
          <>
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
