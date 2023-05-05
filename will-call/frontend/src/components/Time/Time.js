import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

export default function Time({ ticketTime }) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const interval = useRef(null);
  const newTicketTime = new Date(ticketTime)

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = new Date() - newTicketTime;
      let elapsed = `${Math.floor(now / 1000)}`;
      let dateObj = new Date(elapsed * 1000);
      let minutes = dateObj.getUTCMinutes();
      let seconds = dateObj.getSeconds();
      setMin(minutes)
      setSec(seconds)


    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <Box>
      {`${min}:${sec < 10 ? "0" : ""}${sec}`}
    </Box>
  )
}
