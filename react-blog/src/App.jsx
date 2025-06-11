import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashboardHome from './pages/DashboardHome';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import UserLayout from './components/UserLayout';
import Documents from './pages/Documents';
import Permissions from './pages/Permissions';
import { Suspense, lazy } from "react";
const Profile = React.lazy(() => import('./pages/Profile'));
const Details = React.lazy(() => import('./pages/Details')); 
export default function App() {
  return (
    <Routes>
      {}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {}
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<Users />} />
        {}
        <Route
          path="profile"
          element={
            <Suspense fallback={<div>Loading profile…</div>}>
              <Profile />
            </Suspense>
          }
        />
        <Route path="users/:id" element={<UserLayout />}>
          <Route index element={<UserProfile />} />
           {}
        <Route
          path="details"
          element={
            <Suspense fallback={<div>Loading User Details…</div>}>
              <Details />
            </Suspense>
          }
        />          
          <Route path="documents" element={<Documents />} />
          <Route path="permissions" element={<Permissions />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}
