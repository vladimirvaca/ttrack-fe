import { ProgressSpinner } from 'primereact/progressspinner';
import { Navigate, Outlet } from 'react-router-dom';

import { useGetUser } from '@generated/user/user.ts';

const ProtectedRoute = () => {
  const { isPending, isError } = useGetUser({
    query: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  });

  if (isPending) {
    return <ProgressSpinner />;
  }

  if (isError) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
