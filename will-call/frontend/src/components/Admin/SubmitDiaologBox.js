import React from 'react'
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';


export default function SubmitDiaologBox({ open, handleCloseDialog, handleDelete }) {
  return (
    <Dialog open={open} onClose={handleCloseDialog} >
      <DialogTitle>Are you sure you want to DELETE?</DialogTitle>
      <DialogActions>
        <Button sx={{ color: 'grey' }} onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button sx={{ color: 'salmon' }} onClick={() => handleDelete()} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
