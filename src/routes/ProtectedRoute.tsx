import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useGetUser } from '@generated/user/user.ts';

import LoadingModal from '../components/LoadingModal';

import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  redirectTo?: string;
  fallback?: ReactNode;
  children?: ReactNode;
  requireAuth?: boolean;
  authenticatedRedirectTo?: string;
};

const ProtectedRoute = ({
  redirectTo = '/',
  fallback = <LoadingModal />, // Use the new LoadingModal component
  children,
  requireAuth = true,
  authenticatedRedirectTo = '/dashboard',
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isPending, isError, isFetching, isSuccess } = useGetUser({
    query: {
      retry: false,
      refetchOnMount: 'always',
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  });

  const isCheckingSession = isPending || isFetching;

  if (isCheckingSession) {
    return fallback;
  }

  if (requireAuth && isError) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (!requireAuth && isSuccess) {
    return <Navigate to={authenticatedRedirectTo} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
