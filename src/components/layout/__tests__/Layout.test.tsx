import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import Layout from '../Layout';

describe('Layout', () => {
  it('renders sidebar and topbar', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <Layout onLogout={onLogout} />
      </MemoryRouter>
    );
    expect(screen.getByText('Ttrack')).toBeInTheDocument();
    expect(screen.getByText('Management Portal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search data...')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <Layout onLogout={onLogout} />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Exercises')).toBeInTheDocument();
    expect(screen.getByText('Sessions')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('calls onLogout when logout button is clicked', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter>
        <Layout onLogout={onLogout} />
      </MemoryRouter>
    );
    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);
    expect(onLogout).toHaveBeenCalled();
  });

  it('renders child route content in layout', () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <Routes>
          <Route path="/" element={<Layout onLogout={vi.fn()} />}>
            <Route path="test" element={<div data-test="child-content">Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
