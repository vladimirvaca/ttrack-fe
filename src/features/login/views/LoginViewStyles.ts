import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 1rem 0 1rem',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    borderRadius: '12px',
    border: '1px solid #dbdfe6',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  header: {
    textAlign: 'center',
    paddingBottom: '0.25rem',
  },
  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    borderRadius: '50%',
    marginBottom: '1rem',
    backgroundColor: 'rgba(19, 91, 236, 0.1)',
  },
  icon: {
    fontSize: '2rem',
    color: 'var(--primary-color)',
  },
  welcomeText: {
    margin: 0,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: 'var(--text-color-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  title: {
    margin: '0.5rem 0 0 0',
    fontSize: '1.875rem',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    color: 'var(--text-color-secondary)',
  },
  formFooter: {
    paddingTop: '1rem',
    backgroundColor: 'var(--surface-ground)',
    borderTop: '1px solid var(--surface-border)',
    textAlign: 'center',
  },
  authorizedText: {
    margin: 0,
    fontSize: '0.75rem',
    color: 'var(--text-color-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
  },
  authorizedIcon: {
    fontSize: '0.75rem',
  },
  footer: {
    marginTop: '0.5rem',
    marginBottom: 0,
    textAlign: 'center',
  },
  footerText: {
    fontSize: '0.75rem',
    color: 'var(--text-color-secondary)',
  },
};
