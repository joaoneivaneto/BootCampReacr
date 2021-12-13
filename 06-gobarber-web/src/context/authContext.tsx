import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SigninCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  name: string;
  signin(credentials: SigninCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = function ({ children }) {
  const signin = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    console.log(response.data);
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ name: 'joao', signin }}>
      {children}
    </AuthContext.Provider>
  );
};
