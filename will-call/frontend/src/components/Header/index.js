import React from 'react'
import { Box, Typography } from '@mui/material'
import Logo from '../../asset/images/GLogo.png'

export default function Header() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginTop: 5,
      padding: 3,
      backgroundColor: 'WhiteSmoke',
    }}>
      <img src={Logo} width="180" alt="Will Call Logo" />
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Live Will Call</Typography>
      <img src={null} width="180" />
    </Box>
  )
}
