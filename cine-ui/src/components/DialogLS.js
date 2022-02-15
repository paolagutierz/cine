import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogLS({ textbtn, dialogmsg, callbackOnYes, disabled }) {
  console.log(disabled);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseYes = () => {
    setOpen(false);
    callbackOnYes();
  };

  const handleCloseNo = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          mr: 3,
        }}
        variant="contained"
        onClick={handleClickOpen}
        disabled={disabled}>
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
          <Button autoFocus onClick={() => handleCloseYes()}>
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
