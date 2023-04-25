import React from 'react'
import { Box } from '@mui/material'
import Display from '../components/Display'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function CustomerDisplayPage({ tickets, handleGetAllTickets }) {
  return (
    <Box sx={{ width: '100%' }} >
      <Header />
      <Display tickets={tickets} />
      <Footer />
    </Box>
  )
}
