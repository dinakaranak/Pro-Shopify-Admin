// src/App.js
import React, { useEffect } from 'react';
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
import Banner from './components/Banner';
import AdminUsersPage from './pages/AdminUsers';
import SupplierList from './pages/Suppliers/SupplierList';
import AddSupplier from './pages/Suppliers/AddSupplier';
import EditSupplier from './pages/Suppliers/EditSupplier';
import ApproveSuppliers from './pages/Suppliers/ApproveSuppliers';
import SubBanner from './components/SubBanner';


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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Topbar toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
        <div style={{ display: 'flex' }}>

          {/* Sidebar */}
          {sidebarOpen && (
            <div style={{ width: '240px', transition: 'width 0.3s ease' }}>
              <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
          )}
          {/* Main Content */}
          <div className="flex-1 bg-gray-50">
            <Topbar
              toggleSidebar={toggleSidebar}
              themeMode={themeMode}
              sidebarOpen={sidebarOpen}
            />
            <div style={{ padding: '20px', marginTop: '50px', marginLeft: sidebarOpen ? '15px' : '0', transition: 'margin-left 0.3s ease' }}>

              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/add-product" element={<Products />} />
                <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:id" element={<Products />} /> 
                <Route path="/orders" element={<Orders />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/banner" element={<Banner />} />

                <Route path="/AdminUsers" element={<AdminUsersPage />} />

                {/* Supplier Management Routes */}
                <Route path="/suppliers" >
                  <Route index element={<SupplierList />} />
                  <Route path="add-supplier" element={<AddSupplier />} />
                  <Route path="edit-supplier/:id" element={<EditSupplier />} />
                  <Route path="approve-suppliers" element={<ApproveSuppliers />} />
                </Route>

                <Route path="/SubBanner" element={<SubBanner />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;