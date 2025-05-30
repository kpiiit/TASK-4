import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { http } from '../api/http';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await http.get(`/users/${id}?=`);
        setUser(data);
} catch (err) {
        console.error('Failed to fetch users:', err);
        setNotFound(true); 
      }
    }

    loadUser();
  }, [id]);

  if (notFound) {
    return <Navigate to="/users" replace />;
  }

  if (!user) {
    return <Typography sx={{ m: 2 }}>Loading...</Typography>;
  }

  return (
    <>
     
      <Paper sx={{ p: 3, mt: 3, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography><strong>ID:</strong> {user._id}</Typography>
          <Typography><strong>Phone:</strong> {user.phone}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
        </Box>
      </Paper>
    </>
  );
}
