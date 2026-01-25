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
};
