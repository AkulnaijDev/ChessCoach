import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Quiz: React.FC = () => (
  <Container>
    <Box textAlign="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        Benvenuto su ChessCoach!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Apprendi, gioca, e migliora le tue abilità scacchistiche con quiz interattivi e sessioni di allenamento!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Inizia ora
      </Button>
    </Box>
  </Container>
);

export default Quiz;
