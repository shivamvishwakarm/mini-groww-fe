import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/lib/hooks';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.session);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
