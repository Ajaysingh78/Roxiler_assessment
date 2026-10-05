import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { Login } from '../pages/auth/Login';
import { Signup } from '../pages/auth/Signup';
import { StoresList } from '../pages/user/StoresList';
import { OwnerDashboard } from '../pages/owner/OwnerDashboard';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { NotFound } from '../pages/NotFound';
import { ROUTES } from '../constants/routes.js';
import { ROLES } from '../constants/roles.js';

// Index Redirector based on authenticated user's role
const IndexRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to={ROUTES.STORES} replace />;
  if (user.role === ROLES.ADMIN) return <Navigate to={ROUTES.ADMIN} replace />;
  if (user.role === ROLES.STORE_OWNER) return <Navigate to={ROUTES.OWNER} replace />;
  return <Navigate to={ROUTES.STORES} replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<IndexRedirect />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.STORES} element={<StoresList />} />
      <Route
        path={ROUTES.OWNER}
        element={
          <ProtectedRoute allowedRoles={[ROLES.STORE_OWNER, ROLES.ADMIN]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN}
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
