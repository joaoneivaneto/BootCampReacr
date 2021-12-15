import React, { useCallback, useRef } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';
import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/Toast';
import Input from '../../components/input';
import Button from '../../components/button';

import { Background, Container, Content } from './styles';
import getValidationErrors from '../../utils/getValidationError';

interface SigninFormData {
  password: string;
  email: string;
}
const Signin: React.FC = function () {
  const formRef = useRef<FormHandles>(null);

  const { signin } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SigninFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail Obrigatorio')
            .email('Digite um email valido'),
          password: Yup.string().required('senha obrigatoria'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signin({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'success',
          title: 'Erro na authenticação',
          description:
            'Ocorreu  um erro ao fazer login, cheque as crendeciais.',
        });
      }
    },
    [signin, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default Signin;
