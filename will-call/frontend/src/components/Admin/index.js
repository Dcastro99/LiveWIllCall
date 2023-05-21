import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import EditModal from '../Edit-Modal/EditModal';
import { AdminStyle } from './AdminStyle';
import Logo from '../../asset/images/GLogo.png'
import axios from 'axios';
import Time from '../Time/Time';
import InputForm from './inputForm';
import SubmitDiaologBox from './SubmitDiaologBox';

export default function Admin() {
  const [tickets, setTickets] = useState([])
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
    setTickets(tickets.filter(t => t._id !== response.data._id));
  }


  //------------------- TICKET-DELETE -------------------//
  const handleDelete = () => {
    let tm = deleteState

    setTickets(tickets.filter((id) => id._id !== tm._id))
    handleDataStorage(tm)
    handleCloseDialog();
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
      {/*------------------- HEADER -------------------*/}

      <Box sx={AdminStyle.adminHeader}>
        <img src={Logo} width="90" alt="Will Call Logo" />
        <Typography variant="h4">Manage Team Members</Typography>
        <Box sx={AdminStyle.adminHeaderRightImgBox} />
      </Box>
      <Box sx={AdminStyle.adminContainer}>

        {/*------------------- INPUT-FORM -------------------*/}

        <InputForm handleCreateTicket={handleCreateTicket} />

        <Box sx={AdminStyle.dividerBox} />
        <Box sx={AdminStyle.resultDisplayBox}>
          <Box sx={AdminStyle.resultBox}>

            {/*------------------- DISPLAY-TEAM-MEMBER-CARDS -------------------*/}

            {tickets.length > 0 ? tickets.length && tickets.map((ticket) => (

              <Box sx={AdminStyle.resultsMainBox} key={ticket._id} >
                <Card sx={AdminStyle.resultsContainer}
                  key={ticket.id}>
                  <CardMedia component="img" sx={AdminStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
                  <CardContent>
                    <Typography sx={AdminStyle.resultsTMName} variant="h5">{ticket.TeamMember.name}</Typography>
                  </CardContent>
                </Card>
                <Box sx={AdminStyle.resultTextFeildContainer}>

                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Customer:</Typography>
                    <Typography variant='6' sx={AdminStyle.resultFeilds} >{ticket.customerName}</Typography>
                  </Box>
                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Order Number :</Typography>
                    <Typography variant='6' sx={AdminStyle.resultFeilds} >{ticket.orderNumber}</Typography>
                  </Box>

                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Customer PO :</Typography>
                    <Typography variant='6' sx={AdminStyle.resultFeilds} >{ticket.customerPO}</Typography>
                  </Box>
                  <Box sx={AdminStyle.resultTextfield}>
                    <Typography sx={AdminStyle.resultText} variant='6'>Time:</Typography>
                    <Typography variant='6' sx={AdminStyle.resultFeilds} >
                      <Time ticketTime={ticket.TimeStamp}></Time></Typography>
                  </Box>
                  <Box sx={AdminStyle.resultEditContainer}>

                    {/* ------------------- TICKET-DELETE-BUTTON ------------------- */}

                    < SubmitDiaologBox handleDelete={handleDelete} handleCloseDialog={handleCloseDialog} handleOpenDialog={handleOpenDialog} ticket={ticket} open={open} onClick={() => handleOpenDialog(ticket)} />

                    {/* ------------------- TICKET-EDIT-BUTTON ------------------- */}

                    <EditModal handleUpdateTicket={handleUpdateTicket} ticket={ticket} noTM={noTM} />

                  </Box>
                </Box>

              </Box>
            )) :
              <Box sx={AdminStyle.noTmBox}>

                <Typography sx={AdminStyle.noTicketContainer} variant="h5">No Live Tickets</Typography>
              </Box>
            }
          </Box>
        </Box>

      </Box>
    </>
  )
}
