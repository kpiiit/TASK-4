// src/pages/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getUsers } from '../utils/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      setError('User not found. Please sign up first.');
      return;
    }
    if (user.password !== password) {
      setError('Wrong password. Please try again.');
      return;
    }

    // Success!
    localStorage.setItem('token', 'dummy-token');
    navigate('/', { replace: true });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign In</Typography>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal" required fullWidth
            label="Email Address" autoComplete="email"
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth
            label="Password" type="password" autoComplete="current-password"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Button component={Link} to="/signup" fullWidth>
            Don’t have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
