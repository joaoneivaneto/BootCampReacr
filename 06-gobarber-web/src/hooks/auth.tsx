import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}
interface SigninCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signin(credentials: SigninCredentials): Promise<void>;
  signInOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = function ({ children }) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signin = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    setData({ token, user });
  }, []);

  const signInOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user: data.user, signin, signInOut }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('use Auth must be used within an authProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
