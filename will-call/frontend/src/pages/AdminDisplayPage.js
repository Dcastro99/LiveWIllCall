import React from 'react'
import { Box } from '@mui/material';
import Admin from '../components/Admin';
import Footer from '../components/Footer';

export default function AdminDisplayPage({ tickets }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Admin tickets={tickets} />
      <Footer />
    </Box>
  )
}
