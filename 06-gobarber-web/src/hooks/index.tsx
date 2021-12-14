import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './Toast';

const AppProvider: React.FC = function ({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
