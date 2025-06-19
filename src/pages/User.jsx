// src/pages/Users.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'joinDate', headerName: 'Join Date', width: 130 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon.snow@example.com', role: 'Admin', status: 'Active', joinDate: '2022-01-15' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei.lannister@example.com', role: 'User', status: 'Active', joinDate: '2022-02-20' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'jaime.lannister@example.com', role: 'User', status: 'Inactive', joinDate: '2022-03-10' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'arya.stark@example.com', role: 'User', status: 'Active', joinDate: '2022-04-05' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'daenerys.targaryen@example.com', role: 'Admin', status: 'Active', joinDate: '2022-05-12' },
  { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', email: 'melisandre@example.com', role: 'User', status: 'Inactive', joinDate: '2022-06-18' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'ferrara.clifford@example.com', role: 'User', status: 'Active', joinDate: '2022-07-22' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'rossini.frances@example.com', role: 'User', status: 'Active', joinDate: '2022-08-30' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'harvey.roxie@example.com', role: 'User', status: 'Inactive', joinDate: '2022-09-14' },
];

const User = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Box>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default User;