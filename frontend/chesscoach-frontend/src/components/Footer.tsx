import { Typography, Box } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: '#1e1e2f', color: '#fff', py: 2, mt: 'auto' }}>
    <Typography variant="body2" align="center">
      © 2025 ChessCoach. Tutti i diritti riservati.
    </Typography>
  </Box>
);

export default Footer;
