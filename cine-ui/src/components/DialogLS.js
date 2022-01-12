import * as React from "react";
import { reservationMock } from "../store/actions/reservationActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useSnackbar } from "notistack";

const removeItem = (array, item) => {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogLS({ textbtn, dialogmsg, removeSeats }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseYes = (variant) => {
    enqueueSnackbar("Liberacion Exitosa", { variant });
    setOpen(false);
    removeSeats();
  };

  const handleCloseNo = (variant) => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          mr: 2,
        }}
        variant="contained"
        onClick={handleClickOpen}>
        {textbtn}
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        TransitionComponent={Transition}
        onClose={handleCloseNo}
        open={open}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <DialogContentText>{dialogmsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleCloseYes("success")}>
            Si
          </Button>
          <Button onClick={handleCloseNo} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogLS;
