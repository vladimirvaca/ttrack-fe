import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-container">
      <Card className="login-card shadow-8">
        <div className="text-center pb-1">
          <div
            className="inline-flex align-items-center justify-content-center p-3 border-circle mb-4"
            style={{ backgroundColor: 'rgba(19, 91, 236, 0.1)' }}
          >
            <i className="pi pi-shield text-primary" style={{ fontSize: '2rem' }}></i>
          </div>
          <h4 className="m-0 text-xs font-bold text-500 uppercase tracking-widest">Welcome Back</h4>
          <h2 className="m-0 mt-2 text-3xl font-bold">Ttrack Admin</h2>
          <p className="mt-2 text-sm text-500">Sign in to manage exercises and users</p>
        </div>

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

        <div className="pt-4 bg-gray-50 border-top-1 border-200 text-center">
          <p className="m-0 text-xs text-500 flex align-items-center justify-content-center gap-1">
            <i className="pi pi-verified text-xs"></i>
            Authorized personnel only.
          </p>
        </div>
      </Card>

      <footer className="mt-2 mb-0 text-center">
        <span className="text-xs text-500">© 2024 rvladimir Inc. v0.0.1</span>
      </footer>
    </div>
  );
};

export default LoginPage;
