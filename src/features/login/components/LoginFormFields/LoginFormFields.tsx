import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
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
      className="p-fluid flex flex-column gap-3"
      data-test="login-form"
    >
      <div className="flex flex-column gap-2" data-test="email-field-container">
        <label htmlFor="email" data-test="email-label">
          Email Address
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

      <div className="flex flex-column gap-2" data-test="password-field-container">
        <label htmlFor="password" data-test="password-label">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <IconField iconPosition="right">
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

      <div className="flex align-items-center justify-content-between" data-test="remember-field-container">
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <div className="flex align-items-center">
              <div className="mr-2" data-test="remember-checkbox">
                <Checkbox
                  inputId="remember"
                  {...field}
                  checked={field.value}
                  inputRef={field.ref}
                  className="mr-2"
                />
              </div>
              <label htmlFor="remember" data-test="remember-label">Remember me</label>
            </div>
          )}
        />
        <a href="#" className="font-medium no-underline text-primary" style={{ textDecoration: 'none' }} data-test="forgot-password-link">
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        label={isBusy ? 'Signing in...' : 'Sign In'}
        disabled={isBusy}
        className="w-full"
        data-test="submit-button"
      />
    </form>
  );
};

export default LoginFormFields;
