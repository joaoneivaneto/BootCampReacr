import React, { useContext, useCallback, createContext } from 'react';
import ToastContainer from '../components/ToastContatainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const toastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = function ({ children }) {
  const addToast = useCallback(() => {
    console.log('addtoast');
  }, []);
  const removeToast = useCallback(() => {
    console.log('removetoast');
  }, []);

  return (
    <toastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </toastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
