import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Card, CardMedia, CardContent, TextField, Button, Divider } from '@mui/material';
import TicketContext from '../../context/LiveTicket';
import { AdminStyle } from './AdminStyle';
import TM from '../../asset/Data/TeamMembers.json'
import Logo from '../../asset/images/GLogo.png'

console.log('????', TM)
export default function Admin() {
  const [teamMember, setTeamMember] = useState({})
  const [ticket, setTicket] = useState([])
  const [seconds, setSeconds] = useState(0);
  const { addTicket } = useContext(TicketContext)
  console.log('TICKETS_______', ticket)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const minutes = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);


  console.log('ticket', ticket)
  const handleTM = (tm) => {
    console.log('tm here', tm)
    setTeamMember(tm)
  }

  const handleDelete = (id) => {
    console.log('delete', id)
    setTicket(ticket.filter((ticket) => ticket.teamMember.id !== id))
  }

  const addLiveWillCall = (e) => {
    // console.log('live!!')
    e.preventDefault();
    const formData = e.target;

    setTicket((prev) => [...prev, {
      customer_name: formData.customer_name.value,
      order_number: formData.order_number.value,
      customer_po: formData.customer_po.value,
      teamMember: teamMember
    }])
    addTicket(
      formData.customer_name.value,
      formData.order_number.value,
      formData.customer_po.value,
      teamMember

    )
    document.getElementById('ticketForm').reset();
  }
  let newTicket = [];
  console.log('NEW ticket', ticket)
  if (ticket.length > 0) {
    newTicket = ticket.map((ticket) => (
      <Box sx={AdminStyle.resultsMainBox}>
        <Card sx={AdminStyle.resultsContainer}
          key={ticket.id}>
          {console.log('Map ticket', ticket)}
          <CardMedia component="img" sx={AdminStyle.resultImg} image={ticket.teamMember.image} alt={ticket.teamMember.name} />
          <CardContent>
            <Typography sx={AdminStyle.resultsTMName} variant="h5">{ticket.teamMember.name}</Typography>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', height: '100%', margin: 2 }}>
          {/* <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>Currently Helping</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='h5'>Currently Helping :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customer_name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='h5'>Order Number :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.order_number}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='h5'>Customer PO :</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.customer_po}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', padding: 1, marginBottom: 1 }}>
            <Typography sx={AdminStyle.resultText} variant='h5'>Time:</Typography>
            <Typography variant='h5' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{minutes}: {second}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, }}>
            <Button sx={AdminStyle.deleteButton} onClick={() => handleDelete(ticket.teamMember.id)}>X</Button>
          </Box>

        </Box>

      </Box>
    ))
  }


  return (
    <Box>
      <form id='ticketForm' onSubmit={(e) => { addLiveWillCall(e) }}>
        <Box sx={AdminStyle.adminHeader}>
          <img src={Logo} width="180" alt="Will Call Logo" />
          <Typography variant="h3">Manage Team Members</Typography>
          <img src={null} width="180" />
        </Box>
        <Box sx={AdminStyle.adminContainer}>
          <Box sx={AdminStyle.inputBox}>
            <Box sx={AdminStyle.customerInfoBox}>
              <Typography sx={AdminStyle.customerText} variant="h5">Customer Name</Typography>
              <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer Name" variant="outlined" name='customer_name' />
              <Typography sx={AdminStyle.customerText} variant="h5">Order Number</Typography>
              <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Order Number" variant="outlined" name='order_number' />
              <Typography sx={AdminStyle.customerText} variant="h5">Customer PO</Typography>
              <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer PO" variant="outlined" name='customer_po' />
            </Box>
            <Divider sx={{ width: '90%', margin: 3, bgcolor: 'black', marginBottom: 2 }} />
            <Box>
              <Box sx={AdminStyle.imgBox}>

                {TM.length > 0 ? TM.map((member) => (
                  <Button sx={AdminStyle.carButton} onClick={() => handleTM(member)}>
                    <Card sx={AdminStyle.cardContainer}
                      key={member.id} >
                      {console.log('in the MAP', member)}
                      {/* <CardActionArea> */}
                      <CardMedia key={member.id} component="img" sx={AdminStyle.carImg} image={member.image} alt={member.name} />
                      <CardContent>
                        <Typography sx={AdminStyle.carName} variant="h5">{member.name}</Typography>
                      </CardContent>
                      {/* </CardActionArea> */}
                    </Card>
                  </Button>
                )) : <Typography variant="h5">No Team Members</Typography>}
              </Box>

            </Box>
            <Divider sx={{ width: '90%', margin: 2, bgcolor: 'black' }} />
            <Button sx={AdminStyle.submitButton} type='submit'>Submit</Button>
          </Box>

          <Box sx={AdminStyle.displayBox}>
            <Box sx={AdminStyle.resultBox}>
              {newTicket}

            </Box>

          </Box>
        </Box >
      </form>
    </Box>
  )
}
