import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { type FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { loginSchema } from '../../schemas';

import { styles } from './LoginFormFieldsStyles.ts';

import type { LoginFormData } from '../../types';

interface LoginFormFieldsProps {
  onSubmit: (data: LoginFormData) => void;
  isSubmitting?: boolean;
}

const LoginFormFields: FC<LoginFormFieldsProps> = ({ onSubmit, isSubmitting = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting: isFormSubmitting, isValidating },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  const isBusy = isSubmitting || isFormSubmitting || isValidating;

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="p-4 flex flex-column gap-3"
      data-test="login-form"
    >
      <div className="flex flex-column gap-1" data-test="email-field-container">
        <label htmlFor="email" data-test="email-label">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputText
              id="email"
              {...field}
              placeholder="Your email"
              className={`p-inputtext-sm ${errors.email ? 'p-invalid' : ''}`}
              style={styles.input}
              data-test="email-input"
            />
          )}
        />
        {errors.email && (
          <small className="p-error" data-test="email-error">
            {errors.email.message}
          </small>
        )}
      </div>

      <div className="flex flex-column gap-1" data-test="password-field-container">
        <label htmlFor="password" data-test="password-label">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <IconField iconPosition="right" style={{ width: '100%' }}>
              <InputIcon
                className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
                data-test="password-toggle-icon"
              />
              <InputText
                id="password"
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                className={`p-inputtext-sm ${errors.password ? 'p-invalid' : ''}`}
                style={styles.input}
                data-test="password-input"
              />
            </IconField>
          )}
        />
        {errors.password && (
          <small className="p-error" data-test="password-error">
            {errors.password.message}
          </small>
        )}
      </div>

      <Button
        type="submit"
        label={isBusy ? 'Signing in...' : 'Sign In'}
        disabled={isBusy}
        className="w-full"
        data-test="submit-button"
      />

      <div
        className="flex justify-content-center align-items-center text-center"
        data-test="remember-field-container"
      >
        <a
          href="#"
          className="font-medium no-underline text-primary text-sm"
          data-test="forgot-password-link"
        >
          Forgot password?
        </a>
      </div>
    </form>
  );
};

export default LoginFormFields;
