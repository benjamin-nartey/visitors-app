import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ONPREMISE_COLUMN } from '../../utils/onpremise-column/onpremise-column';
import { Table } from 'antd';

export default function onPremise({ open, setOpen, onPremise }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>On Premise</DialogTitle>
        <DialogContent>
          <div className="grid place-items-center ">
            {/* <CheckoutForm /> */}
            <Table
              dataSource={
                onPremise &&
                onPremise.map((item) => ({
                  key: item.id,
                  ...item,
                }))
              }
              columns={ONPREMISE_COLUMN}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="px-4 py-1 hover:font-bold rounded text-green-700 uppercase"
            onClick={handleClose}
          >
            Cancel
          </button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
