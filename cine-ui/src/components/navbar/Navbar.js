import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import { connect } from "react-redux";
import { logoutAction } from "../../store/actions/loginActions";
import "./navbar.scss";
import { Link } from "react-router-dom";
import logocine from "../../img/logocine.png";

const Navbar = ({ logout, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src="" alt="" />
          <span>CARTELERA</span>
          <span>LISTA DE RESERVAS</span>
        </div>

        {user ? (
          <div className="right">
            <Search className="icon" />
            <img className="logo" src={logocine} alt="" />
            <Notifications className="icon" />
            <div className="profile">
              <ArrowDropDown className="icon" />
              <div className="options">
                <span>Settings</span>
                <span onClick={handleLogout}>Logout</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="right">
            <span>
              <Link to="/login">Iniciar sesion</Link>
            </span>
            <span>
              <Link to="/signup">Registrarme</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
