import React, { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardMedia, CardContent,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import DisplayStyle from "./DisplayStyle";

export default function Display() {
  const [tickets, setTickets] = useState([]);

  // --------------------GET ALL TICKETS--------------------//
  const handleGetAllTickets = async () => {
    const config = {
      method: "GET",
      baseURL: process.env.REACT_APP_VERCEL_URL,
      url: "/allTickets",
    };
    const response = await axios(config);
    setTickets(response.data);
  };

  useEffect(() => {
    setInterval(() => {
      handleGetAllTickets();
    }, 3000);
  }, []);

  //--------------------GET ALL TICKETS--------------------//

  const handleGetAllTickets = async () => {
    const config = {
      method: 'GET',
      baseURL: process.env.REACT_APP_VERCEL_URL,
      url: '/allTickets',
    };
    const response = await axios(config);
    setTickets(response.data)
  }

  //-----------------ALL CUSTOMERS-----------------//

  const customers = tickets.map((ticket) => {


    return {
      customerName: ticket.customerName,
      customerPO: ticket.customerPO,
      order_number: ticket.orderNumber,
      TimeStamp: ticket.TimeStamp,
      TeamMember: ticket.TeamMember,
      _id: ticket._id
    }
  }
  )


  const customers = tickets.map((ticket) => ({
    customerName: ticket.customerName,
    customerPO: ticket.customerPO,
    order_number: ticket.orderNumber,
    TimeStamp: ticket.TimeStamp,
    TeamMember: ticket.TeamMember,

  }));

  return (
    <Box sx={DisplayStyle.displayBox}>
      <Carousel fade interval={4000} controls={false} style={DisplayStyle.carouselContainer} >
        {customers.length > 0 ? customers.map((ticket) => (
          <Carousel.Item style={DisplayStyle.carouselItemContainer} key={ticket._id}>
            <Box sx={DisplayStyle.resultsMainBox} key={ticket._id}>
              <Card sx={DisplayStyle.resultsContainer}
                key={ticket._id}>
                <CardMedia component="img" sx={DisplayStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
                <CardContent>
                  <Typography
                    sx={ DisplayStyle.resultsTMName }
                    variant="h5"
                  >
                    { ticket.TeamMember.name }
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={DisplayStyle.resultCustomerInfoBox}>
                {ticket.TeamMember.name === 'Pending...' ? (<Box sx={DisplayStyle.resultCustomerBoxBorder3}>
                  {console.log(ticket.TeamMember.name)}
                  <Typography sx={DisplayStyle.reultText3} variant='h2'>Waiting on next</Typography>
                  <Typography sx={DisplayStyle.reultText3} variant='h2'> available Team Member</Typography>
                </Box>) : (
                  <Box sx={DisplayStyle.resultCustomerBoxBorder2}>

                    <Typography sx={DisplayStyle.reultText2} variant='h2'>Is currently helping:</Typography>
                  </Box>)}
                <Box sx={{ width: '100%', height: 3, backgroundColor: 'whiteSmoke', marginBottom: 6, maxWidth: 580 }} />
                <Box sx={DisplayStyle.resultCustomerBoxBorder}>
                  <Typography sx={DisplayStyle.reultTextName} variant='h3'>Customer Name :</Typography>
                  <Typography variant='h3' sx={DisplayStyle.resultCustomerInfoText} >{ticket.customerName}</Typography>
                </Box>
                <Box
                  sx={ DisplayStyle.resultCustomerBoxBorder }
                >
                  <Typography
                    sx={ DisplayStyle.resultTextPO }
                    variant="h3"
                  >
                    Customer PO :
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={ DisplayStyle.resultCustomerInfoText2 }
                  >
                    { ticket.customerPO }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Carousel.Item>
        )) :
          <Carousel.Item style={DisplayStyle.carouselWelcomeItemContainer}>

            <Box sx={DisplayStyle.resultsMainBoxEmpty}>
              <Typography variant='h3'>Welcome To Gensco</Typography>
              <Typography variant='h3' sx={DisplayStyle.carouselTypography}>Live Will Call</Typography>
            </Box>
          </Carousel.Item>
        }
      </Carousel >
    </Box >
  )
}
