import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { forwardRef, useImperativeHandle } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LoginPage from '../LoginPage.tsx';

type LoginMutationVariables = { data: { email: string; password: string } };
type LoginMutationHandlers = {
  onSuccess?: (data: void, variables: LoginMutationVariables, context: unknown) => void;
  onError?: (error: unknown, variables: LoginMutationVariables, context: unknown) => void;
};

const showToast = vi.fn();
const navigateMock = vi.fn();
const mutateSpy = vi.fn();

let loginOutcome: 'success' | 'error' = 'success';
let loginError: unknown = new Error('Invalid credentials');
let userQueryOutcome: 'success' | 'error' = 'success';
let userQueryError: unknown = new Error('Session verification failed.');

vi.mock('primereact/toast', () => ({
  Toast: forwardRef((_props, ref) => {
    useImperativeHandle(ref, () => ({ show: showToast }));
    return <div data-test="toast" />;
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock('@generated/auth/auth.ts', () => ({
  useLogin: (options?: { mutation?: LoginMutationHandlers }) => ({
    mutate: (vars: LoginMutationVariables) => {
      mutateSpy(vars);
      if (loginOutcome === 'success') {
        return options?.mutation?.onSuccess?.(undefined, vars, undefined);
      }
      return options?.mutation?.onError?.(loginError, vars, undefined);
    },
    isPending: false,
  }),
}));

vi.mock('@generated/user/user.ts', () => ({
  getGetUserQueryOptions: () => ({
    queryKey: ['user-test'],
    queryFn: () =>
      userQueryOutcome === 'success'
        ? Promise.resolve({ id: 'user' })
        : Promise.reject(userQueryError),
  }),
}));

const renderLoginPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const submitForm = () => {
  fireEvent.submit(screen.getByTestId('login-form'));
};

describe('LoginPage', () => {
  beforeEach(() => {
    showToast.mockClear();
    navigateMock.mockClear();
    mutateSpy.mockClear();
    loginOutcome = 'success';
    loginError = new Error('Invalid credentials');
    userQueryOutcome = 'success';
    userQueryError = new Error('Session verification failed.');
  });

  it('renders the login view', () => {
    renderLoginPage();

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('submits credentials to the login mutation', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    submitForm();

    await waitFor(() => {
      expect(mutateSpy).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password: 'password123',
        },
      });
    });
  });

  it('shows a success toast and navigates after session verification', async () => {
    const user = userEvent.setup();

    renderLoginPage();

    await user.type(screen.getByTestId('email-input'), 'admin@example.com');
    await user.type(screen.getByTestId('password-input'), 'supersecure');
    submitForm();

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Login successful',
        detail: 'Welcome back!',
        life: 2500,
      });
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows an error toast when login fails', async () => {
    const user = userEvent.setup();
    loginOutcome = 'error';
    loginError = { message: 'Bad credentials' };

    renderLoginPage();

    await user.type(screen.getByTestId('email-input'), 'fail@example.com');
    await user.type(screen.getByTestId('password-input'), 'wrong');
    submitForm();

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Login failed',
        detail: 'Bad credentials',
        life: 4000,
      });
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });

  it('shows an error toast when session verification fails', async () => {
    const user = userEvent.setup();
    userQueryOutcome = 'error';
    userQueryError = { message: 'Session expired' };

    renderLoginPage();

    await user.type(screen.getByTestId('email-input'), 'admin@example.com');
    await user.type(screen.getByTestId('password-input'), 'supersecure');
    submitForm();

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Login failed',
        detail: 'Session expired',
        life: 4000,
      });
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});
