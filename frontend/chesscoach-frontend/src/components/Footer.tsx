import React from 'react';
import { Box, useMediaQuery, useTheme, Typography } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        position: isMobile ? 'relative' : 'sticky',
        bottom: isMobile ? 'auto' : 0,
        width: '100%',
        bgcolor: 'primary.dark',
        color: 'white',
        p: isMobile ? 1 : 2,
        fontSize: isMobile ? '0.7rem' : '1rem',
        textAlign: 'center',
        zIndex: 1000,
        mt: isMobile ? 2 : 0,
      }}
    >
      <Typography variant={isMobile ? 'caption' : 'body2'}>
        © 2025 ChessCoach. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
