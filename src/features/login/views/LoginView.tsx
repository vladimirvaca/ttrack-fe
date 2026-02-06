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
      <Card style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <i className="pi pi-shield" style={styles.icon}></i>
          </div>
          <h4 style={styles.welcomeText}>Welcome Back</h4>
          <h2 style={styles.title}>Ttrack Admin</h2>
          <p style={styles.subtitle}>Sign in to manage exercises and users</p>
        </div>

        <LoginFormFields onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />

        <div style={styles.formFooter}>
          <p style={styles.authorizedText}>
            <i className="pi pi-verified" style={styles.authorizedIcon}></i>
            Authorized personnel only.
          </p>
        </div>
      </Card>

      <footer style={styles.footer}>
        <span style={styles.footerText}>
          © {new Date().getFullYear()} rwcoder v0.0.1
        </span>
      </footer>
    </div>
  );
};

export default LoginView;
