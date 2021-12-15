import React from 'react';
import Toast from './toast';
import { ToastMessage } from '../../hooks/Toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}
const ToastContainer: React.FC<ToastContainerProps> = function ({ messages }) {
  return (
    <Container>
      {messages.map((message) => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
