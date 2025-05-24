import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText, Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Apprendi', path: '/learn' },
  { label: 'Gioca', path: '/play' },
  { label: 'Quiz', path: '/quiz' },
  { label: 'Dashboard', path: '/dashboard' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleDrawer = () => setMobileOpen(!mobileOpen);
  const location = useLocation();

  const drawer = (
    <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ChessCoach
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
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
      <AppBar component="nav" position="static" sx={{ bgcolor: '#121212' }}>
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            ChessCoach
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: 'white',
                  borderBottom: location.pathname === item.path ? '2px solid #90caf9' : 'none',
                }}
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
