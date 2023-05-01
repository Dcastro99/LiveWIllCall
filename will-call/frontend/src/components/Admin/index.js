import React, { useState, useEffect, useCallback } from 'react'
import { Box, Typography, Card, CardMedia, CardContent, TextField, Button, Divider } from '@mui/material';
// import Time from '../Time/Time';
// import TicketContext from '../../context/LiveTicket';
import { AdminStyle } from './AdminStyle';
import TM from '../../asset/Data/TeamMembers.json'
import Logo from '../../asset/images/GLogo.png'
import axios from 'axios';


export default function Admin({ tickets, Time }) {
  const [teamMember, setTeamMember] = useState({})
  const [ticket, setTicket] = useState([{
    _id: '',
    customerName: '',
    orderNumber: '',
    customerPO: '',
    TimeStamp: '',
    TeamMember: {}

  }])

  const start = Date.now();


  useEffect(() => {
    setTicket(tickets)
  }, [tickets])







  //------------------- TICKET-CREATE-CRUD -------------------//
  const handleCreateTicket = async (ticket) => {
    const config = {
      method: 'POST',
      baseURL: `${process.env.REACT_APP_VERCEL_URL}`,
      url: '/ticket',
      data: { ticket }
    }
    const response = await axios(config)
    console.log('response', response)
  }

  //------------------- TICKET-DELETE-CRUD -------------------//
  const handleDeleteTicket = async (id) => {
    console.log('delete in HERE', id)
    const config = {
      method: 'DELETE',
      baseURL: `${process.env.REACT_APP_VERCEL_URL}`,
      url: `/ticket/${id}`,
    }
    const response = await axios(config)
    console.log('response', response)
  }


  //------------------- TEAM-MEMBER -------------------//
  const handleTM = (tm) => {
    console.log('tm here', tm)
    setTeamMember(tm)
  }

  //------------------- TICKET-DELETE -------------------//
  const handleDelete = (tm) => {
    console.log('delete ticket', tm)
    handleDeleteTicket(tm._id);
    setTicket(ticket.filter((id) => id._id !== tm._id))
  }

  //------------------- TICKET-ADD -------------------//
  const addLiveWillCall = (e) => {
    e.preventDefault();
    const formData = e.target;
    let newTicket = {
      customer_name: formData.customer_name.value,
      order_number: formData.order_number.value,
      customer_po: formData.customer_po.value,
      teamMember: teamMember,
      ticket_time: start
    }

    handleCreateTicket(newTicket)

    document.getElementById('ticketForm').reset();
  }





  let newTicket = [];
  // console.log('NEW ticket', ticket)
  if (ticket.length > 0) {
    newTicket = ticket.map((ticket) => (

      <Box sx={AdminStyle.resultsMainBox}>
        {/* {console.log('ticket]]]]', ticket)} */}
        <Card sx={AdminStyle.resultsContainer}
          key={ticket.id}>
          {/* {console.log('Map ticket', ticket)} */}
          <CardMedia component="img" sx={AdminStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
          <CardContent>
            <Typography sx={AdminStyle.resultsTMName} variant="h5">{ticket.TeamMember.name}</Typography>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', height: '100%', margin: 2 }}>
          {/* <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>Currently Helping</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='6'>Currently Helping :</Typography>
            <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customerName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='6'>Order Number :</Typography>
            <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.orderNumber}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='6'>Customer PO :</Typography>
            <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customerPO}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='6'>Time:</Typography>
            <Typography variant='6' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} ><Time ticketTime={ticket.TimeStamp}></Time></Typography>

          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, }}>
            <Button sx={AdminStyle.deleteButton} onClick={() => handleDelete(ticket)}>X</Button>
          </Box>

        </Box>

      </Box>
    ))
  }


  return (
    <Box sx={{ height: '100%' }}>
      <form id='ticketForm' onSubmit={(e) => { addLiveWillCall(e) }}>
        <Box sx={AdminStyle.adminHeader}>
          <img src={Logo} width="90" alt="Will Call Logo" />
          <Typography variant="h4">Manage Team Members</Typography>
          <img src={null} width="90" />
        </Box>
        <Box sx={AdminStyle.adminContainer}>
          <Box sx={AdminStyle.inputBox}>
            <Box sx={AdminStyle.customerInfoBox}>
              <Typography sx={AdminStyle.customerText} variant="h6">Customer Name</Typography>
              <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer Name" variant="outlined" name='customer_name' />
              <Typography sx={AdminStyle.customerText} variant="h6">Order Number</Typography>
              <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Order Number" variant="outlined" name='order_number' />
              <Typography sx={AdminStyle.customerText} variant="h6">Customer PO</Typography>
              <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer PO" variant="outlined" name='customer_po' />
            </Box>
            <Divider sx={{ width: '90%', margin: 3, bgcolor: 'GhostWhite', marginBottom: 2, }} />
            <Box>
              <Box sx={AdminStyle.imgBox}>

                {TM.length > 0 ? TM.map((member) => (
                  <Button sx={AdminStyle.carButton} onClick={() => handleTM(member)}>
                    <Card sx={AdminStyle.cardContainer}
                      key={member.id} >

                      {/* <CardActionArea> */}
                      <CardMedia key={member.id} component="img" sx={AdminStyle.carImg} image={member.image} alt={member.name} />
                      <CardContent sx={AdminStyle.cardContent}>
                        <Typography sx={AdminStyle.carName} variant="h5">{member.name}</Typography>
                      </CardContent>
                      {/* </CardActionArea> */}
                    </Card>
                  </Button>
                )) : <Typography variant="h5">No Team Members</Typography>}
              </Box>

            </Box>
            <Divider sx={{ width: '90%', margin: 2, bgcolor: 'GhostWhite' }} />
            <Button sx={AdminStyle.submitButton} type='submit'>Submit</Button>
          </Box>

          <Box sx={AdminStyle.displayBox}>
            <Box sx={AdminStyle.resultBox}>
              {newTicket}

            </Box>

          </Box>
        </Box >
      </form>
    </Box >
  )
}
