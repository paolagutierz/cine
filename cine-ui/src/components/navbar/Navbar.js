import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { connect } from "react-redux";
import { logoutAction } from "../../store/actions/loginActions";
import "./navbar.scss";

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
          {user?.isAdmin && <span>ADMINISTRAR PELICULAS</span>}
          <span>LISTA DE RESERVAS</span>
        </div>

        {user && (
          <div className="right">
            <div className="profile">
              <ArrowDropDownIcon />
              <div className="options">
                <span onClick={handleLogout}>Logout</span>
              </div>
            </div>
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
