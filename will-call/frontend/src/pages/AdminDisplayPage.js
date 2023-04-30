import React from 'react'
import { Box } from '@mui/material';
import Admin from '../components/Admin';
import Footer from '../components/Footer';

export default function AdminDisplayPage({ tickets, Time }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Admin tickets={tickets} Time={Time} />
      <Footer />
    </Box>
  )
}
