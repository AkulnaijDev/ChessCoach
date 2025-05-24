import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Play from './pages/Play';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Box, CssBaseline, Container } from '@mui/material';

const App: React.FC = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <CssBaseline />
    <Navbar />
    <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/play" element={<Play />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Container>
    <Footer />
  </Box>
);

export default App;
