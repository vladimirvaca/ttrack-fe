import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DashboardView } from '../features/dashboard';
import DashboardPage from '../pages/DashboardPage/DashboardPage.tsx';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';

import ProtectedRoute from './ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute requireAuth={false} />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardPage />,
        children: [
          {
            index: true,
            element: <DashboardView />,
          },
          // Add additional dashboard subroutes here, for example:
          // { path: 'users', element: <UsersPage /> },
        ],
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
