import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography, Card, CardMedia, CardContent, Button, } from '@mui/material';
// import axios from 'axios';

// import TicketContext from '../../context/LiveTicket'
import { DisplayStyle } from './DisplayStyle';

export default function Display({ tickets, handleGetAllTickets }) {
  console.log('DID YOU MAKE IT??', tickets)
  const [seconds, setSeconds] = useState(0);


  const minutes = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);




  let newTicket = [];
  // console.log('NEW ticket', ticket)
  if (tickets !== undefined) {
    newTicket = tickets.map((ticket) => (
      <Box sx={DisplayStyle.resultsMainBox}>
        <Card sx={DisplayStyle.resultsContainer}
          key={ticket.id}>
          {console.log('Map ticket', ticket.TeamMember.name)}
          <CardMedia component="img" sx={DisplayStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
          <CardContent>
            <Typography sx={DisplayStyle.resultsTMName} variant="h5">{ticket.TeamMember.name}</Typography>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', height: '100%', margin: 2 }}>
          {/* <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>Currently Helping</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h5'>Currently Helping :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customerName}</Typography>
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h5'>Order Number :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.order_number}</Typography>
          </Box> */}

          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h5'>Customer PO :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customerPO}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h5'>Time:</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{minutes}: {second}</Typography>
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, }}>
            <Button sx={DisplayStyle.deleteButton} onClick={() => handleDelete(ticket.teamMember.id)}>X</Button>
          </Box> */}

        </Box>

      </Box>
    ))
  }


  return (
    <Box sx={DisplayStyle.displayBox}>
      <Box sx={DisplayStyle.resultBox}>
        {newTicket}
      </Box>
    </Box>
  )
}
