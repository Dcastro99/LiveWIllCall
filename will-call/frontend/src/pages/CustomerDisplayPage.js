import React from 'react'
import { Box } from '@mui/material'
import Display from '../components/Display/index2'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function CustomerDisplayPage({ tickets, handleGetAllTickets, Time }) {
  return (
    <Box sx={{ width: '100%' }} >
      <Header />
      <Display />
      <Footer />
    </Box>
  )
}
