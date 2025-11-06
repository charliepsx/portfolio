import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/joy';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dateString = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const timeString = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography level="body-sm">{dateString}</Typography>
      <Typography level="h3">{timeString}</Typography>
    </Box>
  );
};