import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from '../pages/LoginPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
