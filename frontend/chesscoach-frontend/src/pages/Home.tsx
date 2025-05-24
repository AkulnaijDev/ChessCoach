import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

const Home: React.FC = () => (
  <Container>
    <Box textAlign="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        Benvenuto su ChessCoach!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Questa è la home!
      </Typography>
    </Box>
  </Container>
);

export default Home;
