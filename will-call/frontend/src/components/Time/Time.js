import React, { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

export default function Time({ ticketTime }) {
  const [time, setTime] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      console.log('tick');
      setTime(time => time + 1);
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60);


  return (
    <Box>
      {`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}
    </Box>
  )
}
