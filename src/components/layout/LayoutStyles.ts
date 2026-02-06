import type { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  layoutWrapper: {
    display: 'flex',
    minHeight: '100vh',
  },
  layoutSidebar: {
    width: '250px',
    backgroundColor: 'var(--surface-card)',
    borderRight: '1px solid var(--surface-border)',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  sidebarLogoContainer: {
    backgroundColor: 'var(--primary-color)',
    borderRadius: 'var(--border-radius)',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
  },
  sidebarLogoIcon: {
    color: 'var(--primary-color-text)',
    fontSize: '1.25rem',
  },
  sidebarTitle: {
    margin: 0,
    fontSize: '1.125rem',
    fontWeight: 'bold',
    lineHeight: 1,
  },
  sidebarSubtitle: {
    margin: 0,
    fontSize: '0.75rem',
    color: 'var(--text-color-secondary)',
    marginTop: '0.25rem',
    fontWeight: 'normal',
  },
  sidebarNav: {
    flexGrow: 1,
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navListItem: {
    marginBottom: '0.5rem',
  },
  sidebarFooter: {
    padding: '1rem',
    borderTop: '1px solid var(--surface-border)',
  },
  layoutMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  layoutContent: {
    flex: 1,
    padding: '1rem',
    backgroundColor: 'var(--surface-ground)',
  },
};
