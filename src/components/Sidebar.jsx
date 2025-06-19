// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const Sidebar = ({ open, toggleSidebar }) => {
  const drawerWidth = 240;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px', justifyContent: 'flex-end' }}>
        <ListItemIcon onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </ListItemIcon>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
         <ListItem button component={Link} to="/productList">
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="ProductList" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;