import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { MainLayout } from './layouts/MainLayout';
import { AppRoutes } from './routes/AppRoutes';

import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/forms.css';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
