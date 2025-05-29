import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export async function authFetch(url, options = {}) {
  
  const token = localStorage.getItem('accessToken');

  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const mergedOptions = {
    ...options,
    headers: {

      'Content-Type': 'application/json',
      ...authHeaders,
      ...(options.headers || {}),
    },
  };
  return fetch(url, mergedOptions);
}
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      username: email,
      password,
    };

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
       
        setError(data.message || 'Login failed. Please check your credentials.');
        return;
      }

      localStorage.setItem('token', data.accessToken || data.token);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/', { replace: true });
    } catch (err) {
      
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
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
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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