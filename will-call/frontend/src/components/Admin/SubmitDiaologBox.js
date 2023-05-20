import React from 'react'
import { Box, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { AdminStyle } from './AdminStyle';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


export default function SubmitDiaologBox({ open, handleCloseDialog, handleDelete, handleOpenDialog, ticket }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2 }}>

      <Button sx={AdminStyle.deleteButton} variant="contained" color="primary" onClick={() => handleOpenDialog(ticket)} >
        <DeleteForeverOutlinedIcon />
      </Button>
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
    </Box>
  )
}
