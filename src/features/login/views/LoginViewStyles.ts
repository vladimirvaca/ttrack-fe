import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backgroundColor: 'var(--surface-ground)',
  },
  loginCard: {
    width: '100%',
    maxWidth: '450px',
  },
};
