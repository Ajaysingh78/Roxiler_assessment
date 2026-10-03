import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { StoresList } from './pages/user/StoresList';
import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { NotFound } from './pages/NotFound';

import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/forms.css';

// Root index redirector based on authenticated user's role
const IndexRedirect = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/stores" replace />;
  if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
  if (user.role === 'STORE_OWNER') return <Navigate to="/owner" replace />;
  return <Navigate to="/stores" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<IndexRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/stores" element={<StoresList />} />
            <Route
              path="/owner"
              element={
                <ProtectedRoute allowedRoles={['STORE_OWNER', 'ADMIN']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
