import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import DisplayPage from './pages/CustomerDisplayPage'
import AdminDisplayPage from './pages/AdminDisplayPage';
import { TicketProvider } from './context/LiveTicket';

function App() {
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
          <AdminDisplayPage />
          {/* <DisplayPage /> */}
        </>
        {/* </Routes>
        </Router> */}
      </TicketProvider>
    </Box>
  );
}


export default App;
