import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from '../pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login onLogin={() => console.log('Login clicked')} />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
