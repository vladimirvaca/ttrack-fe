import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { type FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { loginSchema } from '../schemas';

import type { LoginFormData } from '../types';

interface LoginFormFieldsProps {
  onSubmit: (data: LoginFormData) => void;
}

const LoginFormFields: FC<LoginFormFieldsProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="p-2 flex flex-column gap-2">
      <div className="flex flex-column gap-2">
        <label htmlFor="email" className="text-sm font-bold">
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
              className={`w-full p-inputtext-sm ${errors.email ? 'p-invalid' : ''}`}
            />
          )}
        />
        {errors.email && <small className="p-error">{errors.email.message}</small>}
      </div>

      <div className="flex flex-column gap-2">
        <label htmlFor="password" className="text-sm font-bold">
          Password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <IconField iconPosition="right">
              <InputIcon
                className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'} cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              />
              <InputText
                id="password"
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                className={`w-full p-inputtext-sm ${errors.password ? 'p-invalid' : ''}`}
              />
            </IconField>
          )}
        />
        {errors.password && <small className="p-error">{errors.password.message}</small>}
      </div>

      <div className="flex align-items-center gap-2 mt-2">
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <Checkbox
              inputId="remember"
              inputRef={field.ref}
              checked={field.value}
              onChange={(e) => field.onChange(e.checked || false)}
            />
          )}
        />
        <label htmlFor="remember" className="text-sm cursor-pointer">
          Remember for 5 days
        </label>
      </div>

      <div className="flex flex-column gap-3 mt-2">
        <Button
          type="submit"
          label="Sign In"
          icon="pi pi-sign-in"
          iconPos="right"
          className="w-full shadow-4"
          size="small"
        />
        <div className="text-center">
          <a href="#" className="text-sm font-bold text-primary no-underline hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginFormFields;
