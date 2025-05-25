import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Snowfall from './components/Snowfall';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Play from './pages/Play';
import Quiz from './pages/Quiz';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box } from '@mui/material';
import { GlobalStyles } from '@mui/material';

const AppContent = () => {
  const { showSnow, isLoggedIn } = useSettings();

  return (
    <ThemeProvider theme={theme}>
      {/* Background colorato, posizione fissa con zIndex 0 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, #000000 0%, #0fffc1 100%)',
          zIndex: 0,

          height: '100vh',
          width: '100vw',

          overflowX: 'hidden',
          overflowY: 'hidden',

        }}
      />

      {/* Neve / pezzi che cadono, posizione fissa con zIndex 1 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none', // non interferisce con click
          zIndex: 1,
        }}
      >
        <Snowfall enabled={showSnow} />
      </Box>

      {/* Contenuto principale, posizione relativa con zIndex 2 */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          overflowX: 'hidden',
          overflowY: 'hidden',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}
          />
          <Route
            path="/learn"
            element={isLoggedIn ? <Learn /> : <Navigate to="/" replace />}
          />
          <Route
            path="/play"
            element={isLoggedIn ? <Play /> : <Navigate to="/" replace />}
          />                              <Route
            path="/quiz"
            element={isLoggedIn ? <Quiz /> : <Navigate to="/" replace />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Settings /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <SettingsProvider>
        <Router>
          <AppContent />
        </Router>
      </SettingsProvider>
    </>
  );
}
