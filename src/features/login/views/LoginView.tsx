import { Card } from 'primereact/card';

import LoginFormFields from '../components/LoginFormFields';

import { styles } from './LoginViewStyles.ts';

import type { LoginFormData, LoginViewProps } from '../types';
import type { FC } from 'react';

const LoginView: FC<LoginViewProps> = ({ onSubmit, isSubmitting = false }) => {
  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <div style={styles.container}>
      <Card className="shadow-8" style={styles.card}>
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

        <LoginFormFields onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

        <div className="pt-4 bg-gray-50 border-top-1 border-200 text-center">
          <p className="m-0 text-xs text-500 flex align-items-center justify-content-center gap-1">
            <i className="pi pi-verified text-xs"></i>
            Authorized personnel only.
          </p>
        </div>
      </Card>

      <footer className="mt-2 mb-0 text-center">
        <span className="text-xs text-500">© {new Date().getFullYear()} rwcoder v0.0.1</span>
      </footer>
    </div>
  );
};

export default LoginView;
