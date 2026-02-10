import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
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
    { label: 'Users', icon: 'pi pi-users', path: '/dashboard/users' },
    { label: 'Exercises', icon: 'pi pi-bolt', path: '/dashboard/exercises' },
    { label: 'Sessions', icon: 'pi pi-calendar', path: '/sessions' },
    { label: 'Reports', icon: 'pi pi-chart-bar', path: '/reports' },
  ];

  return (
    <div style={styles.layoutWrapper}>
      <aside style={styles.layoutSidebar} className="flex flex-column">
        <div className="p-4 flex align-items-center gap-2 mb-4">
          <div
            className="bg-primary border-round-lg p-2 flex align-items-center justify-content-center"
            style={{ width: '40px', height: '40px' }}
          >
            <i className="pi pi-bolt text-white text-xl"></i>
          </div>
          <div>
            <h1 className="m-0 text-lg font-bold line-height-1 text-900">Ttrack</h1>
            <p className="m-0 text-xs text-500 mt-1 font-normal">Management Portal</p>
          </div>
        </div>

        <nav className="flex-grow-1 px-3">
          <ul className="list-none p-0 m-0">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path;
              return (
                <li key={item.path} className="mb-2">
                  <Button
                    icon={item.icon}
                    label={item.label}
                    onClick={() => navigate(item.path)}
                    className={`w-full text-left p-button-text ${isActive ? 'p-button-outlined bg-blue-50 text-primary-600 font-bold border-1 border-blue-100' : 'text-600'}`}
                    style={{ justifyContent: 'flex-start' }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-top-1 border-200">
          <Button
            icon="pi pi-cog"
            label="Settings"
            className="w-full text-left p-button-text text-600 mb-2"
            style={{ justifyContent: 'flex-start' }}
          />
          <Button
            icon="pi pi-sign-out"
            label="Logout"
            severity="danger"
            className="w-full text-left p-button-text font-bold"
            style={{ justifyContent: 'flex-start' }}
            onClick={onLogout}
          />
        </div>
      </aside>

      <main style={styles.layoutMain}>
        <header style={styles.layoutTopbar} className="shadow-1">
          <div className="flex align-items-center gap-3 w-6">
            <IconField iconPosition="right" style={{ width: '100%' }}>
              <InputText
                placeholder="Search data..."
                className="p-inputtext-sm w-full border-none surface-100 p-3"
              />
              <InputIcon className="pi pi-search" style={{ color: '#6c757d' }} />
            </IconField>
          </div>
          <div className="flex align-items-center gap-4">
            <div className="relative cursor-pointer p-overlay-badge">
              <i className="pi pi-bell text-xl text-500"></i>
              <Badge severity="danger" value="3"></Badge>
            </div>
            <div className="flex align-items-center gap-3 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="m-0 text-sm font-bold text-900">Rwcoder User</p>
                <p className="m-0 text-xs text-500">Admin</p>
              </div>
              <Avatar
                image="https://picsum.photos/seed/admin/100/100"
                shape="circle"
                size="large"
                className="border-1 surface-border"
              />
            </div>
          </div>
        </header>

        <section style={styles.layoutContent}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
