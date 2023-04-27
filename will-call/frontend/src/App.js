import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import DisplayPage from './pages/CustomerDisplayPage'
import AdminDisplayPage from './pages/AdminDisplayPage';
import { TicketProvider } from './context/LiveTicket';
import axios from 'axios';

function App() {
  const [tickets, setTickets] = useState([])
  console.log('IN APP', tickets)
  useEffect(() => {

    setInterval(() => {
      handleGetAllTickets()
    }, 500);
  }, [])


  const handleGetAllTickets = async () => {
    const config = {
      method: 'GET',
      baseURL: process.env.REACT_APP_VERCEL_URL,
      url: '/allTickets',
    };
    const response = await axios(config);
    console.log('response', response)
    setTickets(response.data)

  }



  return (

    <Box sx={{
      width: '100%',
      // border: '1px solid black',
    }} >
      <TicketProvider>
        <Router>
          <Routes>
            <>
              <Route path='/admin' element={<AdminDisplayPage tickets={tickets} />} />
              <Route path='/' element={<DisplayPage tickets={tickets} handleGetAllTickets={handleGetAllTickets} />} />
              {/* <AdminDisplayPage /> */}
              {/* <DisplayPage /> */}

            </>
          </Routes>
        </Router>
      </TicketProvider>

    </Box>
  );
}


export default App;
