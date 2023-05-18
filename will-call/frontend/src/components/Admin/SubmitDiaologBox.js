import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material'

export default function SubmitDiaologBox(handleDeleteCall, ticket) {
  console.log('ticket', ticket)
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    // This function will be called when the user confirms
    // Close the dialog
    handleCloseDialog();
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Submit
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to submit?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
