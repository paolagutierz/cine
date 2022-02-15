import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f5f5f5",
  opacity: 0.9,
  boxShadow: 29,
  border: "2px solid #f5f5f5",
  p: 9,
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
        aria-labelledby="keep-mounted-modal-title">
        <Box sx={style}>
          <Typography
            id="keep-mounted-modal-title"
            variant="h5"
            component="h2"
            color="#212121"
            align="center">
            Cerraste sesión exitosamente.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
