import { useQueryClient } from '@tanstack/react-query';
import { Toast } from 'primereact/toast';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '@generated/auth/auth.ts';
import { getGetUserQueryOptions } from '@generated/user/user.ts';

import { LoginView } from '../../features/login';

import type { LoginFormData } from '../../features/login';

const LoginPage = () => {
  const toastRef = useRef<Toast>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isVerifyingSession, setIsVerifyingSession] = useState(false);

  const getErrorMessage = (error: unknown, fallback: string) =>
    error && typeof error === 'object' && 'message' in error
      ? String((error as { message?: string }).message || fallback)
      : fallback;

  const verifySession = useCallback(async () => {
    setIsVerifyingSession(true);
    try {
      await queryClient.fetchQuery(getGetUserQueryOptions());
      toastRef.current?.show({
        severity: 'success',
        summary: 'Login successful',
        detail: 'Welcome back!',
        life: 2500,
      });
      navigate('/dashboard');
    } catch (error) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'Login failed',
        detail: getErrorMessage(error, 'Session verification failed.'),
        life: 4000,
      });
    } finally {
      setIsVerifyingSession(false);
    }
  }, [navigate, queryClient]);

  const loginMutation = useLogin<unknown>({
    mutation: {
      onSuccess: async () => {
        await verifySession();
      },
      onError: (error) => {
        toastRef.current?.show({
          severity: 'error',
          summary: 'Login failed',
          detail: getErrorMessage(error, 'Please check your credentials.'),
          life: 4000,
        });
      },
    },
  });

  const handleLogin = useCallback(
    (data: LoginFormData) => {
      loginMutation.mutate({
        data: {
          email: data.email,
          password: data.password,
        },
      });
    },
    [loginMutation]
  );

  const isSubmitting = loginMutation.isPending || isVerifyingSession;

  return (
    <>
      <Toast ref={toastRef} />
      <LoginView onSubmit={handleLogin} isSubmitting={isSubmitting} />
    </>
  );
};

export default LoginPage;
