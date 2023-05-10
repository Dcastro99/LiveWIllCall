import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import DisplayPage from './pages/CustomerDisplayPage'
import AdminDisplayPage from './pages/AdminDisplayPage';

function App() {

  return (

    <Box sx={{
      width: '100vw',

    }} >
      <Router>
        <Routes>
          <>
            <Route path='/admin' element={<AdminDisplayPage />} />
            <Route path='/' element={<DisplayPage />} />
          </>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
