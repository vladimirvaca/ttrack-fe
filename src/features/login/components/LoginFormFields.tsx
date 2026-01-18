import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

import type { LoginFormData } from '../types';

interface LoginFormFieldsProps {
  onSubmit: (data: LoginFormData) => void;
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, remember });
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 flex flex-column gap-2">
      <div className="flex flex-column gap-2">
        <label htmlFor="email" className="text-sm font-bold">
          Email Address
        </label>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full p-inputtext-sm"
        />
      </div>

      <div className="flex flex-column gap-2">
        <label htmlFor="password" className="text-sm font-bold">
          Password
        </label>
        <IconField iconPosition="right">
          <InputIcon
            className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'} cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
          />
          <InputText
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="w-full p-inputtext-sm"
          />
        </IconField>
      </div>

      <div className="flex align-items-center gap-2 mt-2">
        <Checkbox
          id="remember"
          checked={remember}
          onChange={(e) => setRemember(e.checked || false)}
        />
        <label htmlFor="remember" className="text-sm">
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
