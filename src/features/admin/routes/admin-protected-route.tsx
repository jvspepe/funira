import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/features/users/hooks/use-auth';

export function AdminProtectedRoute() {
  const { currentUserData } = useAuth();

  if (!currentUserData || currentUserData.role !== 'admin') {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}
