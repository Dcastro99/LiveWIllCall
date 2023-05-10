import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, Grid, Paper, TextField, InputLabel, Select, MenuItem, } from '@mui/material';
import TM from '../../asset/Data/VanTM.json'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { EditStyle } from '../Edit-Modal/EditStyle';
import { AdminStyle } from '../Admin/AdminStyle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ ticket, handleUpdateTicket }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newTM, setNewTM] = useState([])
  const [newName, setNewName] = useState('')
  const [newOrderNumber, setNewOrderNumber] = useState('')
  const [newPO, setNewPO] = useState('')
  const [time, setTime] = useState(null)


  useEffect(() => {
    setTime(ticket.TimeStamp)
    setNewTM(ticket.TeamMember.name)
    setNewName(ticket.customerName)
    setNewOrderNumber(ticket.orderNumber)
    setNewPO(ticket.customerPO)
  }, [ticket])



  const updateTicketHandler = (e) => {
    e.preventDefault();
    e.stopPropagation()

    let updatedTM = TM.find(tm => tm.name === newTM)
    console.log('updatedTM', updatedTM)
    const updatedTicket = {
      _id: ticket._id,
      customerName: newName,
      orderNumber: newOrderNumber,
      customerPO: newPO,
      TimeStamp: time,
      TeamMember: updatedTM
    }
    console.log('updatedTicket', updatedTicket)
    handleUpdateTicket(updatedTicket)

    setOpen(false);
  }


  return (
    <div>
      <Button sx={AdminStyle.editButton} onClick={handleOpen}><MoreHorizIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid >
            <Paper elevation={20} style={EditStyle.paper}>
              <Grid align='center'>
              </Grid>
              <form onSubmit={(e) => { updateTicketHandler(e) }}>
                <Typography variant='h5' sx={EditStyle.formtext} >Team Member</Typography>
                <InputLabel id="demo-simple-select-helper-label" >Team Member</InputLabel>
                <Select
                  sx={{ width: 150 }}
                  value={newTM}
                  name='new_tm'
                  label="Pick Team Member"
                  onChange={(e) => setNewTM(e.target.value)}
                >

                  {TM.map((tm) => (
                    // console.log('tm', tm),
                    <MenuItem placeholder={newTM} value={tm.name} key={tm.id}>{tm.name}</MenuItem>

                  ))
                  }

                </Select>
                <Typography variant='h5' sx={EditStyle.formtext}>Customer Name</Typography>
                <TextField name='customer_name' onChange={(e) => setNewName(e.target.value)} fullWidth sx={EditStyle.textFiled} value={newName} >
                </TextField>
                <Typography variant='h5' sx={EditStyle.formtext}>Order Number</Typography>
                <TextField label="order number" name='order_number' value={newOrderNumber} onChange={(e) => setNewOrderNumber(e.target.value)} sx={EditStyle.numberTextFiled} />
                <Typography variant='h5' sx={EditStyle.formtext}>PO</Typography>
                <TextField label="PO" name='customer_po' value={newPO} onChange={(e) => setNewPO(e.target.value)} sx={EditStyle.numberTextFiled} />

                <Button sx={EditStyle.button} type='submit' variant='contained' color='primary' fullWidth >Update</Button>
              </form>

            </Paper>
          </Grid>

        </Box>
      </Modal>
    </div>
  );
}