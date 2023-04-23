import React from 'react';
import { Box } from '@mui/material';
import DisplayPage from './pages/CustomerDisplayPage'
import AdminDisplayPage from './pages/AdminDisplayPage';
import { TicketProvider } from './context/LiveTicket';

function App() {
  return (

    <Box sx={{
      width: '100vw',
      // height: '100vh'
    }} >
      <TicketProvider>
        <AdminDisplayPage />
        <DisplayPage />
      </TicketProvider>
    </Box>
  );
}


export default App;
