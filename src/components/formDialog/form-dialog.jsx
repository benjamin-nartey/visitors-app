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
import { useContext } from "react";
import { CheckOutToggleContext } from "../context/checkoutToggle.context";

export default function FormDialog() {
  const { open, setOpen } = useContext(CheckOutToggleContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <div className="w-full grid place-items-center">
            <CheckoutForm />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
