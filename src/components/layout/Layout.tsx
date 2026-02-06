import clsx from 'clsx';
import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { styles } from './LayoutStyles';

interface LayoutProps {
  onLogout: () => void;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: 'pi pi-th-large', path: '/dashboard' },
    { label: 'Users', icon: 'pi pi-users', path: '/users' },
    { label: 'Exercises', icon: 'pi pi-bolt', path: '/exercises' },
    { label: 'Sessions', icon: 'pi pi-calendar', path: '/sessions' },
    { label: 'Reports', icon: 'pi pi-chart-bar', path: '/reports' },
  ];

  return (
    <div style={styles.layoutWrapper}>
      <aside style={styles.layoutSidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.sidebarLogoContainer}>
            <i className="pi pi-bolt" style={styles.sidebarLogoIcon}></i>
          </div>
          <div>
            <h1 style={styles.sidebarTitle}>Ttrack</h1>
            <p style={styles.sidebarSubtitle}>Management Portal</p>
          </div>
        </div>

        <nav style={styles.sidebarNav}>
          <ul style={styles.navList}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} style={styles.navListItem}>
                  <Button
                    icon={item.icon}
                    label={item.label}
                    onClick={() => navigate(item.path)}
                    className={clsx('w-full text-left', {
                      'bg-blue-600 text-primary': isActive,
                      'text-600 p-button-text': !isActive,
                    })}
                    style={{ justifyContent: 'flex-start' }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={styles.sidebarFooter}>
          <Button
            icon="pi pi-cog"
            label="Settings"
            className="w-full text-left p-button-text text-600"
            style={{ justifyContent: 'flex-start', marginBottom: '0.5rem' }}
          />
          <Button
            icon="pi pi-sign-out"
            label="Logout"
            severity="danger"
            className="w-full text-left p-button-text"
            style={{ justifyContent: 'flex-start' }}
            onClick={onLogout}
          />
        </div>
      </aside>

      <main style={styles.layoutMain}>
        <section style={styles.layoutContent}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
