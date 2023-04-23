import React, { useState, useContext, useEffect } from 'react'
import { Box, Typography, Card, CardMedia, CardContent, Button, } from '@mui/material';

import TicketContext from '../../context/LiveTicket'
import { AdminStyle } from '../Admin/AdminStyle';
import { DisplayStyle } from './DisplayStyle';

export default function Display() {
  const { ticket } = useContext(TicketContext)
  const [seconds, setSeconds] = useState(0);
  const [tickets, setTickets] = useState([])


  const minutes = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);

  useEffect(() => {
    setTickets(ticket)
  }, [ticket])

  // const handleDelete = (id) => {
  //   console.log('delete', id)
  //   setTickets(ticket.filter((ticket) => ticket.teamMember.id !== id))
  // }



  let newTicket = [];
  console.log('NEW ticket', ticket)
  if (tickets.length > 0) {
    newTicket = tickets.map((ticket) => (
      <Box sx={DisplayStyle.resultsMainBox}>
        <Card sx={DisplayStyle.resultsContainer}
          key={ticket.id}>
          {console.log('Map ticket', ticket)}
          <CardMedia component="img" sx={DisplayStyle.resultImg} image={ticket.teamMember.image} alt={ticket.teamMember.name} />
          <CardContent>
            <Typography sx={DisplayStyle.resultsTMName} variant="h5">{ticket.teamMember.name}</Typography>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', height: '100%', margin: 2 }}>
          {/* <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>Currently Helping</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h5'>Currently Helping :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customer_name}</Typography>
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h5'>Order Number :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.order_number}</Typography>
          </Box> */}

          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h5'>Customer PO :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customer_po}</Typography>
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
    <Box sx={DisplayStyle.resultBox}>
      {newTicket}
    </Box>
  )
}
