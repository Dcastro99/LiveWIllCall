import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { DisplayStyle } from './DisplayStyle';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';



export default function Display() {
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




  return (
    <Box sx={DisplayStyle.displayBox}>
      <Carousel fade interval={4000} controls={false} style={{ width: '100%' }} >
        {customers.length > 0 ? customers.map((ticket) => (
          <Carousel.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={DisplayStyle.resultsMainBox}>
              <Card sx={DisplayStyle.resultsContainer}
                key={ticket.id}>
                <CardMedia component="img" sx={DisplayStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
                <CardContent>
                  <Typography sx={DisplayStyle.resultsTMName} variant="h5">{ticket.TeamMember.name}</Typography>
                </CardContent>
              </Card>
              <Box sx={DisplayStyle.resultCustomerInfoBox}>
                <Box sx={DisplayStyle.resultCustomerBoxBorder}>
                  <Typography sx={DisplayStyle.reultText} variant='h3'>Customer Name :</Typography>
                  <Typography variant='h3' sx={DisplayStyle.resultCustomerInfoText} >{ticket.customerName}</Typography>
                </Box>
                <Box sx={DisplayStyle.resultCustomerBoxBorder}>
                  <Typography sx={DisplayStyle.reultText} variant='h3'>Customer PO :</Typography>
                  <Typography variant='h3' sx={DisplayStyle.resultCustomerInfoText2} >{ticket.customerPO}</Typography>
                </Box>
              </Box>
            </Box>
          </Carousel.Item>
        )) :
          <Carousel.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={DisplayStyle.resultsMainBoxEmpty}>
              <Typography variant='h2'>Welcome To Gensco</Typography>
              <Typography variant='h2' sx={{ fontFamily: 'Dancing Script', fontWeight: 'bold' }}>Live Will Call</Typography>
            </Box>
          </Carousel.Item>
        }
      </Carousel >
    </Box >
  )
}
