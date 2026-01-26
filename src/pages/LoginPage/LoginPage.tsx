import { Toast } from 'primereact/toast';
import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '@generated/auth/auth.ts';
import { useGetUser } from '@generated/user/user.ts';

import { LoginView } from '../../features/login';

import type { LoginFormData } from '../../features/login';

const LoginPage = () => {
  const toastRef = useRef<Toast>(null);
  const navigate = useNavigate();
  const { refetch: verifySession, isFetching: isVerifyingSession } = useGetUser({
    query: {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  const getErrorMessage = (error: unknown, fallback: string) =>
    error && typeof error === 'object' && 'message' in error
      ? String((error as { message?: string }).message || fallback)
      : fallback;

  const showToast = (options: { severity: 'success' | 'error'; summary: string; detail: string }) => {
    toastRef.current?.show({
      severity: options.severity,
      summary: options.summary,
      detail: options.detail,
      life: options.severity === 'success' ? 2500 : 4000,
    });
  };

  const loginMutation = useLogin<unknown>({
    mutation: {
      onSuccess: async () => {
        const sessionCheck = await verifySession();
        if (sessionCheck.isSuccess) {
          showToast({
            severity: 'success',
            summary: 'Login successful',
            detail: 'Welcome back!',
          });
          navigate('/dashboard');
          return;
        }
        showToast({
          severity: 'error',
          summary: 'Login failed',
          detail: getErrorMessage(sessionCheck.error, 'Session verification failed.'),
        });
      },
      onError: (error) => {
        showToast({
          severity: 'error',
          summary: 'Login failed',
          detail: getErrorMessage(error, 'Please check your credentials.'),
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
