import React from 'react'
import { Box } from '@mui/material'

export default function index() {
  return (
    <Box sx={{

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 2,
      fontFamily: 'Dancing Script',
      fontSize: 25,
      padding: 1,
      backgroundColor: 'WhiteSmoke',
      height: { xs: '5vh', sm: '5vh', md: '5vh', lg: '5vh', xl: '5vh' },
    }}>
      &copy; Danny Castro
    </Box>
  )
}
