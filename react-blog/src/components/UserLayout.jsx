// src/pages/users/UserLayout.jsx
import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';

export default function UserLayout() {
  const { id } = useParams();
  const basePath = `/users/${id}`;

  return (
    <Box sx={{ p: 2 }}>
      <Tabs value={false}>
        <Tab label="Details" component={NavLink} to={`${basePath}/details`} />
         <Tab label="Users" component={NavLink} to={`${basePath}`} />
        <Tab label="Documents" component={NavLink} to={`${basePath}/documents`} />
        <Tab label="Permissions" component={NavLink} to={`${basePath}/permissions`} />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
