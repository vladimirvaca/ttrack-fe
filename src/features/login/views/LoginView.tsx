import { Card } from 'primereact/card';
import React from 'react';

import LoginFormFields from '../components/LoginFormFields';

import type { LoginFormData, LoginViewProps } from '../types';

const LoginView: React.FC<LoginViewProps> = ({ onSubmit }) => {
  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
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

        <LoginFormFields onSubmit={handleFormSubmit} />

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

export default LoginView;
