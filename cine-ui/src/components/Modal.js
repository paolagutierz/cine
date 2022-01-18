import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { logoutAction } from "../store/actions/loginActions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#b2102f",
  opacity: 0.9,
  boxShadow: 29,
  border: "2px solid #b2102f",
  p: 8,
};

export default function KeepMountedModal({ logout, closeMenu }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleRedirect = (e, path) => {
    setOpen(false);
    e.preventDefault();
    history.push(path);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("user");
    handleOpen();
    setTimeout(() => {
      logout();
      closeMenu(false);
      handleRedirect(e, "/");
    }, 1000);
  };

  return (
    <div>
      <Button onClick={handleLogout}>Cerrar Sesion</Button>

      <Modal
        keepMounted
        open={open}
        onClose
        aria-labelledby="keep-mounted-modal-description">
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-description"
            variant="h6"
            component="h6"
            color="#f5f5f5"
            align="center"></Typography>
        </Box>
      </Modal>
    </div>
  );
}
