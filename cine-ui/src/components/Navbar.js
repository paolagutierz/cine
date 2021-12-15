import { useState } from "react";
import { connect } from "react-redux";
import { logoutAction } from "../store/actions/loginActions";
//MaterialUI
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useHistory } from "react-router";

const Navbar = ({ logout, user }) => {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRedirect = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }} max>
      <AppBar
        position="static"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Cidenet Pictures
          </Typography>
          <nav>
            <Button
              color="inherit"
              onClick={(e) => handleRedirect(e, "/movies")}>
              Cartelera
            </Button>
            {user?.isAdmin && (
              <Button color="inherit">Administrar Cartelera</Button>
            )}
            {user && (
              <Button
                color="inherit"
                onClick={(e) => handleRedirect(e, "/reservas")}>
                Lista de Reservas
              </Button>
            )}
            <IconButton
              size="large"
              edge="end"
              aria-label="Perfil del usuario"
              aria-haspopup="true"
              onClick={() => setIsMenuOpen(true)}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={isMenuOpen}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(isMenuOpen)}
              onClose={() => setIsMenuOpen(false)}>
              {user ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <MenuItem onClick={(e) => handleRedirect(e, "/login")}>
                  Login
                </MenuItem>
              )}
            </Menu>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
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
