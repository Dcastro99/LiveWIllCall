import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import DisplayPage from './pages/CustomerDisplayPage'
import AdminDisplayPage from './pages/AdminDisplayPage';
import { TicketProvider } from './context/LiveTicket';
import axios from 'axios';

function App() {

  // const handleGetAllTickets = async () => {
  //   const config = {
  //     method: 'GET',
  //     baseURL: process.env.REACT_APP_VERCEL_URL,
  //     url: '/tickets',
  //   };
  //   const response = await axios(config);
  //   console.log('response', response)
  //   // setTickets(response.data)

  // }
  // handleGetAllTickets();

  return (

    <Box sx={{
      width: '98vw',
      // height: '98vh',
      // border: '1px solid black',
    }} >
      <TicketProvider>
        {/* <Router>
          <Routes> */}
        <>
          {/* <Route path='/admin' element={<AdminDisplayPage />} />
              <Route path='/' element={<DisplayPage />} /> */}
          {/* <AdminDisplayPage /> */}
          <DisplayPage />
        </>
        {/* </Routes>
        </Router> */}
      </TicketProvider>
    </Box>
  );
}


export default App;
