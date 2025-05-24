import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'root' && password === 'root') {
      navigate('/home');
    } else {
      alert('Credenziali non valide');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          ChessCoach Login
        </Typography>
        <TextField
          label="Username"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
