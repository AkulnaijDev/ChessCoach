import { Box, useMediaQuery, useTheme, Typography } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        p: isMobile ? 1 : 2,
        fontSize: isMobile ? '0.7rem' : '1rem',
        textAlign: 'center',
        zIndex: 1000,
        mt: isMobile ? 2 : 0,
        backgroundColor: theme.palette.custom.darkBackgroundMenu,
        color: theme.palette.getContrastText(theme.palette.custom.darkBackgroundMenu),
      }}
    >
      <Typography variant={isMobile ? 'caption' : 'body2'}>
        © 2025 ChessCoach. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
