import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import LoginFormFields from '../LoginFormFields.tsx';

describe('LoginFormFields', () => {
  const mockOnSubmit = vi.fn();

  const renderComponent = () => {
    return render(<LoginFormFields onSubmit={mockOnSubmit} />);
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  describe('Form Structure and Elements', () => {
    it('should render the login form with all fields', () => {
      renderComponent();

      expect(screen.getByTestId('login-form')).toBeInTheDocument();
      expect(screen.getByTestId('email-field-container')).toBeInTheDocument();
      expect(screen.getByTestId('password-field-container')).toBeInTheDocument();
      expect(screen.getByTestId('remember-field-container')).toBeInTheDocument();
    });

    it('should render email field with label and input', () => {
      renderComponent();

      expect(screen.getByTestId('email-label')).toHaveTextContent('Email Address');
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toHaveAttribute('placeholder', 'Your email');
    });

    it('should render password field with label and input', () => {
      renderComponent();

      expect(screen.getByTestId('password-label')).toHaveTextContent('Password');
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toHaveAttribute('placeholder', 'Your password');
      expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
    });

    it('should render password toggle icon', () => {
      renderComponent();

      expect(screen.getByTestId('password-toggle-icon')).toBeInTheDocument();
    });

    it('should render remember me checkbox with label', () => {
      renderComponent();

      expect(screen.getByTestId('remember-checkbox')).toBeInTheDocument();
      expect(screen.getByTestId('remember-label')).toHaveTextContent('Remember for 5 days');
    });

    it('should render submit button', () => {
      renderComponent();

      const submitButton = screen.getByTestId('submit-button');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should render forgot password link', () => {
      renderComponent();

      expect(screen.getByTestId('forgot-password-link')).toBeInTheDocument();
      expect(screen.getByTestId('forgot-password-link')).toHaveTextContent('Forgot password?');
    });
  });

  describe('Password Toggle Functionality', () => {
    it('should toggle password visibility when clicking the eye icon', async () => {
      const user = userEvent.setup();
      renderComponent();

      const passwordInput = screen.getByTestId('password-input');
      const toggleIcon = screen.getByTestId('password-toggle-icon');

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click to show password
      await user.click(toggleIcon);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click to hide password again
      await user.click(toggleIcon);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Form Validation', () => {
    it('should show email error when submitting empty email', async () => {
      const user = userEvent.setup();
      renderComponent();

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('email-error')).toBeInTheDocument();
        expect(screen.getByTestId('email-error')).toHaveTextContent('Email is required');
      });
    });

    it('should show invalid email format error', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');

      // Type invalid email
      await user.type(emailInput, 'invalidemail');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('email-error')).toBeInTheDocument();
        expect(screen.getByTestId('email-error')).toHaveTextContent('Invalid email format');
      });
    });

    it('should show password error when submitting empty password', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');

      // Type valid email but no password
      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('password-error')).toBeInTheDocument();
        expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required');
      });
    });

    it('should not show errors when both fields are valid', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Errors should not be visible
      expect(screen.queryByTestId('email-error')).not.toBeInTheDocument();
      expect(screen.queryByTestId('password-error')).not.toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with correct data when form is valid', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          remember: false,
        });
      });
    });

    it('should include remember checkbox value in submission', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const rememberLabel = screen.getByTestId('remember-label');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Click the label which is associated with the checkbox
      await user.click(rememberLabel);
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          remember: true,
        });
      });
    });

    it('should not call onSubmit when form is invalid', async () => {
      const user = userEvent.setup();
      renderComponent();

      const submitButton = screen.getByTestId('submit-button');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('email-error')).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('User Interactions', () => {
    it('should update input values when user types', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;

      await user.type(emailInput, 'user@test.com');
      await user.type(passwordInput, 'mypassword');

      expect(emailInput.value).toBe('user@test.com');
      expect(passwordInput.value).toBe('mypassword');
    });

    it('should toggle remember checkbox when clicked', async () => {
      const user = userEvent.setup();
      renderComponent();

      const rememberCheckboxWrapper = screen.getByTestId('remember-checkbox');
      const actualCheckbox = rememberCheckboxWrapper.querySelector(
        'input[type="checkbox"]'
      ) as HTMLInputElement;
      const rememberLabel = screen.getByTestId('remember-label');

      expect(actualCheckbox.checked).toBe(false);

      await user.click(rememberLabel);
      expect(actualCheckbox.checked).toBe(true);

      await user.click(rememberLabel);
      expect(actualCheckbox.checked).toBe(false);
    });
  });

  describe('Error Styling', () => {
    it('should apply error styling to email input when there is an error', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input');
      const submitButton = screen.getByTestId('submit-button');

      await user.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toHaveClass('p-invalid');
      });
    });

    it('should apply error styling to password input when there is an error', async () => {
      const user = userEvent.setup();
      renderComponent();

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByTestId('submit-button');

      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(passwordInput).toHaveClass('p-invalid');
      });
    });
  });
});
