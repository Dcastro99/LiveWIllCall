import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardMedia, CardContent, TextField, Button, Divider, Dialog, DialogTitle, DialogActions } from '@mui/material';
import EditModal from '../Edit-Modal/EditModal';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { AdminStyle } from './AdminStyle';
import TM from '../../asset/Data/VanTM.json'
import Logo from '../../asset/images/GLogo.png'
import axios from 'axios';
import Time from '../Time/Time';

export default function Admin() {
  const [tickets, setTickets] = useState([])
  const [teamMember, setTeamMember] = useState({})
  const [clicked, setClicked] = useState(null)
  const [time, setTime] = useState(null)
  const [open, setOpen] = useState(false);
  const [deleteState, setDeleteState] = useState({})

  useEffect(() => {
    handleGetAllTickets();
  }, []);


  const handleGetAllTickets = async () => {
    const config = {
      method: 'GET',
      baseURL: process.env.REACT_APP_VERCEL_URL,
      url: '/allTickets',
    };
    const response = await axios(config);
    setTickets(response.data)
  }


  //------------------- CREATING-TIME-FUNCTION -------------------//
  const timeFunction = () => {
    return setTime(Date.now());
  }

  //------------------- IF-NO-TEAMMEMBER-SELECTED -------------------//
  const noTM = {
    name: 'Pending...',
    image: Logo
  }


  //------------------- TICKET-CREATE-CRUD -------------------//
  const handleCreateTicket = async (ticket) => {
    const config = {
      method: 'POST',
      baseURL: `${process.env.REACT_APP_VERCEL_URL}`,
      url: '/ticket',
      data: { ticket }
    }
    const response = await axios(config)
    const oldTickets = [...tickets];
    oldTickets.push(response.data);
    setTickets(oldTickets);
  }


  //------------------- TICKET-UPDATE-CRUD -------------------//
  const handleUpdateTicket = async (ticket) => {
    console.log('Are you sure you want to update this ticket?', ticket)
    const config = {
      method: 'PUT',
      baseURL: `${process.env.REACT_APP_VERCEL_URL}`,
      url: `/ticket/${ticket._id}`,
      data: { ticket }
    }
    await axios(config)
    const oldTickets = [...tickets];
    const updatedTickets = oldTickets.map((t) => {
      if (t._id === ticket._id) {
        return ticket;
      } else {
        return t;
      }
    })
    setTickets(updatedTickets);
  }

  //------------------- TICKET-STORE_DATA-CRUD -------------------//

  const handleDataStorage = async (ticket) => {
    // console.log('Are you sure you want to update this ticket?', ticket)
    const config = {
      method: 'PUT',
      baseURL: `${process.env.REACT_APP_VERCEL_URL}`,
      url: `/data/${ticket._id}`,
      data: { ticket }
    }
    const response = await axios(config)
    // console.log('response', response.data)
    setTickets(tickets.filter(t => t._id !== response.data.ticket._id));
  }

  //------------------- TEAM-MEMBER -------------------//
  const handleTM = (tm, index) => {
    // console.log('tm here', tm, index)
    // timeFunction()
    setTeamMember(tm);
    setClicked(index === clicked ? null : index);
  }

  //------------------- TICKET-DELETE -------------------//
  const handleDelete = () => {
    let tm = deleteState

    setTickets(tickets.filter((id) => id._id !== tm._id))
    handleDataStorage(tm)
    handleCloseDialog();
  }

  //------------------- TICKET-ADD -------------------//
  const addLiveWillCall = (e) => {
    // console.log('addLiveWillCall - HIT')
    e.preventDefault();
    let tm = '';
    if (teamMember.name === undefined) {
      tm = noTM
    } else {
      tm = teamMember
    }

    const formData = e.target;
    let newTicket = {
      customerName: formData.customer_name.value,
      orderNumber: formData.order_number.value,
      customerPO: formData.customer_po.value,
      TeamMember: tm,
      TimeStamp: time,
      storeData: false
    }
    // console.log('addLiveWillCall - newTicket', newTicket)
    // console.log('Adding to backend')
    handleCreateTicket(newTicket)
    document.getElementById('ticketForm').reset();
    setClicked('')
    setTeamMember({})
  }

  //------------------- TICKET-DELETE-DIALOGBOX -------------------//
  const handleOpenDialog = (ticket) => {
    // console.log('ticket=> in OPENHANDLE', ticket)
    setDeleteState(ticket)
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={AdminStyle.adminHeader}>
        <img src={Logo} width="90" alt="Will Call Logo" />
        <Typography variant="h4">Manage Team Members</Typography>
        <Box sx={{ width: '50px', height: '50px' }} />
      </Box>
      <Box sx={AdminStyle.adminContainer}>
        <Box sx={{ width: '30%', minHeight: '120%' }}>
          <form style={{ height: "100%" }} id='ticketForm' onSubmit={(e) => { addLiveWillCall(e) }}>
            <Box sx={AdminStyle.inputBox}>
              <Box sx={AdminStyle.customerInfoBox}>
                <Typography sx={AdminStyle.customerText} variant="h6">Customer Name</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer Name" variant="outlined" name='customer_name' />
                <Typography sx={AdminStyle.customerText} variant="h6">Order Number</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Order Number" variant="outlined" name='order_number' />
                <Typography sx={AdminStyle.customerText} variant="h6">Customer PO</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer PO" variant="outlined" name='customer_po' />
              </Box>
              <Divider sx={{ width: '90%', bgcolor: 'GhostWhite', opacity: 1, marginTop: 5, marginBottom: 5 }} />
              <Box sx={AdminStyle.imgBox}>

                {/*------------------- ADD-TEAM-MEMBER -------------------*/}

                {TM.length > 0 ? TM.map((member, index) => (
                  <Button sx={AdminStyle.carButton} onClick={() => handleTM(member, index)} key={member.id}>
                    <Card
                      sx={index === clicked ? AdminStyle.cardContainerClicked : AdminStyle.cardContainer}
                      key={member.id} >
                      <CardMedia component="img" sx={AdminStyle.carImg} image={member.image} alt={member.name} />
                      <CardContent sx={AdminStyle.cardContent}>
                        <Typography sx={AdminStyle.carName} variant="h5">{member.name}</Typography>
                      </CardContent>
                    </Card>
                  </Button>
                )) : <Typography variant="h5">No Team Members</Typography>}
              </Box>

              <Divider sx={{ width: '90%', bgcolor: 'GhostWhite', opacity: 1, marginTop: 5, marginBottom: 5 }} />
              <Button sx={AdminStyle.submitButton} type='submit' onClick={timeFunction}>Submit</Button>
            </Box>
          </form >
        </Box >
        <Box sx={{ width: 4, height: 920, backgroundColor: 'whitesmoke' }}></Box>
        <Box sx={AdminStyle.displayBox}>
          <Box sx={AdminStyle.resultBox}>

            {/*------------------- DISPLAY-TEAM-MEMBER-CARDS -------------------*/}

            {tickets.length > 0 ? tickets.length && tickets.map((ticket) => (

              <Box sx={AdminStyle.resultsMainBox} key={ticket._id} >
                {/* {console.log('ticket]]]]', ticket)} */}
                <Card sx={AdminStyle.resultsContainer}
                  key={ticket.id}>
                  {/* {console.log('Map ticket', ticket)} */}
                  <CardMedia component="img" sx={AdminStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
                  <CardContent>
                    <Typography sx={AdminStyle.resultsTMName} variant="h5">{ticket.TeamMember.name}</Typography>
                  </CardContent>
                </Card>
                <Box sx={AdminStyle.resultTexfeildContainer}>
                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Customer:</Typography>
                    <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customerName}</Typography>
                  </Box>
                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Order Number :</Typography>
                    <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.orderNumber}</Typography>
                  </Box>

                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Customer PO :</Typography>
                    <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customerPO}</Typography>
                  </Box>
                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Time:</Typography>
                    <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >
                      <Time ticketTime={ticket.TimeStamp}></Time></Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                    <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, }}>
                      <EditModal handleUpdateTicket={handleUpdateTicket} ticket={ticket} noTM={noTM} />
                    </Box>
                  </Box>
                </Box>

              </Box>
            )) :
              <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="h5">No Tickets</Typography>
            }
          </Box>
        </Box>

      </Box>
    </>
  )
}
