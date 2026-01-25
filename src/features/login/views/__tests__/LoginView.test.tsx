import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import LoginView from '../LoginView.tsx';

describe('LoginView', () => {
  const renderComponent = () => {
    const onSubmit = vi.fn();
    render(<LoginView onSubmit={onSubmit} />);
    return { onSubmit };
  };

  it('renders the welcome content and supporting text', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ttrack Admin' })).toBeInTheDocument();
    expect(screen.getByText('Sign in to manage exercises and users')).toBeInTheDocument();
    expect(screen.getByText('Authorized personnel only.')).toBeInTheDocument();
  });

  it('renders the login form fields', () => {
    renderComponent();

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('shows the current year in the footer', () => {
    renderComponent();

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}.*rwcoder v0\\.0\\.1`))).toBeInTheDocument();
  });

  it('forwards a valid form submission to the onSubmit prop', async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderComponent();

    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        remember: false,
      });
    });
  });
});
