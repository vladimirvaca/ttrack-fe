import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DashboardView } from '../features/dashboard';
import { CreateExerciseView, ExercisesView } from '../features/exercises/views';
import DashboardPage from '../pages/DashboardPage/DashboardPage.tsx';
import ExercisesPage from '../pages/ExercisesPage/ExercisesPage';
import LoginPage from '../pages/LoginPage/LoginPage.tsx';
import UsersPage from '../pages/UsersPage/UsersPage';

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
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'exercises',
            element: <ExercisesPage />,
            children: [
              {
                index: true,
                element: <ExercisesView />,
              },
              {
                path: 'create',
                element: <CreateExerciseView />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
