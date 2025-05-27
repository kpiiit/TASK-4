// src/pages/DashboardHome.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function DashboardHome() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to your dashboard!
      </Typography>
      <Typography variant="body1">
        Here’s a quick overview of your recent activity, stats, and updates. Use the sidebar to navigate through your projects, users, and settings.
      </Typography>
    </Box>
  );
}
