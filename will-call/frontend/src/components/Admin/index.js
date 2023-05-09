import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardMedia, CardContent, TextField, Button, Divider } from '@mui/material';
import EditModal from '../Edit-Modal/EditModal';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { AdminStyle } from './AdminStyle';
import TM from '../../asset/Data/TeamMembers.json'
import Logo from '../../asset/images/GLogo.png'
import axios from 'axios';
import Time from '../Time/Time';

export default function Admin() {
  const [tickets, setTickets] = useState([])
  const [teamMember, setTeamMember] = useState({})
  const [clicked, setClicked] = useState(null)
  const [time, setTime] = useState(null)


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

  //------------------- TICKET-DELETE-CRUD -------------------//
  const handleDeleteTicket = async (id) => {
    // console.log('delete in HERE', id)
    const config = {
      method: 'DELETE',
      baseURL: `${process.env.REACT_APP_VERCEL_URL}`,
      url: `/ticket/${id}`,
    }
    const response = await axios(config)
    console.log('response', response)
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
    console.log('oldTickets', oldTickets)
    console.log('updatedTickets', updatedTickets)
    setTickets(updatedTickets);

  }


  //------------------- TEAM-MEMBER -------------------//
  const handleTM = (tm, index) => {
    console.log('tm here', tm, index)
    // timeFunction()
    setTeamMember(tm);
    setClicked(index === clicked ? null : index);
  }

  //------------------- TICKET-DELETE -------------------//
  const handleDelete = (tm) => {
    console.log('delete ticket', tm)
    setTickets(tickets.filter((id) => id._id !== tm._id))
    handleDeleteTicket(tm._id);
  }

  //------------------- TICKET-ADD -------------------//
  const addLiveWillCall = (e) => {
    console.log('addLiveWillCall - HIT')
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
      TimeStamp: time
    }

    // console.log('Adding to backend')
    handleCreateTicket(newTicket)
    document.getElementById('ticketForm').reset();
    setClicked('')
    setTeamMember({})
  }







  // console.log('NEW ticket', ticket)



  return (
    <Box sx={{ height: '100%' }}>
      <form id='ticketForm' onSubmit={(e) => { addLiveWillCall(e) }}>
        <Box sx={AdminStyle.adminHeader}>
          <img src={Logo} width="90" alt="Will Call Logo" />
          <Typography variant="h4">Manage Team Members</Typography>
          <Box sx={{ width: '50px', height: '50px' }} />
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
            <Divider sx={{ width: '90%', margin: 2, bgcolor: 'GhostWhite', marginBottom: 1, }} />
            <Box>
              <Box sx={AdminStyle.imgBox}>

                {/*------------------- ADD-TEAM-MEMBER -------------------*/}

                {TM.length > 0 ? TM.map((member, index) => (
                  <Button sx={AdminStyle.carButton} onClick={() => handleTM(member, index)} key={member.id}>
                    <Card
                      sx={index === clicked ? AdminStyle.cardContainerClicked : AdminStyle.cardContainer}
                      key={member.id} >
                      {/* <CardActionArea> */}
                      <CardMedia component="img" sx={AdminStyle.carImg} image={member.image} alt={member.name} />
                      <CardContent sx={AdminStyle.cardContent}>
                        <Typography sx={AdminStyle.carName} variant="h5">{member.name}</Typography>
                      </CardContent>
                      {/* </CardActionArea> */}
                    </Card>
                  </Button>
                )) : <Typography variant="h5">No Team Members</Typography>}
              </Box>

            </Box>
            <Divider sx={{ width: '90%', margin: 1, bgcolor: 'GhostWhite' }} />
            <Button sx={AdminStyle.submitButton} type='submit' onClick={timeFunction}>Submit</Button>
          </Box>

          <Box sx={AdminStyle.displayBox}>
            <Box sx={AdminStyle.resultBox}>

              {/*------------------- DISPLAY-TEAM-MEMBER-CARDS -------------------*/}

              {tickets.length && tickets.map((ticket) => (

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
                      <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, }}>
                        <Button sx={AdminStyle.deleteButton} onClick={() => handleDelete(ticket)}><DeleteForeverOutlinedIcon /></Button>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, }}>
                        <EditModal handleUpdateTicket={handleUpdateTicket} ticket={ticket} />
                      </Box>
                    </Box>
                  </Box>

                </Box>
              ))
              }
            </Box>
          </Box>
        </Box >
      </form>
    </Box >
  )
}
