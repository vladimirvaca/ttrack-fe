import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
