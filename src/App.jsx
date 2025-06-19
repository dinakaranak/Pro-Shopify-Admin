// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Users from './pages/User';
import Products from './pages/Product/Products';
import ProductList from './pages/Product/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [themeMode, setThemeMode] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div style={{ flexGrow: 1 }}>
            <Topbar toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
            <div style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/productList" element={<ProductList />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;