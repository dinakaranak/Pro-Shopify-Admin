// src/components/Topbar.jsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon
} from '@mui/icons-material';

const Topbar = ({ toggleTheme, toggleSidebar, themeMode }) => {
  return (
    <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <IconButton color="inherit" onClick={toggleTheme}>
          {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <Avatar alt="Admin User" src="/static/images/avatar/1.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;