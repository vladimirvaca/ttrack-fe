import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Auth from '../pages/Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
