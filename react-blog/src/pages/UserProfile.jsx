// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { getUsers } from '../utils/auth';

export default function UserProfile() {
  const { id } = useParams();                    // from /users/:id
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const users = getUsers();
    const found = users.find(u => u.id === parseInt(id, 10));
    if (!found) {
      setNotFound(true);
    } else {
      setUser(found);
    }
  }, [id]);

  if (notFound) {
    // Redirect back to users list or show a message
    return <Navigate to="/users" replace />;
  }
  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {user.email.split('@')[0] /* e.g. "alice" */}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography><strong>ID:</strong> {user.id}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        {/* you can store & display more fields here, e.g. user.name or user.bio */}
      </Box>
    </Paper>
  );
}
