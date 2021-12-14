import React from 'react';
import GlobalStyle from './styles/global';
import Signin from './pages/signin';
// eslint-disable-next-line no-unused-vars
import SignUp from './pages/signUp';

import { AuthProvider } from './hooks/authContext';

import ToastContainer from './components/ToastContatainer';

const App: React.FC = function () {
  return (
    <>
      <AuthProvider>
        <Signin />
      </AuthProvider>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
};

export default App;
