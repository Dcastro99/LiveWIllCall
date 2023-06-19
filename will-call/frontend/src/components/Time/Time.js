import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

export default function Time({ ticketTime }) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const interval = useRef(null);
  const newTicketTime = new Date(ticketTime);

  useEffect(() => {
    interval.current = setInterval(() => {
      const now = new Date() - newTicketTime;
      const elapsed = `${Math.floor(now / 1000)}`;
      const dateObj = new Date(elapsed * 1000);
      const minutes = dateObj.getUTCMinutes();
      const seconds = dateObj.getSeconds();
      setMin(minutes);
      setSec(seconds);
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [ticketTime]);

  return (
    <Box>
      { `${min}:${sec < 10 ? "0" : ""}${sec}` }
    </Box>
  );
}
