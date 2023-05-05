import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, Card, CardMedia, CardContent, } from '@mui/material';
import { DisplayStyle } from './DisplayStyle';
// import Time from '../Time/Time';
import axios from 'axios';



export default function Display() {
  // console.log('DID YOU MAKE IT??', tickets)
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    setInterval(() => {
      handleGetAllTickets();
    }, 3000);
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






  const customers = tickets.map((ticket) => {
    return {
      customerName: ticket.customerName,
      customerPO: ticket.customerPO,
      order_number: ticket.orderNumber,
      TimeStamp: ticket.TimeStamp,
      TeamMember: ticket.TeamMember

    }
  }
  )
  console.log('customers', customers)




  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        const maxScrollPosition = scrollHeight - clientHeight;
        let nextScrollPosition = scrollPosition + 1;
        if (nextScrollPosition > maxScrollPosition) {
          nextScrollPosition = 0;
        }
        containerRef.current.scrollTo({ top: nextScrollPosition });
        setScrollPosition(nextScrollPosition);
      }
    }, 1);
    return () => clearInterval(interval);
  }, [scrollPosition]);





  let newTicket = [];
  // console.log('NEW ticket', ticket)
  if (tickets !== undefined) {
    // setInterval(() => {
    newTicket = customers.map((ticket) => (

      <Box sx={DisplayStyle.resultsMainBox}>
        {/* {console.log('HELLO!!!', ticket)} */}
        <Card sx={DisplayStyle.resultsContainer}
          key={ticket.id}>
          <CardMedia component="img" sx={DisplayStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
          <CardContent>
            <Typography sx={DisplayStyle.resultsTMName} variant="h5">{ticket.TeamMember.name}</Typography>
          </CardContent>
        </Card>
        <Box sx={DisplayStyle.resultCustomerInfoBox}>
          {/* <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>Currently Helping</Typography> */}
          <Box sx={DisplayStyle.resultCustomerBoxBorder}>
            <Typography sx={DisplayStyle.reultText} variant='h3'>Currently Helping :</Typography>
            <Typography variant='h3' sx={DisplayStyle.resultCustomerInfoText} >{ticket.customerName}</Typography>
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1 }}>
            <Typography sx={DisplayStyle.reultText} variant='h3'>Order Number :</Typography>
            <Typography variant='h3' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }} >{ticket.order_number}</Typography>
          </Box> */}

          <Box sx={DisplayStyle.resultCustomerBoxBorder}>
            <Typography sx={DisplayStyle.reultText} variant='h3'>Customer PO :</Typography>
            <Typography variant='h3' sx={DisplayStyle.resultCustomerInfoText} >{ticket.customerPO}</Typography>
          </Box>
          {/* <Box sx={DisplayStyle.resultCustomerBoxBorder}>
            <Typography sx={DisplayStyle.reultText} variant='h3'>Time:</Typography>
            <Typography variant='h3' sx={{ marginLeft: 2, display: 'flex', alignItems: 'center', color: 'red ' }} > <Time ticketTime={ticket.TimeStamp}></Time></Typography>

          </Box> */}


        </Box>
      </Box>
    ))
    // }, 5000);
  }


  return (
    <Box sx={DisplayStyle.displayBox}>
      <Box sx={DisplayStyle.resultBox} ref={containerRef}>
        {newTicket.length === 0 ? <></> : newTicket}
      </Box>
    </Box>
  )
}
