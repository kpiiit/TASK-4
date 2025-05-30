import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Avatar,
  Typography,
  CircularProgress
} from '@mui/material';
import { http } from '../api/http';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await http.get('/auth/profile');
        const data = res.data;
        setUser(data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } else {
          console.error('Failed to fetch profile:', err);
          setError('Could not load profile.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', p: 3, mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <Typography variant="h5">
          {user.name} 
        </Typography>
      </Box>

      <Box sx={{ '& > *': { mb: 1 } }}>
        <Typography><strong>ID:</strong> {user.id}</Typography>
        <Typography><strong>Username:</strong> {user.username}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Phone:</strong> {user.phone}</Typography>
        <Typography><strong>Gender:</strong> {user.gender}</Typography>
        <Typography><strong>Age:</strong> {user.age}</Typography>
        {user.address && (
          <Typography>
            <strong>Address:</strong>{' '}
            {user.address.address}, {user.address.city}, {user.address.state}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}