// src/pages/Users.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';      // <-- slash added
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { getUsers } from '../utils/auth';              // <-- import your helper

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // pull the latest users array on mount
    setUsers(getUsers());
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/users/${u.id}`}
                      variant="outlined"
                      size="small"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
