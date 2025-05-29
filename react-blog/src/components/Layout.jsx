import React, { useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const isAuthenticated = () => !!localStorage.getItem('token');

export default function Layout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/signin', { replace: true });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        <ListItem button onClick={() => navigate('/')}>Home</ListItem>
        <ListItem button onClick={() => navigate('/users')}>Users</ListItem>
        <ListItem button onClick={() => navigate('/Profile')}>Profile</ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
