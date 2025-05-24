import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3" mt={5}>
        Benvenuto nella Dashboard!
      </Typography>
        <Button variant="contained" color="primary" component={Link} to="/login">
        Inizia ora
      </Button>
    </Container>
  );
};

export default Dashboard;
