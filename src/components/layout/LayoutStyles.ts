import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  layoutWrapper: {
    display: 'flex',
    minHeight: '100vh',
  },
  layoutSidebar: {
    width: '260px',
    background: 'var(--surface-card)',
    borderRight: '1px solid var(--surface-border)',
    height: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  layoutMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  layoutTopbar: {
    height: '64px',
    background: 'var(--surface-card)',
    borderBottom: '1px solid var(--surface-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 99,
  },
  layoutContent: {
    padding: '2rem',
    flex: 1,
  },
};
