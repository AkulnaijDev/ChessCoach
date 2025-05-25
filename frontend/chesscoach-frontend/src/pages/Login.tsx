// src/pages/Login.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Paper, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Login = () => {
    const theme = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsLoggedIn } = useSettings();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'root' && password === 'root') {
      setIsLoggedIn(true);
      navigate('/dashboard');
    } else {
      setError('Username o password errati');
    }
  };

  return (
    <Box 
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Box
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
                  backgroundColor: theme.palette.custom.darkBackgroundMenu,
        color: theme.palette.getContrastText(theme.palette.custom.darkBackgroundMenu),
        }}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
            helperText={error && 'Username o password errati'}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Accedi
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
