import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { FiLogOut } from "react-icons/fi";
import DialogTitle from "@mui/material/DialogTitle";
import CheckoutForm from "../checkout/checkout.component";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{
          right: "-24.5rem",
          color: "green",
          border: "1px solid green",
          width: "40px",
          top: "-17px",
          fontSize: "bold",
        }}
        className="absolute"
        variant="outlined"
        onClick={handleClickOpen}
      >
        <FiLogOut />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <div className="w-full grid place-items-center">
            <CheckoutForm />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
