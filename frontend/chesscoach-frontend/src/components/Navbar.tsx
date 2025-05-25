import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const navItems = [
  { label: 'Home', path: '/home', requiresAuth: true  },
  { label: 'Apprendi', path: '/learn', requiresAuth: true  },
  { label: 'Gioca', path: '/play', requiresAuth: true  },
  { label: 'Quiz', path: '/quiz', requiresAuth: true  },
  { label: 'Dashboard', path: '/dashboard', requiresAuth: true },
  { label: 'Settings', path: '/settings', requiresAuth: true },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSettings();

  const handleNavClick = (path: string, requiresAuth?: boolean) => {
    if (requiresAuth && !isLoggedIn) {
      alert('Devi effettuare il login per accedere a questa pagina.');
      navigate('/'); // reindirizza al login
      setMobileOpen(false);
      return;
    }
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ChessCoach
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              selected={location.pathname === item.path}
              onClick={() => handleNavClick(item.path, item.requiresAuth)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="static" sx={{ zIndex:'3', bgcolor: '#121212' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ChessCoach
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                sx={{
                  color: 'white',
                  borderBottom: location.pathname === item.path ? '2px solid #90caf9' : 'none',
                }}
                onClick={() => handleNavClick(item.path, item.requiresAuth)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
