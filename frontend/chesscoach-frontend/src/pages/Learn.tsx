import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Learn: React.FC = () => (
  <Container>
    <Box textAlign="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        Questo è il learn
      </Typography>
      <Typography variant="h6" gutterBottom>
        Questo è il learn
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/home">
        Home
      </Button>
    </Box>
  </Container>
);

export default Learn;
