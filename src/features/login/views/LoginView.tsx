import LoginFormFields from '../components/LoginFormFields';

import { styles } from './LoginViewStyles.ts';

import type { LoginFormData, LoginViewProps } from '../types';
import type { FC } from 'react';

const LoginView: FC<LoginViewProps> = ({ onSubmit, isSubmitting = false }) => {
  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <div style={styles.loginContainer}>
      <div
        style={styles.loginCard}
        className="login-card surface-card border-round-2xl border-1 border-200 shadow-8 overflow-hidden"
      >
        <div className="text-center p-3 bg-surface-0 border-bottom-1 border-50">
          <div className="inline-flex align-items-center justify-content-center p-4 border-circle mb-4 bg-blue-50 text-primary-600">
            <i className="pi pi-shield text-4xl"></i>
          </div>
          <p className="m-0 text-xs font-bold text-500 uppercase tracking-widest mb-2">
            Secure Access
          </p>
          <h2 className="m-0 text-3xl font-bold text-900">Ttrack Admin</h2>
          <p className="m-0 mt-3 text-sm text-500 line-height-3">
            Sign in with your administrator credentials to manage the platform.
          </p>
        </div>
        <LoginFormFields onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        <div className="p-3 surface-50 border-top-1 border-200 text-center">
          <p className="m-0 text-xs text-500 font-medium flex align-items-center justify-content-center gap-2">
            <i className="pi pi-info-circle"></i>
            Authorized access only.
          </p>
        </div>
      </div>

      <footer className="mt-1 text-center">
        <p className="text-xs text-500 font-medium opacity-70">
          © {new Date().getFullYear()} rwcoder v0.0.1
        </p>
      </footer>
    </div>
  );
};

export default LoginView;
